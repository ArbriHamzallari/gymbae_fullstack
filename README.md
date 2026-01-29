# GymBae - Full Stack Fitness Application

A full-stack fitness application with user authentication, profile management, workout plans, and subscription features.

## Tech Stack

- **Backend**: ASP.NET Core 9.0, Entity Framework Core, MySQL, JWT Authentication
- **Frontend**: React 18, Vite, React Router, Tailwind CSS

## Prerequisites

- **.NET SDK 9.0** (or 8.0/7.0)
- **Node.js 18+** and npm
- **MySQL Server** (running locally or remotely)
- **Visual Studio Code** or **Visual Studio** (recommended)

## Quick Start

### 1. Database Setup

Ensure MySQL is running and create the database:

```sql
CREATE DATABASE gym_bae;
```

### 2. Backend Setup

```bash
cd backend

# Restore dependencies
dotnet restore

# Update database (run migrations)
dotnet ef database update

# Configure database connection in appsettings.json
# Update ConnectionStrings.DefaultConnection with your MySQL credentials

# Run backend
dotnet run
```

Backend will start on: `http://localhost:5194`
Swagger UI: `http://localhost:5194/swagger`

### 3. Frontend Setup

```bash
cd frontend/project/project_mid

# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:5194)
# Add: VITE_API_URL=http://localhost:5194

# Run frontend
npm run dev
```

Frontend will start on: `http://localhost:5173`

## Configuration

### Backend Configuration

Edit `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=gym_bae;User=root;Password=YOUR_PASSWORD;"
  },
  "Jwt": {
    "Key": "YOUR_SECRET_KEY_HERE"
  }
}
```

**For Remote Database:**
- Change `Server=localhost` to your database server IP
- Ensure MySQL allows remote connections
- Configure firewall to allow port 3306

### Frontend Configuration

Create `frontend/project/project_mid/.env`:

```
VITE_API_URL=http://localhost:5194
```

**For Remote Backend:**
- Change to backend server IP: `VITE_API_URL=http://BACKEND_IP:5194`
- Update backend CORS settings in `appsettings.json`

### CORS Configuration

If frontend and backend are on different machines, update `backend/appsettings.json`:

```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://FRONTEND_IP:5173"
    ]
  }
}
```

## Project Structure

```
gymbae_fullstack/
├── backend/                 # ASP.NET Core API
│   ├── Controllers/         # API endpoints
│   ├── Services/            # Business logic
│   ├── Model/              # Data models and DTOs
│   ├── Data/               # DbContext
│   └── Migrations/         # Database migrations
│
└── frontend/
    └── project/
        └── project_mid/     # React application
            ├── src/
            │   ├── components/    # React components
            │   ├── context/       # Auth context
            │   └── lib/          # API utilities
            └── public/            # Static assets
```

## Features

- ✅ User Authentication (Sign Up / Login)
- ✅ JWT Token-based Authentication
- ✅ Protected Routes
- ✅ User Profile Management
- ✅ Workout Plan Creation & Editing
- ✅ Subscription Management (Mock)
- ✅ Error Handling & Validation
- ✅ Responsive UI

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Account (Requires Auth)
- `GET /api/account/me` - Get current user info

### Profile (Requires Auth)
- `GET /api/profile/me` - Get user profile
- `POST /api/profile/create` - Create profile
- `PUT /api/profile/update` - Update profile

### Plan (Requires Auth)
- `GET /api/plan/me` - Get user's plan
- `POST /api/plan` - Create plan
- `PUT /api/plan/me` - Update plan

### Subscription (Requires Auth)
- `GET /api/subscription/me` - Get subscription
- `POST /api/subscription` - Create subscription
- `PUT /api/subscription/me` - Update subscription

## Testing

1. **Sign Up**: Create a new account
2. **Login**: Use credentials to login
3. **Profile**: Complete your profile
4. **Plan**: Create a workout plan
5. **Subscription**: Subscribe to a plan
6. **Logout**: Test logout functionality

## Troubleshooting

### Backend Won't Start
- Check MySQL is running
- Verify database connection string
- Check port 5194 is not in use
- Run `dotnet restore` and `dotnet build`

### Frontend Won't Start
- Run `npm install` in frontend folder
- Check Node.js version (18+)
- Verify port 5173 is available

### Database Connection Failed
- Verify MySQL is running
- Check connection string credentials
- Ensure database `gym_bae` exists
- For remote database: check firewall and MySQL remote access

### CORS Errors
- Update CORS settings in `backend/appsettings.json`
- Ensure frontend URL is in allowed origins
- Restart backend after CORS changes

## Development Notes

- Backend uses Entity Framework Core migrations
- Frontend uses Vite for fast development
- JWT tokens stored in localStorage
- All API calls include authentication headers automatically
- Error handling implemented for network failures and expired tokens

## License

This project is for educational purposes.
