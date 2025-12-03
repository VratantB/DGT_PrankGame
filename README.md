# Don't Get Caught Prank Game

A fun stealth-based mobile game built with React Native and Expo.

## Features

- 10 unique levels with different scenarios
- Touch-based movement controls
- Level progression system
- Optional progress persistence with Supabase

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up Supabase for progress saving:
   - Copy `.env.example` to `.env`
   - Add your Supabase URL and Anon Key
   - The game works without Supabase, but progress won't be saved across sessions

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

The game will run without environment variables, but to enable progress saving:

- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

See `.env.example` for details.
