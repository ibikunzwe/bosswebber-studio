# EmailJS Setup Guide

This guide will help you set up EmailJS to receive form submissions directly to your email (ibikunzwe@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Add Email Service

1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. **Template Name:** "Bosswebber Project Request" (or any name you prefer)
4. **Subject Line:** 
   ```
   New Project Request from {{from_name}}
   ```

5. **Content Type:** Select **HTML** (not plain text)

6. **Email Content:** 
   - Open the file `emailjs-template.html` in this project
   - Copy the entire HTML content
   - Paste it into the EmailJS template editor
   
   **OR** if you prefer plain text, use the content from `emailjs-template-plain.txt`

7. **Important:** Make sure these template variables are included (they should already be in the template):
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{company}}`
   - `{{project_type}}`
   - `{{budget}}`
   - `{{timeline}}`
   - `{{industry}}`
   - `{{content_ready}}`
   - `{{references}}`
   - `{{message}}`

8. **Save the template** and **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find **API Keys** section
3. **Copy your Public Key**

## Step 4.5: Create Auto-Reply Template (Optional but Recommended)

1. Go to **Email Templates** → **Create New Template**
2. Use the template from `emailjs-autoreply-template.html`
3. **Subject:** `Thank You for Your Request - Bosswebber`
4. **To Email:** Set to `{{from_email}}` (sends to client)
5. Copy the Template ID for auto-reply

**See `AUTOREPLY_SETUP.md` for detailed auto-reply setup instructions.**

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root directory (if it doesn't exist)
2. Add these variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs
4. **Note:** Auto-reply template ID is optional - form will work without it

## Step 6: Restart Development Server

After adding the `.env` file:
1. Stop the dev server (Ctrl+C)
2. Restart it: `npm run dev`

## Testing

1. Fill out the "Request a Quote" form on your website
2. Submit it
3. Check your email (ibikunzwe@gmail.com) - you should receive the form submission

## Troubleshooting

- **Emails not sending?** Check that all environment variables are set correctly
- **Template errors?** Make sure all template variables match exactly (case-sensitive)
- **Service errors?** Verify your email service is connected and active

## Fallback Method

If EmailJS is not configured, the form will automatically fall back to opening your default email client with a pre-filled message. This ensures the form always works, even without EmailJS setup.

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Check their support section

