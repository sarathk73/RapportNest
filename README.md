# Rapport Nest - Contact Management System

## Overview

Rapport Nest is a contact management system designed for small organizations. Users can sign up, create contacts, view shared contacts, search for contacts, and much more. This system is built with a robust backend using Node.js and Express, and a frontend using React. It includes features like phone OTP authentication, rate limiting, and user management.

## Features

- **User Registration & Authentication**: Users can sign up with OTP verification, log in, and manage their sessions.
- **Contact Management**: Users can create, edit, delete, and view contacts. Contacts shared by other users are view-only.
- **Search**: Users can search contacts by name with pagination support.
- **Rate Limiting**: Prevents brute force attacks on login endpoints.
- **File Uploads**: Supports image uploads for contacts.
- **Pagination**: Contacts and search results are paginated for better performance and user experience.


### Environment Variables

#### Backend

The backend uses `nodemon.json` for environment variables. Create a `nodemon.json` file in the `backend` directory with the following format:

```json
{
    "env": {
        "DB_USER": "your_db_user",
        "DB_PASSWORD": "your_db_password",
        "DB_NAME": "your_db_name",
        "JWT_KEY": "your_jwt_secret_key"
    }
}
```

*Note: Replace the placeholders with your actual environment values. Do not expose sensitive information publicly.*

#### Frontend

Create a `.env` file in the `frontend` directory with the following environment variables:

```
REACT_APP_BACKEND_URL=http://localhost:5000/api
REACT_APP_ASSET_URL=http://localhost:5000
```

### Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Environment Setup**
   - Ensure MongoDB is running and configure `nodemon.json` with your MongoDB connection details.

## Running the Application

- Start the backend server:
  ```bash
  cd backend
  npm start
  ```

- Start the frontend server:
  ```bash
  cd frontend
  npm start
  ```

## API Documentation

### Users

- **GET /api/users** - Fetch all users.
- **POST /api/users/signup** - Sign up a new user.
- **POST /api/users/login** - Log in a user.
- **POST /api/users/email-verify-login** - OTP-based email verification for login.

### Contacts

- **GET /api/contacts/:pid** - Get contact by ID.
- **GET /api/contacts/user/:uid** - Get contacts by user ID.
- **GET /api/contacts/user/:uid/paginated** - Get paginated contacts by user ID.
- **POST /api/contacts** - Create a new contact.
- **PATCH /api/contacts/:pid** - Update a contact.
- **DELETE /api/contacts/:pid** - Delete a contact.
- **GET /api/contacts/search** - Search contacts by name.
- **GET /api/contacts/tags** - Get all tags.
- **GET /api/contacts/tag/:tag** - Get contacts by tag.

## Security Features

- **Rate Limiting**: Prevents brute force attacks by limiting the number of requests to authentication endpoints.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **File Upload Security**: Limits file size and validates MIME types for uploaded files.

---
