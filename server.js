import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Resend } from 'resend';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config();

if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is not set in .env');
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'https://innovator.name.ng',
    'http://innovator.name.ng'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Handle form submission
app.post('/api/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  
  const { studentName, parentName, age, email, phone, goal } = req.body;

  // Basic validation
  if (!studentName || !parentName || !email || !phone) {
    console.error('Validation failed - Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields' 
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
          <p><strong>Phone/WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a></p>
        </div>
        
        <div style="font-size: 12px; color: #6B7280; margin-top: 30px; padding-top: 10px; border-top: 1px solid #E5E7EB;">
          <p>This email was sent from the AI Young Innovators website on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

  try {
    console.log('Attempting to send email via Resend...');
    // 1) Admin notification (goes to you)
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || 'AI Young Innovators <onboarding@resend.dev>',
      // Standard contact-form behavior:
      //  - Email goes to you
      //  - Reply goes to the parent/student email
      to: process.env.RESEND_TO || 'azudiarutony@gmail.com',
      subject: `New AI Program Registration: ${studentName}`,
      text: textBody,
      html: htmlBody,
      replyTo: `${parentName || studentName} <${email}>`,
    });
    console.log('✅ Admin email sent via Resend:', result?.data?.id || 'no-id');

    // 2) Confirmation email to student/parent
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
      // Use your verified Resend domain as sender for better deliverability
      from: process.env.RESEND_FROM || 'AI Young Innovators <no-reply@innovator.name.ng>',
      to: email,
      // Parents' replies will go directly to this inbox and appear clearly in the To field
      replyTo: 'azudiarutony@gmail.com',
      subject: `Thank you for registering ${studentName}`,
      text: confirmationText,
      html: confirmationHtml,
    });

    console.log('✅ Confirmation email sent via Resend:', confirmationResult?.data?.id || 'no-id');
    res.status(200).json({ 
      success: true, 
      message: 'Registration email sent successfully via Resend' 
    });
  } catch (error) {
    console.error('❌ Error sending email via Resend:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email via Resend',
      error: error?.message || String(error) 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
