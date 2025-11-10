# Database Setup Instructions

## Quick Setup (Recommended - Using Supabase Dashboard)

The easiest way to set up your database is through the Supabase Dashboard:

### Step 1: Open SQL Editor
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `opzioxctseweszwuaasr`
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run Migration 1
1. Click **New Query**
2. Copy and paste the entire contents of `supabase/migrations/20251109024529_a5669482-80d2-47f4-aa24-4cf4b48a9f5b.sql`
3. Click **Run** (or press Ctrl+Enter)
4. Wait for "Success. No rows returned"

### Step 3: Run Migration 2
1. Click **New Query** again
2. Copy and paste the entire contents of `supabase/migrations/20251109035434_7fd0d034-1cb5-40a7-8a33-b38819659fbf.sql`
3. Click **Run**
4. Wait for "Success. No rows returned"

### Step 4: (Optional) Allow Planners to Insert Aircraft
If you want planners (default role) to be able to create aircraft, run this migration:
1. Click **New Query**
2. Copy and paste the contents of `supabase/migrations/20251110000000_allow_planners_insert_aircraft.sql`
3. Click **Run**

### Step 5: Verify Tables
1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `profiles`
   - `aircraft`
   - `flight_routes`
   - `user_roles`

## Alternative: Using Supabase CLI

If you prefer using the CLI:

### Step 1: Login to Supabase
```sh
npx supabase login
```
This will open your browser for authentication.

### Step 2: Link Your Project
```sh
npx supabase link --project-ref opzioxctseweszwuaasr
```

### Step 3: Push Migrations
```sh
npx supabase db push
```

## Troubleshooting

### If you get "relation does not exist" errors:
- Make sure you ran both migration files in order
- Check that all tables were created in Table Editor

### If you get RLS (Row Level Security) errors:
- The migrations set up RLS policies automatically
- Make sure you're authenticated when testing

### If migrations fail:
- Check the SQL Editor for error messages
- Make sure you're running migrations in the correct order
- Some errors can be ignored if objects already exist (like enums)

