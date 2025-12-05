# Fix: "The recipients address is empty" Error

## Problem
EmailJS error: **"The recipients address is empty"** (422 error)

This means EmailJS doesn't know where to send the email.

## Solution: Configure Recipient Email in EmailJS Template

You have **TWO options** to fix this:

### Option 1: Set Recipient Email in Template Settings (RECOMMENDED)

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Click on your template
4. Find the **"To Email"** field in template settings
5. Set it to: `ibikunzwe@gmail.com` (your actual email)
   - OR use: `{{to_email}}` if you want it dynamic
6. **Save** the template

### Option 2: Use Template Variable

If you want to use a variable, make sure:

1. In EmailJS template settings:
   - **To Email:** Set to `{{to_email}}`
   
2. In your template HTML/content:
   - You can reference `{{to_email}}` but it MUST be set in the "To Email" field in template settings

## Important Notes

- The **"To Email"** field in EmailJS template settings is REQUIRED
- You cannot send emails without setting a recipient
- The recipient can be:
  - A static email: `ibikunzwe@gmail.com`
  - A variable: `{{to_email}}` (if you pass `to_email` in params)

## Quick Fix Steps

1. **EmailJS Dashboard** → **Email Templates** → **Your Template**
2. Find **"To Email"** field
3. Enter: `ibikunzwe@gmail.com`
4. **Save**
5. Try submitting the form again

## Verify It's Working

After fixing:
1. Submit the form
2. Check your email: `ibikunzwe@gmail.com`
3. You should receive the form submission

## Still Not Working?

If you're using `{{to_email}}` variable:
- Make sure you're passing `to_email` in the template parameters (we already do this)
- The variable name must match exactly: `{{to_email}}` not `{{toEmail}}` or `{{to_email}}`

The code already sends `to_email: RECIPIENT_EMAIL` in the parameters, so you just need to set the template's "To Email" field to either:
- Static: `ibikunzwe@gmail.com` ✅ (Easiest)
- Variable: `{{to_email}}` ✅ (If you want it dynamic)

