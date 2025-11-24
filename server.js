import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Note: To use this server, you must have a .env file with EMAIL_USER and EMAIL_PASS
// and install dependencies: npm install express nodemailer cors dotenv

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
// You should use an App Password for Gmail: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/register', async (req, res) => {
  const { studentName, parentName, age, email, phone, goal } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'skillhivedigitalagency@gmail.com',
    subject: `New AI Program Registration: ${studentName}`,
    text: `
New Student Registration Details
--------------------------------
Student Name: ${studentName}
Student Age: ${age}
Student Email: ${email}
Learning Goal: ${goal}

Parent/Guardian Details
-----------------------
Parent Name: ${parentName}
Phone (WhatsApp): ${phone}

--------------------------------
Sent from AI Young Innovators Website
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Registration email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
