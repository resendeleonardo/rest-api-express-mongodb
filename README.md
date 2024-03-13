# REST API - Express.js / TypeScript / MongoDB

REST API project with Express.js, TypeScript and MongoDB.

Features:
- Authentication (Registration, Login and Logout)
- Authorization (3 different access roles - Admin, Professional and Basic)

Create the following`.env`file (root folder) and change it to your own settings.

```
PORT=3001
JWT_SECRET=secretkey
NODE_ENV=development
MONGODB_URI=mongodb_URI
```

## Endpoints
Auth - Handles user registration and authentication
- {POST} /api/auth/register
- {POST} /api/auth/login
- {POST} /api/auth/logout

Users - Get current user (all roles) or get all users (Admin only)
- {GET} /api/users/profile
- {GET} /api/users/all

You can use a tool such as Postman to test the api endpoints.

