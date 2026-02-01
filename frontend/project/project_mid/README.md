# GymBae Frontend

React + Vite frontend application for GymBae fitness platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

Create `.env` file to configure backend API URL:

```
VITE_API_URL=http://localhost:5194
```

Defaults to `http://localhost:5194` if not specified.

## Project Structure

- `src/components/` - React components
- `src/context/` - React context (Auth)
- `src/lib/` - Utilities and API helpers
- `public/` - Static assets

## Features

- User authentication
- Protected routes
- Profile management
- Workout plan creation
- Subscription management
