# Email Setup Guide for Contact Form

## EmailJS Setup (Free - 200 emails/month)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

### Step 2: Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred service)
4. Connect your Gmail account (mohamedarshad1507@gmail.com)
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Template Name:** `contact_form`

**Subject:** `New Contact from Portfolio - {{from_name}}`

**Content:**
```
New message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Copy the **Template ID** (e.g., `template_xxxxxxx`)

### Step 4: Create Auto-Reply Template
1. Create another template for auto-reply
2. **Template Name:** `auto_reply`

**Subject:** `Thank you for contacting Mohamed Arshad`

**Content:**
```
Hi {{from_name}},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Here's a copy of your message:
Subject: {{subject}}
Message: {{message}}

Best regards,
Mohamed Arshad M
Full Stack & Flutter Developer

---
This is an automated response. Please do not reply to this email.
```

3. Copy the **Template ID** for auto-reply

### Step 5: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_xxxxxxxxxxxxxxx`)

### Step 6: Update the Code
Open `components/apps/mail.tsx` and replace the placeholder values:

```typescript
const SERVICE_ID = "service_xxxxxxx";  // Your service ID
const TEMPLATE_ID = "template_xxxxxxx"; // Your template ID
const AUTO_REPLY_TEMPLATE_ID = "template_xxxxxxx"; // Auto-reply template ID
const PUBLIC_KEY = "user_xxxxxxxxxxxxxxx"; // Your public key
```

### Step 7: Test
1. Open your portfolio
2. Fill out the contact form
3. Click Send
4. Check your email (mohamedarshad1507@gmail.com)
5. The sender should receive an auto-reply

## Environment Variables (Optional - More Secure)

Create `.env.local` file:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_AUTO_REPLY_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxxxxxxxxxxxxxx
```

Then use in code:
```typescript
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
```

## Troubleshooting

- **Emails not sending?** Check EmailJS dashboard for errors
- **Auto-reply not working?** Make sure you created the auto-reply template
- **Rate limit?** Free plan has 200 emails/month
- **Spam folder?** Check spam for test emails

## Alternative: Web3Forms (Even Easier)

If EmailJS is too complex, use Web3Forms:
1. Go to https://web3forms.com/
2. Sign up and get an access key
3. Much simpler - just one API call
