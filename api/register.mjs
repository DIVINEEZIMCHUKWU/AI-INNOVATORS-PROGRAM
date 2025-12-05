import { Resend } from 'resend';

// Initialize Resend client with API key from Vercel / env
const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req, res) {
  // Set CORS headers for all requests
  const origin = req.headers.origin;
  const allowedOrigins = ['https://innovator.name.ng', 'https://ainnovator.vercel.app'];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method Not Allowed',
      allowed: ['POST', 'OPTIONS'],
      received: req.method
    });
  }

  console.log('Received registration request (Vercel API):', req.body);

  const { studentName, parentName, age, email, phone, goal } = req.body || {};

  if (!studentName || !parentName || !email || !phone) {
    console.error('Validation failed - Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields',
    });
  }

  const textBody = `
NEW STUDENT REGISTRATION
=======================

STUDENT DETAILS:
----------------
Name: ${studentName}
Age: ${age}
Email: ${email}
Phone: ${phone}

PARENT/GUARDIAN DETAILS:
-----------------------
Name: ${parentName}

LEARNING GOAL:
--------------
${goal || 'Not specified'}

Registration received from: ${req.headers.origin || 'Direct'}
Date: ${new Date().toLocaleString()}
  `;

  try {
    // Send admin notification email
    console.log('Sending admin notification email...');
    const adminEmail = await resend.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@innovator.name.ng',
      to: process.env.RESEND_TO?.split(',').map(email => email.trim()) || ['skillhivedigitalagency@gmail.com'],
      subject: `New Registration: ${studentName} - AI Young Innovators Program`,
      text: textBody,
      replyTo: email,
    });

    console.log('Admin email sent successfully:', adminEmail);

    // Send personalized confirmation email to parent/student
    console.log('Sending confirmation email to student...');
    const confirmationEmail = await resend.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@innovator.name.ng',
      to: [email],
      subject: 'Registration Confirmed - AI Young Innovators Program',
      text: `
Dear ${parentName},

Thank you for registering ${studentName} for the AI Young Innovators Program!

Registration Details:
• Student: ${studentName}
• Age: ${age}
• Email: ${email}
• Phone: ${phone}

Next Steps:
1. Our team will review your application
2. We'll contact you via WhatsApp shortly to finalize enrollment
3. You'll receive details about the weekend virtual training schedule

If you have any questions, feel free to reply to this email or contact us:
• WhatsApp: https://wa.me/2348125650249
• Email: skillhivedigitalagency@gmail.com

We're excited to have ${studentName} join our program!

Best regards,
AI Young Innovators Program Team
      `,
      replyTo: process.env.RESEND_TO?.split(',')[0]?.trim() || 'skillhivedigitalagency@gmail.com',
    });

    console.log('Confirmation email sent successfully:', confirmationEmail);

    return res.status(200).json({
      success: true,
      message: 'Registration submitted successfully! Check your email for confirmation.',
      data: {
        adminEmail: adminEmail.id,
        confirmationEmail: confirmationEmail.id,
      },
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send registration. Please try again or contact support directly.',
      error: error.message,
    });
  }
}
