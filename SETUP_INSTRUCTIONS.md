# Setup Instructions

## For Testing on Your PC

### Step 1: Database Setup

1. **Ensure MySQL is running**
   - Check Windows Services for MySQL
   - Start if not running

2. **Create Database**
   ```sql
   mysql -u root -p
   CREATE DATABASE gym_bae;
   EXIT;
   ```

### Step 2: Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Update Database Connection**
   - Edit `appsettings.json`
   - Update `ConnectionStrings.DefaultConnection` with your MySQL password:
     ```json
     "DefaultConnection": "Server=localhost;Port=3306;Database=gym_bae;User=root;Password=YOUR_PASSWORD;"
     ```

3. **Restore and Build**
   ```bash
   dotnet restore
   dotnet ef database update
   dotnet build
   ```

4. **Run Backend**
   ```bash
   dotnet run
   ```
   - Backend will start on `http://localhost:5194`
   - Swagger UI: `http://localhost:5194/swagger`

### Step 3: Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend/project/project_mid
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL (Optional)**
   - Create `.env` file (or use default `localhost:5194`)
   - Add: `VITE_API_URL=http://localhost:5194`

4. **Run Frontend**
   ```bash
   npm run dev
   ```
   - Frontend will start on `http://localhost:5173`

### Step 4: Test Application

1. Open browser: `http://localhost:5173`
2. Sign up for a new account
3. Login with your credentials
4. Complete your profile
5. Create a workout plan
6. Subscribe to a plan

## Configuration Files

### Backend: `backend/appsettings.json`
- Database connection string
- JWT secret key
- CORS settings

### Frontend: `frontend/project/project_mid/.env`
- Backend API URL (optional)

## Common Issues

**Port Already in Use:**
- Backend (5194): Kill process or change port in `launchSettings.json`
- Frontend (5173): Vite will automatically use next available port

**Database Connection Failed:**
- Check MySQL is running
- Verify password in `appsettings.json`
- Ensure database `gym_bae` exists

**CORS Errors:**
- Update CORS in `backend/appsettings.json`
- Add your frontend URL to `AllowedOrigins`
- Restart backend

## Need Help?

Check the main `README.md` for more details.
