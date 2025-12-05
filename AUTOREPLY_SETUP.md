# 📧 Auto-Reply Email Setup Guide

This guide will help you set up automatic confirmation emails that are sent to clients after they submit the contact form.

## What is Auto-Reply?

When someone fills out your "Request a Quote" form, they will automatically receive:
1. ✅ **Confirmation email** - Sent to the client thanking them for their submission
2. 📨 **Notification email** - Sent to you (ibikunzwe@gmail.com) with their project details

## Step 1: Create Auto-Reply Template in EmailJS

1. Go to **EmailJS Dashboard** → **Email Templates**
2. Click **Create New Template**
3. **Template Name:** `Bosswebber Auto-Reply` (or any name you prefer)
4. **Subject Line:**
   ```
   Thank You for Your Request - Bosswebber
   ```
5. **Content Type:** Select **HTML** (recommended) or **Plain Text**
6. **Email Content:**
   - Open `emailjs-autoreply-template.html` (for HTML)
   - OR `emailjs-autoreply-template-plain.txt` (for plain text)
   - Copy the entire content
   - Paste into EmailJS template editor

7. **Template Variables Used:**
   - `{{from_name}}` - Client's name
   - `{{from_email}}` - Client's email (will be used as recipient)
   - `{{project_type}}` - Type of project
   - `{{budget}}` - Budget range
   - `{{timeline}}` - Project timeline

8. **Important Settings:**
   - **To Email:** Set to `{{from_email}}` (this sends to the client)
   - **From Name:** `Bosswebber`
   - **From Email:** Your email (ibikunzwe@gmail.com)

9. **Save** and **Copy the Template ID**

## Step 2: Update Environment Variables

Add the auto-reply template ID to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_main_template_id_here
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 3: Restart Development Server

After updating `.env`:
1. Stop the dev server (Ctrl+C)
2. Restart: `npm run dev`

## How It Works

When a client submits the form:

1. **Notification Email** → Sent to `ibikunzwe@gmail.com` with full project details
2. **Auto-Reply Email** → Sent to the client's email with:
   - Thank you message
   - Project summary
   - What happens next
   - Contact information
   - Links to portfolio and pricing

## Testing

1. Fill out the contact form with a test email
2. Submit the form
3. Check both:
   - Your email (ibikunzwe@gmail.com) - Should receive notification
   - Test email - Should receive auto-reply confirmation

## Template Features

✅ **Professional Design** - Clean, branded confirmation email
✅ **Project Summary** - Shows what they submitted
✅ **Next Steps** - Clear expectations (24-hour response)
✅ **Contact Info** - Easy ways to reach you
✅ **Helpful Links** - Portfolio and pricing links

## Troubleshooting

**Auto-reply not sending?**
- Check that `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` is set in `.env`
- Verify the template ID is correct
- Make sure template variables match exactly

**Client not receiving email?**
- Check spam/junk folder
- Verify client's email address is correct
- Check EmailJS logs for errors

**Want to disable auto-reply?**
- Simply remove or comment out `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` from `.env`
- The form will still send notification emails to you

## Customization

Want to customize the auto-reply?
- **Colors:** Change `#6366f1` to your brand color
- **Content:** Modify the message text
- **Links:** Update portfolio/pricing URLs
- **Response Time:** Change "24 hours" to your actual response time

---

**That's it!** Your clients will now receive professional confirmation emails automatically! 🎉

