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

## Project Structure

```
rapport-nest/
├── backend/
│   ├── controllers/
│   │   ├── contacts-controllers.js
│   │   ├── users-controllers.js
│   ├── middleware/
│   │   ├── rateLimit.js
│   │   ├── check-auth.js
│   │   ├── file-upload.js
│   │   ├── parse-phone-numbers.js
│   ├── models/
│   │   ├── contact.js
│   │   ├── http-error.js
│   │   ├── user.js
│   ├── routes/
│   │   ├── contacts-routes.js
│   │   ├── users-routes.js
│   ├── app.js
│   ├── .env
```


### Environment Variables

Create a `.env` file in the root of your backend directory and add the following:

```
MONGO_URI=your_mongo_db_connection_string
JWT_KEY=your_jwt_secret_key
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
   - Ensure MongoDB is running and replace `MONGO_URI` in `.env` with your MongoDB connection string.

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

### Contacts

- **GET /api/contacts/:pid** - Get contact by ID.
- **GET /api/contacts/user/:uid** - Get contacts by user ID.
- **POST /api/contacts** - Create a new contact.
- **PATCH /api/contacts/:pid** - Update a contact.
- **DELETE /api/contacts/:pid** - Delete a contact.
- **GET /api/contacts/search** - Search contacts by name.

## Security Features

- **Rate Limiting**: Prevents brute force attacks by limiting the number of requests to authentication endpoints.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **File Upload Security**: Limits file size and validates MIME types for uploaded files.


## License

This project is licensed under the MIT License.

---

Feel free to contact us for any questions or support regarding this project.
