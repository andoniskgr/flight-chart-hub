# Supabase Database Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Not Loading

**Problem:** Supabase client can't connect because environment variables are missing or incorrect.

**Solution:**
- Ensure your `.env` file is in the root directory (same level as `package.json`)
- Remove quotes from values in `.env` file:
  ```env
  # ❌ Wrong (with quotes)
  VITE_SUPABASE_URL="https://xxx.supabase.co"
  
  # ✅ Correct (no quotes)
  VITE_SUPABASE_URL=https://xxx.supabase.co
  ```
- Restart your dev server after changing `.env` file
- Vite only loads `.env` files that start with `VITE_`

### 2. Database Tables Don't Exist

**Problem:** Getting errors like "relation does not exist" or "table not found"

**Solution:**
- Run the database migrations:
  ```sh
  # Option 1: Using npx (easiest)
  npx supabase link --project-ref YOUR_PROJECT_REF
  npx supabase db push
  
  # Option 2: Using Supabase Dashboard
  # Go to SQL Editor and run the migration files in order
  ```

### 3. Row Level Security (RLS) Issues

**Problem:** Can't read/write data even though tables exist

**Solution:**
- Check RLS policies in Supabase Dashboard:
  1. Go to Authentication > Policies
  2. Ensure policies are set up for your tables
  3. Check if you're authenticated (RLS requires auth for most operations)

### 4. Connection Errors

**Problem:** Network errors or "Failed to fetch"

**Solution:**
- Verify your Supabase URL and key are correct:
  - URL format: `https://xxxxx.supabase.co`
  - Key should be the `anon` or `public` key (not the service role key)
- Check if your Supabase project is paused (free tier projects pause after inactivity)
- Verify your internet connection
- Check browser console for CORS errors

### 5. Authentication Issues

**Problem:** Can't sign up or log in

**Solution:**
- Check if email confirmation is required in Supabase settings
- Verify email templates are configured
- Check Supabase Dashboard > Authentication > Settings
- Ensure you're using the correct email/password format

### 6. Type Errors

**Problem:** TypeScript errors about Database types

**Solution:**
- Regenerate types if you've changed the database schema:
  ```sh
  npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/integrations/supabase/types.ts
  ```

## Quick Diagnostic Steps

1. **Check environment variables:**
   ```sh
   # In browser console after app loads:
   console.log(import.meta.env.VITE_SUPABASE_URL)
   console.log(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
   ```

2. **Test connection:**
   - Open browser console and check for connection errors
   - Verify environment variables are loaded:
   ```js
   console.log(import.meta.env.VITE_SUPABASE_URL)
   console.log(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
   ```

3. **Check Supabase Dashboard:**
   - Verify project is active (not paused)
   - Check API settings for correct URL and keys
   - Verify tables exist in Table Editor
   - Check RLS policies in Authentication > Policies

4. **Verify migrations:**
   - Check if tables exist: `profiles`, `aircraft`, `flight_routes`, `user_roles`
   - Verify enums exist: `aircraft_status`, `flight_status`, `app_role`

## Getting Help

If issues persist:
1. Check browser console for specific error messages
2. Check Network tab for failed requests
3. Verify Supabase project status in dashboard
4. Check Supabase logs in Dashboard > Logs

