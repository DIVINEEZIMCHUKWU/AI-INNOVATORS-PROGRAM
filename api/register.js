import { Resend } from 'resend';

// Initialize Resend client with API key from Vercel / env
const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
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
Age: ${age || 'Not specified'}
Email: ${email}
Learning Goal: ${goal || 'Not specified'}

PARENT/GUARDIAN:
----------------
Name: ${parentName}
Phone: ${phone}

TIMESTAMP: ${new Date().toLocaleString()}
`;

  const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">NEW STUDENT REGISTRATION</h2>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #4F46E5; margin-top: 0;">STUDENT DETAILS</h3>
          <p><strong>Name:</strong> ${studentName}</p>
          <p><strong>Age:</strong> ${age || 'Not specified'}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Learning Goal:</strong> ${goal || 'Not specified'}</p>
        </div>
        
        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #4F46E5; margin-top: 0;">PARENT/GUARDIAN</h3>
          <p><strong>Name:</strong> ${parentName}</p>
          <p><strong>Phone/WhatsApp:</strong> <a href="https://wa.me/${String(phone).replace(/[^0-9]/g, '')}">${phone}</a></p>
        </div>
        
        <div style="font-size: 12px; color: #6B7280; margin-top: 30px; padding-top: 10px; border-top: 1px solid #E5E7EB;">
          <p>This email was sent from the AI Young Innovators website on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

  try {
    console.log('Attempting to send email via Resend (Vercel API)...');

    // Admin notification
    const adminResult = await resend.emails.send({
      from: process.env.RESEND_FROM || 'AI Young Innovators <onboarding@resend.dev>',
      to: process.env.RESEND_TO || 'azudiarutony@gmail.com',
      subject: `New AI Program Registration: ${studentName}`,
      text: textBody,
      html: htmlBody,
      replyTo: `${parentName || studentName} <${email}>`,
    });

    console.log('✅ Admin email sent via Resend (Vercel API):', adminResult?.data?.id || 'no-id');

    // Confirmation email to parent/student
    const confirmationText = `Hi ${parentName || studentName},

Thank you for registering ${studentName} for the AI Young Innovators Program.

It's a privilege to guide your child (or you) through this revolution in technology, just like we have done for over 60+ kids and teens in our previous program batches.

Can we hop on a clarity call or chat on WhatsApp to clarify any doubts, and are you ready to make your payment now?

Best regards,
AI Young Innovators Team`;

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Thank you for registering ${studentName}!</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #111827;">
          Thank you for registering <strong>${studentName}</strong> for the <strong>AI Young Innovators Program</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #111827;">
          It's a privilege to guide your child (or you) through this revolution in technology, just like we have done for over <strong>60+ kids and teens</strong> in our previous program batches.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #111827;">
          Can we hop on a <strong>clarity call</strong> or chat on <strong>WhatsApp</strong> to clarify any doubts, and are you ready to make your payment now?
        </p>
        <p style="font-size: 14px; color: #6B7280; margin-top: 24px;">
          Warm regards,<br/>
          <strong>AI Young Innovators Team</strong>
        </p>
      </div>
    `;

    const confirmationResult = await resend.emails.send({
      from: process.env.RESEND_FROM || 'AI Young Innovators <no-reply@innovator.name.ng>',
      to: email,
      replyTo: 'azudiarutony@gmail.com',
      subject: `Thank you for registering ${studentName}`,
      text: confirmationText,
      html: confirmationHtml,
    });

    console.log('✅ Confirmation email sent via Resend (Vercel API):', confirmationResult?.data?.id || 'no-id');

    return res.status(200).json({
      success: true,
      message: 'Registration email sent successfully via Resend (Vercel API)',
    });
  } catch (error) {
    console.error('❌ Error sending email via Resend (Vercel API):', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email via Resend',
      error: error?.message || String(error),
    });
  }
}
