# Email Notification Setup for Video Submissions

## 🚀 Quick Setup (5 minutes)

### Option 1: Automated Setup (Recommended)

**On the droplet, run:**

```bash
# 1. Upload the setup script
# From your local machine:
scp setup-email-notifications.sh blaze@api.leroykellyforever.com:~/

# 2. SSH to droplet and run it
ssh aya
bash ~/setup-email-notifications.sh
```

### Option 2: Manual Setup

**Step 1: Install nodemailer**

```bash
cd ~/lk-api
npm install nodemailer
```

**Step 2: Configure Email Credentials**

Create a Gmail App Password:

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other" → name it "Leroy Kelly API"
4. Copy the 16-character password

**Step 3: Update .env file**

```bash
nano ~/lk-api/.env
```

Add these lines:

```
ADMIN_EMAIL=your.email@gmail.com
ADMIN_EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Step 4: The updated videoSubmission.js is ready**

The setup script creates it automatically, or you can manually update it with the code below.

**Step 5: Restart API**

```bash
pm2 restart lk-api
pm2 logs lk-api --lines 20
```

**Step 6: Test It**

- Submit a video through https://leroykellyforever.com/submit-video
- Check your email for the notification

---

## 📧 What You'll Receive

When someone submits a video, you'll get an email with:

- ✅ Submitter name and email
- ✅ Video duration
- ✅ Their message (if included)
- ✅ Timestamp
- ✅ Direct link to admin dashboard
- ✅ Submission ID and filename

**Subject:** 🎥 New Video Submission - Leroy Kelly Forever

---

## 🐛 Troubleshooting

**Email not sending?**

1. Check .env has correct credentials: `cat ~/lk-api/.env | grep ADMIN`
2. Make sure you used App Password, not regular Gmail password
3. Check PM2 logs: `pm2 logs lk-api --err`

**Gmail blocking sign-in?**

- You MUST use an App Password (not your regular password)
- Enable 2FA first, then create App Password

**Still not working?**

- Test with a different email service (Mailgun, SendGrid)
- Or use Discord webhook (see below)

---

## 🔔 Alternative: Discord Webhook (Easier!)

No email credentials needed - just post to a Discord channel:

**Step 1: Create Discord Webhook**

1. Discord → Server Settings → Integrations → Webhooks
2. Create webhook, copy URL

**Step 2: Add to .env**

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**Step 3: Update videoSubmission.js**
Replace the email notification with:

```javascript
// After submission.save()
fetch(process.env.DISCORD_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: `🎥 **New Video Submission**\n\n**Name:** ${submission.name}\n**Email:** ${submission.email}\n**Duration:** ${submission.duration}s\n\n[View in Admin](https://leroykellyforever.com/admin)`,
  }),
});
```

---

## 📊 Current Status Check

**Check if everything is working:**

```bash
cd ~/lk-api
pm2 status                          # Should show "online"
pm2 logs lk-api --lines 30          # Check for errors
cat .env | grep ADMIN               # Verify email is configured
npm list nodemailer                 # Verify nodemailer is installed
```

**Test API health:**

```bash
curl https://api.leroykellyforever.com/health
```

Should return: `{"ok":true,"ts":"..."}` ✅
