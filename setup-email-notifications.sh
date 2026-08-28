#!/bin/bash
# Email Notification Setup for lk-api
# Run this on the droplet: bash setup-email-notifications.sh

cd ~/lk-api

echo "📧 Setting up email notifications for video submissions..."

# Step 1: Install nodemailer if not already installed
echo "📦 Installing nodemailer..."
npm install nodemailer

# Step 2: Backup current videoSubmission.js
echo "💾 Backing up videoSubmission.js..."
cp routes/videoSubmission.js routes/videoSubmission.js.backup

# Step 3: Create updated videoSubmission.js with email notifications
echo "✏️  Creating updated videoSubmission.js..."
cat > routes/videoSubmission.js << 'EOF'
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import VideoSubmission from '../models/VideoSubmission.js';
import { connectDB } from '../src/db.js';

const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD
  }
});

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/videos/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, MOV, WebM, and AVI allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Helper function to send email notification
async function sendNotificationEmail(submission) {
  try {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: '🎥 New Video Submission - Leroy Kelly Forever',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #F26A1B;">🎥 New Video Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Duration:</strong> ${submission.duration} seconds</p>
            <p><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
            ${submission.message ? `<p><strong>Message:</strong><br>${submission.message}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <a href="https://leroykellyforever.com/admin" 
               style="background: #F26A1B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Submission ID: ${submission._id}<br>
            File: ${submission.videoFilename}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send email notification:', error.message);
    // Don't throw - we don't want email failures to break submissions
  }
}

// Video submission endpoint
router.post('/submit-video', upload.single('video'), async (req, res) => {
  try {
    // Ensure database connection
    await connectDB();

    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No video file uploaded' });
    }

    const { name, email, message, duration } = req.body;

    if (!name) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ ok: false, error: 'Name is required' });
    }

    // Save to database
    const submission = new VideoSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message ? message.trim() : '',
      videoFilename: req.file.filename,
      videoPath: req.file.path,
      duration: parseInt(duration) || 0,
      status: 'pending'
    });

    await submission.save();

    console.log('✓ Video submission saved:', {
      id: submission._id,
      name: submission.name,
      email: submission.email,
      filename: submission.videoFilename
    });

    // Send email notification (non-blocking)
    sendNotificationEmail(submission).catch(err => {
      console.error('Email notification error:', err);
    });

    res.json({
      ok: true,
      message: 'Video submitted successfully',
      submissionId: submission._id
    });

  } catch (error) {
    console.error('Video submission error:', error);
    
    // Clean up file if it was uploaded
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to delete file:', unlinkErr);
      }
    }

    res.status(500).json({
      ok: false,
      error: 'Failed to process video submission'
    });
  }
});

export default router;
EOF

echo ""
echo "✅ Files updated successfully!"
echo ""
echo "⚠️  NEXT STEPS:"
echo ""
echo "1. Add email credentials to your .env file:"
echo "   nano ~/lk-api/.env"
echo ""
echo "   Add these lines (or update existing):"
echo "   ADMIN_EMAIL=your.email@gmail.com"
echo "   ADMIN_EMAIL_PASSWORD=your-app-password"
echo ""
echo "2. If using Gmail, create an App Password:"
echo "   - Go to: https://myaccount.google.com/apppasswords"
echo "   - Generate a new app password"
echo "   - Use that password (not your regular Gmail password)"
echo ""
echo "3. Restart the API:"
echo "   pm2 restart lk-api"
echo ""
echo "4. Test it:"
echo "   Submit a video through the website"
echo "   Check your email for the notification"
echo ""
echo "📋 Backup saved at: routes/videoSubmission.js.backup"
echo ""
