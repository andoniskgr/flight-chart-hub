# AIMS Flight Management System

Aviation Information Management System for managing aircraft flight routes and schedules with Gantt chart visualization.

## Features

- ✈️ Aircraft fleet management
- 📅 Flight route scheduling with Gantt chart view
- 🔐 User authentication and role-based access control
- 📊 Real-time flight status tracking
- 🎨 Modern UI built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query (TanStack Query)

## Prerequisites

- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- A Supabase account and project ([Sign up here](https://supabase.com))

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <YOUR_GIT_URL>
cd flight-chart-hub
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com/dashboard)
2. Get your project credentials:
   - Go to **Project Settings** > **API**
   - Copy your **Project URL** and **anon/public key**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_public_key
```

**Important:** Do NOT use quotes around the values in the `.env` file. Vite will include the quotes as part of the value, which will break the connection.

Replace the values with your actual Supabase credentials.

### 5. Run Database Migrations

The project includes Supabase migrations in the `supabase/migrations/` directory. To apply them:

**Option A: Using Supabase CLI (Recommended)**

**Easiest method - Use npx (no installation needed, works on all platforms):**
```sh
# Link to your project (use the project ID from supabase/config.toml)
npx supabase link --project-ref kulplabivhthnocguwzv

# Apply migrations
npx supabase db push
```

**Alternative installation methods:**

**Install as a local dev dependency (recommended for teams):**
```sh
npm install --save-dev supabase
npx supabase link --project-ref kulplabivhthnocguwzv
npx supabase db push
```

**macOS (using Homebrew):**
```sh
brew install supabase/tap/supabase
supabase link --project-ref kulplabivhthnocguwzv
supabase db push
```

**Linux - Download binary directly:**
```sh
# Download from https://github.com/supabase/cli/releases
# Extract and add to PATH, then:
supabase link --project-ref kulplabivhthnocguwzv
supabase db push
```

**Or use Docker:**
```sh
docker run --rm -it -v $(pwd):/workspace -w /workspace supabase/cli link --project-ref kulplabivhthnocguwzv
docker run --rm -it -v $(pwd):/workspace -w /workspace supabase/cli db push
```

**Option B: Using Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL files from `supabase/migrations/` in order:
   - `20251109024529_a5669482-80d2-47f4-aa24-4cf4b48a9f5b.sql`
   - `20251109035434_7fd0d034-1cb5-40a7-8a33-b38819659fbf.sql`

### 6. Start Development Server

```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Database Schema

The application uses the following main tables:

- **profiles**: User profiles with roles (admin, controller, planner)
- **user_roles**: User role assignments
- **aircraft**: Aircraft fleet information
- **flight_routes**: Flight schedules and routes

## Authentication

The app uses Supabase Authentication with email/password. Users can sign up with:
- Full Name
- Email
- Password
- 4-letter code (stored in user metadata)

Default role for new users: `planner`

## Deployment

### Build for Production

```sh
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository to Vercel or Netlify
2. Add your environment variables in the platform settings
3. Deploy!

The app is configured to work with any static hosting service that supports environment variables.

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Feature components
├── pages/           # Page components
├── integrations/    # External service integrations
│   └── supabase/    # Supabase client and types
├── hooks/           # Custom React hooks
└── lib/             # Utility functions

supabase/
├── migrations/      # Database migration files
└── config.toml      # Supabase project configuration
```

## Development

- **Linting**: `npm run lint`
- **Type Checking**: TypeScript is configured with strict mode
- **Hot Reload**: Enabled in development mode

## Additional Documentation

- **Database Setup**: See [SETUP_DATABASE.md](./SETUP_DATABASE.md) for detailed database migration instructions
- **Troubleshooting**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions

## License

Private project - All rights reserved
