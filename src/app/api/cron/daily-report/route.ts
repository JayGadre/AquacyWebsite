import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  // Simple auth to prevent random pings (in a real app, use a secret key header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'aquacy-cron-secret'}`) {
    // We'll allow it for demo purposes, but normally return 401
    // return new NextResponse('Unauthorized', { status: 401 });
  }

  const dataDir = path.join(process.cwd(), 'src', 'data');
  const inquiriesPath = path.join(dataDir, 'inquiries.json');
  const settingsPath = path.join(dataDir, 'settings.json');
  
  let inquiries = [];
  let adminEmails = [];
  
  try {
    if (fs.existsSync(inquiriesPath)) {
      inquiries = JSON.parse(fs.readFileSync(inquiriesPath, 'utf8'));
    }
    if (fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      adminEmails = settings.adminEmails || [];
    }
  } catch (e) {
    console.error('Error reading files:', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
  
  if (adminEmails.length === 0) {
    return NextResponse.json({ message: 'No admin emails configured' });
  }

  // Filter inquiries from the last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentInquiries = inquiries.filter((inq: any) => new Date(inq.date) > oneDayAgo);
  
  if (recentInquiries.length === 0) {
    return NextResponse.json({ message: 'No new inquiries in the last 24 hours' });
  }
  
  // Create email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00d2ff;">Daily Inquiry Digest</h2>
      <p>You have received <strong>${recentInquiries.length}</strong> new inquiries in the last 24 hours.</p>
      
      ${recentInquiries.map((inq: any) => `
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h3 style="margin-top: 0; color: #0f172a;">${inq.product}</h3>
          <p><strong>Name:</strong> ${inq.name}</p>
          <p><strong>Email:</strong> ${inq.email}</p>
          <p><strong>Mobile:</strong> ${inq.mobile}</p>
          <p><strong>Requirement:</strong><br/>${inq.requirement}</p>
          <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">Submitted: ${new Date(inq.date).toLocaleString()}</p>
        </div>
      `).join('')}
      
      <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 32px;">
        This is an automated message from your Aquacy website.
      </p>
    </div>
  `;

  // Configure Nodemailer transporter
  // Note: For this to actually send, you must set SMTP_HOST, SMTP_USER, SMTP_PASS in .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // We wrap in a try catch so the API doesn't crash if SMTP is not configured
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Aquacy Leads" <noreply@aquacy.com>',
      to: adminEmails.join(', '),
      subject: `Daily Leads Digest: ${recentInquiries.length} New Inquiries`,
      html: emailHtml,
    });
    
    return NextResponse.json({ message: 'Email sent successfully', count: recentInquiries.length });
  } catch (error) {
    console.error('Failed to send email:', error);
    // If SMTP fails, we'll still return 200 for the cron, but log the error
    return NextResponse.json({ 
      message: 'Email sending failed (check SMTP credentials in .env)', 
      error: String(error) 
    });
  }
}
