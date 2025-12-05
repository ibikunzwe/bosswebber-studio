# EmailJS 422 Error Troubleshooting Guide

## What is a 422 Error?

A 422 (Unprocessable Entity) error from EmailJS means the request was well-formed but couldn't be processed, usually due to:
- Template variables don't match
- Missing required variables
- Invalid variable values

## Step-by-Step Fix

### Step 1: Verify Your EmailJS Template Variables

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Click on your template
4. Check that these variables exist EXACTLY as shown (case-sensitive):

```
{{from_name}}
{{from_email}}
{{phone}}
{{company}}
{{project_type}}
{{budget}}
{{timeline}}
{{industry}}
{{references}}
{{content_ready}}
{{message}}
{{to_email}}
{{to_name}}
{{reply_to}}
```

### Step 2: Check Your .env File

Make sure your `.env` file in the project root has:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxx
```

**Important:**
- No quotes around the values
- No spaces before/after the `=`
- Use your actual IDs from EmailJS dashboard

### Step 3: Verify Service is Active

1. Go to **Email Services** in EmailJS dashboard
2. Make sure your service shows as "Active" (green)
3. If inactive, reconnect it

### Step 4: Check Template Settings

In your EmailJS template:
- **To Email:** Should be `{{to_email}}` or your actual email
- **From Name:** Can be static like "Bosswebber" or use `{{from_name}}`
- **Subject:** Should use variables like `New Project Request from {{from_name}}`

### Step 5: Test with Minimal Template

If still having issues, create a simple test template with just:

**Subject:**
```
Test from {{from_name}}
```

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

If this works, gradually add more variables.

### Step 6: Check Browser Console

Open browser DevTools (F12) → Console tab and look for:
- Exact error message
- Which variable is missing
- Service/Template ID errors

## Common Issues & Solutions

### Issue: "Invalid template"
**Solution:** Template ID in `.env` doesn't match EmailJS dashboard

### Issue: "Invalid service"
**Solution:** Service ID in `.env` doesn't match or service is inactive

### Issue: "Variable not found"
**Solution:** Variable name in template doesn't match what's being sent (check spelling, case)

### Issue: Variables show as empty
**Solution:** Form fields might not be capturing values correctly - check form field names

## Quick Test

1. Fill out the form completely
2. Submit it
3. Check browser console for detailed error
4. Compare error with template variables
5. Fix mismatches

## Still Not Working?

1. **Double-check all IDs** - Copy directly from EmailJS dashboard
2. **Restart dev server** after changing `.env`
3. **Clear browser cache** and try again
4. **Use fallback method** - The form will use mailto: if EmailJS fails

## Need Help?

Check the browser console for the exact error message and share it for more specific help.

