
# Task Management Application

A full-stack task management system built with Node.js, Express, and SQLite.

## Features

- User Authentication (Register/Login)
- Project Management (CRUD operations)
- Task Management (CRUD operations)
- Secure password hashing
- JWT-based authentication
- SQLite database integration

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user

### Projects
- GET `/projects` - Get all projects
- GET `/projects/:id` - Get specific project
- POST `/projects` - Create new project
- PUT `/projects/:id` - Update project
- DELETE `/projects/:id` - Delete project

### Tasks
- GET `/tasks` - Get all tasks
- GET `/tasks/:id` - Get specific task
- POST `/tasks` - Create new task
- PUT `/tasks/:id` - Update task
- DELETE `/tasks/:id` - Delete task

## Tech Stack

- Node.js
- Express.js
- SQLite3
- JSON Web Tokens (JWT)
- bcrypt

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 3000.

## Database Schema

### Users Table
- id (PRIMARY KEY)
- username
- email (UNIQUE)
- password
- created_at

### Projects Table
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- name
- created_at

### Tasks Table
- id (PRIMARY KEY)
- project_id (FOREIGN KEY)
- title
- description
- due_date
- created_at
