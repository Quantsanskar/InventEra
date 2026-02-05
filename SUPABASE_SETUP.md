# Supabase Setup Guide for Campfire Landing Page

This guide will walk you through setting up Supabase for the Campfire Landing Page project built with **Next.js**.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js installed (v18 or higher recommended)
- Your Campfire project running

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: Campfire Landing Page (or any name you prefer)
   - **Database Password**: Choose a strong password (save this somewhere safe)
   - **Region**: Select the region closest to your users
   - **Pricing Plan**: Free tier is sufficient for this project
4. Click **"Create new project"** and wait for the setup to complete (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Navigate to **API** section
3. You'll find two important values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
4. Keep these values handy for the next step

## Step 3: Configure Environment Variables

Your project already has a `.env` file configured. The Supabase credentials should look like:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** These use the `NEXT_PUBLIC_` prefix (required for Next.js) instead of `VITE_` prefix.

If you need to change these values:
1. Open the `.env` file in your project root
2. Update the `NEXT_PUBLIC_SUPABASE_URL` with your Project URL
3. Update the `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon/public key
4. Restart your development server

> **Important:** Never commit the `.env` file to version control. It should already be in your `.gitignore` file.

## Step 4: Create the Database Table

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy and paste the following SQL query:

```sql
-- Create registrations table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  why_campfire TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for registration form)
CREATE POLICY "Allow public inserts"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read all registrations
CREATE POLICY "Allow authenticated reads"
ON registrations
FOR SELECT
TO authenticated
USING (true);

-- Create an index on email for faster lookups
CREATE INDEX idx_registrations_email ON registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
```

4. Click **"Run"** to execute the query
5. You should see a success message

### Table Schema Explanation

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `name` | TEXT | Participant's name |
| `email` | TEXT | Participant's email address |
| `whatsapp` | TEXT | Participant's WhatsApp number |
| `why_campfire` | TEXT | Why they want to join Campfire |
| `created_at` | TIMESTAMP | Registration timestamp (auto-generated) |

## Step 5: Verify the Setup

1. Go to **Table Editor** in the left sidebar
2. You should see the `registrations` table
3. Click on the table to view its structure

## Step 6: Test the Connection

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/campfire-register`

3. Fill out and submit the registration form

4. Check the Supabase **Table Editor** → **registrations** to see if the data was inserted

## Step 7: View Registrations

To view all registrations in your Supabase dashboard:

1. Go to **Table Editor**
2. Click on the **registrations** table
3. You'll see all submitted registrations with their details

### Export Registrations as CSV

1. In the Table Editor, click the **download** icon
2. Select **Export to CSV**
3. The data will be downloaded to your computer

## Integration Details

The project includes:

### 1. Supabase Client (`/lib/supabase.js`)

This file contains:
- Supabase client initialization
- Helper functions for database operations:
  - `insertRegistration(data)` - Save new registration
  - `checkEmailExists(email)` - Check if email is already registered
  - `getRegistrationCount()` - Get total registration count

### 2. Registration Form (`/pages/campfire-register.js`)

The form automatically:
- Validates user input
- Submits data to Supabase
- Shows success message with confetti
- Handles errors gracefully

## Security Considerations

### Row Level Security (RLS)

The setup includes Row Level Security policies that:
- Allow anyone (anonymous users) to **insert** new registrations
- Only allow **authenticated users** to read registrations
- This protects your data while allowing public registration

### Environment Variables

- The `NEXT_PUBLIC_` prefix makes variables accessible in the browser
- The anon key is safe for client-side use but has limited permissions
- Never expose the service role key in client-side code

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure your `.env` file exists in the project root
- Verify the variable names use the `NEXT_PUBLIC_` prefix:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after adding environment variables

### Error: "new row violates row-level security policy"

- Check that the RLS policies were created correctly
- Run the SQL query again to ensure the policies exist
- Verify the "Allow public inserts" policy is active

### Error: "relation 'registrations' does not exist"

- Make sure you ran the SQL query to create the table
- Check that you're connected to the correct Supabase project

### Data not appearing in the table

1. Check the browser console for errors (F12 → Console tab)
2. Verify your API keys in `.env` are correct
3. Check the Network tab in browser dev tools for API responses
4. Ensure RLS policies allow inserts

### Registration form not submitting

1. Check that `@supabase/supabase-js` is installed:
   ```bash
   npm list @supabase/supabase-js
   ```
2. If not installed, run:
   ```bash
   npm install @supabase/supabase-js
   ```
3. Restart your development server

## Additional Features (Optional)

### View Registration Count on Landing Page

Add this to your Campfire landing page:

```jsx
import { useState, useEffect } from 'react';
import { getRegistrationCount } from '@/lib/supabase';

// Inside your component
const [registrationCount, setRegistrationCount] = useState(0);

useEffect(() => {
  async function fetchCount() {
    const { success, count } = await getRegistrationCount();
    if (success) {
      setRegistrationCount(count);
    }
  }
  fetchCount();
}, []);

// Display the count
<p>{registrationCount} builders registered</p>
```

### Email Notifications

To receive email notifications when someone registers:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a webhook for the `registrations` table
3. Set it to trigger on `INSERT` events
4. Use a service like [Zapier](https://zapier.com) or [Make](https://make.com) to send emails

### Real-time Subscriptions

To get real-time updates when registrations are added:

```jsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

useEffect(() => {
  // Subscribe to new registrations
  const subscription = supabase
    .channel('registrations')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'registrations' },
      (payload) => {
        console.log('New registration:', payload);
        // Update your UI here
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Database Management

### Backup Your Data

1. Go to **Database** → **Backups** in Supabase
2. Enable automatic backups (available in paid plans)
3. Or manually export data regularly via CSV

### Monitor Usage

1. Go to **Settings** → **Usage** to see:
   - Database size
   - API requests
   - Storage used
2. Free tier includes:
   - 500MB database space
   - 2GB bandwidth
   - 50K monthly active users

## Next Steps

- ✅ Test the registration form thoroughly
- ✅ Set up database backups
- ✅ Monitor usage in the Supabase dashboard
- Consider upgrading to Pro plan for production ($25/month)
- Add email notifications for new registrations
- Create an admin dashboard to view all registrations

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Community Discord](https://discord.supabase.com)

## Support

Need help? You can:
- Check the [Supabase documentation](https://supabase.com/docs)
- Join the [Supabase Discord community](https://discord.supabase.com)
- Open an issue in your project repository
- Email support@supabase.com

---

**Note:** Your Supabase project is already configured and ready to use! Just create the database table using the SQL query above and you're good to go.
