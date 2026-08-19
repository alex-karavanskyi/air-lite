# AirLite

AirLite is a full-stack vacation rental marketplace built with Next.js. It lets travelers discover and book properties while giving hosts tools to publish listings, manage reservations, and review rental performance.

## Features

- Browse, search, and filter rental properties by category
- View listing details, amenities, availability, reviews, and an interactive location map
- Sign up, sign in, and manage a personal profile through Clerk
- Save favorite properties and share listings by email or social platforms
- Select available dates, create bookings, and manage trip history
- Create, edit, and delete rental listings; review reservations and booking income
- Submit property ratings and reviews, with light and dark themes across the interface

## Tech Stack

- Next.js 15 App Router, React 19, and TypeScript
- Tailwind CSS 4, Radix UI primitives, and shadcn/ui configuration
- Clerk for authentication and user management
- Prisma ORM with PostgreSQL
- Supabase Storage for property and profile images
- Zod for server-side form validation and Zustand for booking state
- Leaflet and OpenStreetMap for property maps

## Testing

The project currently has no automated test suite or `test` script. Code quality is checked with ESLint, and a production build can be used to verify compilation and type safety:

```bash
npm run lint
npm run build
```

## Getting Started

### Requirements

- Node.js and npm
- A PostgreSQL database
- A Clerk application
- A Supabase project with a public storage bucket named `Air-Lite`

### Installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/alex-karavanskyi/air-lite.git
   cd air-lite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and configure the services used by the application:

   ```dotenv
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_supabase_key

   NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
   ```

   Keep real credentials out of source control. The repository ignores environment files.

4. Ensure the PostgreSQL database matches the models in `prisma/schema.prisma`, then start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

There is currently no automated test command. Use the lint and build commands shown in the [Testing](#testing) section for project checks.

## Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the Next.js development server     |
| `npm run build` | Create a production build                |
| `npm run start` | Run the production server after building |
| `npm run lint`  | Run ESLint checks                        |

## Project Structure

```text
app/                Routes, layouts, providers, and page-level loading states
components/         Feature components for listings, bookings, forms, and navigation
shared/actions/     Server actions for profiles, properties, favorites, reviews, and bookings
shared/ui/          Reusable interface primitives
shared/utils/       Validation, database, storage, state, and formatting utilities
prisma/             PostgreSQL data model and Prisma schema
public/             Static assets
```

## Live Demo

[View the live application](https://air-lite-next.vercel.app)
