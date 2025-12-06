import { Resend } from 'resend';

// Initialize Resend client with API key from Vercel / env
const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req, res) {
  // Set CORS headers for all requests
  const origin = req.headers.origin;
  const allowedOrigins = ['https://innovator.name.ng', 'https://aiprograms.vercel.app'];
  
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

We are truly honored to be entrusted with your child’s growth, and we don’t take that responsibility lightly.
Over the years, we’ve successfully trained 70+ kids and teens, helping them think smarter, solve problems creatively, and gain real digital skills that give them a strong advantage in today’s fast-changing world.

Your child is now about to experience the same powerful learning journey.
Before we proceed to finalize the enrollment, I’d love to offer you a brief Clarity Call or WhatsApp chat just to ensure you have complete understanding of the program structure, schedule, learning outcomes, and payment process.

This call is simply to help you feel confident and fully aware of what your child will gain.

Would you like us to hop on a Clarity Call today?
Or should we continue the conversation on WhatsApp for quicker guidance?
Once you’re comfortable and all questions are answered, we can finalize your child’s participation by completing the payment.
For easy communication, please feel free to reach me directly:
📞 Call: 09031433152
💬 WhatsApp: 08125650249

We're excited to have ${studentName} into this revolutionary learning experience and help them build skills that will shape their future.

Best regards,
Comr. Divine Ezimchukwu
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
