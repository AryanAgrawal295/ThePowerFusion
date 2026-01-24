# Frontend-Backend Integration Setup

## Overview
This project has been fully integrated with GraphQL backend. Frontend (Next.js) communicates with Backend (GraphQL Apollo Server) via Apollo Client.

## Project Structure

```
power-up-planner/
├── app/                    # Frontend Next.js pages
├── src/
│   ├── lib/
│   │   ├── apollo-client.ts    # Apollo Client configuration
│   │   ├── auth.ts             # Auth utilities
│   │   └── graphql/
│   │       └── queries/        # GraphQL queries & mutations
│   └── components/            # UI components
└── Power-Fusion/             # Backend GraphQL API
    └── app/api/graphql/      # GraphQL endpoint
```

## Setup Instructions

### 1. Install Dependencies

**Frontend:**
```bash
cd power-up-planner
npm install
```

**Backend:**
```bash
cd Power-Fusion
npm install
```

### 2. Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:3001/api/graphql
```

**Backend (.env.local in Power-Fusion/):**
```env
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
```

### 3. Run Both Servers

**Terminal 1 - Backend:**
```bash
cd Power-Fusion
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd power-up-planner
npm run dev
# Runs on http://localhost:3000
```

## Features Integrated

### ✅ Authentication
- **Login**: `/app/login/page.tsx` - Integrated with GraphQL `login` mutation
- **Signup**: `/app/signup/page.tsx` - Integrated with GraphQL `register` mutation
- JWT tokens stored in localStorage
- Auto-redirect on authentication errors

### ✅ Properties
- **Properties Page**: `/app/properties/page.tsx` - Fetches from GraphQL `myProperties` query
- **Create Property**: Integrated with `createProperty` mutation
- Real-time data fetching and updates

### ✅ GraphQL Client
- Apollo Client configured with:
  - JWT token authentication
  - Error handling
  - Auto token refresh (ready for implementation)
  - Cache management

## API Endpoints

### GraphQL Endpoint
- **URL**: `http://localhost:3001/api/graphql`
- **Method**: POST (GraphQL)
- **Auth**: Bearer token in Authorization header

### Available Queries
- `me` - Get current user
- `myProperties` - Get user's properties

### Available Mutations
- `login(input: LoginInput!)` - User login
- `register(input: RegisterInput!)` - User registration
- `createProperty(input: CreatePropertyInput!)` - Create new property
- `logout` - User logout

## Authentication Flow

1. User logs in → GraphQL `login` mutation
2. Backend returns `accessToken` and `refreshToken`
3. Tokens stored in localStorage
4. All subsequent requests include token in Authorization header
5. On token expiry, user redirected to login

## Next Steps

1. **Install Apollo Client dependencies:**
   ```bash
   cd power-up-planner
   npm install @apollo/client graphql graphql-tag
   ```

2. **Start backend server:**
   ```bash
   cd Power-Fusion
   npm run dev
   ```

3. **Start frontend server:**
   ```bash
   cd power-up-planner
   npm run dev
   ```

4. **Test the integration:**
   - Visit http://localhost:3000
   - Try signing up a new user
   - Login with credentials
   - Create a property
   - View properties list

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure backend allows requests from frontend origin.

### Connection Errors
- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_GRAPHQL_URI` in `.env.local`
- Verify MongoDB connection in backend

### Authentication Issues
- Check token storage in localStorage
- Verify JWT secrets in backend `.env`
- Check network tab for API responses
