# Mini Expense Tracker

A full-stack expense management application built with React, Tailwind CSS, Node.js, Express, and MySQL.

The application allows users to add, view, update, and delete expenses. The backend is deployed on Render and connected to a cloud-hosted MySQL database using Aiven.

## Live Demo

**Frontend:**
https://mini-expense-tracker-extw.onrender.com/

**Backend API:**
https://mini-expense-tracker-api-2e8h.onrender.com/

**GitHub:**
https://github.com/prashant99vishwakarma/mini-expense-tracker

## Features

* Add new expenses
* View all expenses
* Edit existing expenses
* Delete expenses
* Input validation
* Error handling
* Expense categories
* Expense descriptions
* Expense dates
* Responsive React UI
* Cloud-hosted MySQL database
* REST API architecture

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Vite
* JavaScript

### Backend

* Node.js
* Express.js
* MySQL
* mysql2
* CORS
* dotenv

### Database

* MySQL
* Aiven

### Deployment

* Render
* Aiven

## Project Structure

```text
mini-expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EditExpense.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   └── ExpenseList.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── expenseController.js
│   │
│   ├── routes/
│   │   └── expenseRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Database Schema

The application uses an `expenses` table with the following fields:

| Column         | Type          | Description          |
| -------------- | ------------- | -------------------- |
| `id`           | INT           | Primary key          |
| `title`        | VARCHAR(100)  | Expense title        |
| `amount`       | DECIMAL(10,2) | Expense amount       |
| `category`     | VARCHAR(50)   | Expense category     |
| `description`  | VARCHAR(255)  | Expense description  |
| `expense_date` | DATE          | Date of expense      |
| `created_at`   | TIMESTAMP     | Record creation time |

## API Endpoints

Base URL:

```text
https://mini-expense-tracker-api-2e8h.onrender.com
```

### Get all expenses

```http
GET /expenses
```

### Add an expense

```http
POST /expenses
```

Example request body:

```json
{
  "title": "Lunch",
  "amount": 100,
  "category": "Food",
  "description": "Lunch at office",
  "expense_date": "2026-09-23"
}
```

### Update an expense

```http
PUT /expenses/:id
```

### Delete an expense

```http
DELETE /expenses/:id
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/prashant99vishwakarma/mini-expense-tracker.git
cd mini-expense-tracker
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000

MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=expense_tracker
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on the local Vite development URL shown in the terminal.

## Environment Variables

Database credentials are stored using environment variables and are not committed to GitHub.

Example:

```env
MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=expense_tracker
```

## Deployment

The project uses separate deployment services for the frontend and backend while keeping both inside the same GitHub repository.

```text
React + Tailwind
       ↓
Render Static Site
       ↓
Node.js + Express API
       ↓
Aiven MySQL
```

The frontend communicates with the deployed backend through the REST API.

## Git Workflow

Frontend or backend changes can be deployed by pushing them to the `master` branch:

```bash
git add .
git commit -m "Update project"
git push
```

Render automatically builds and deploys the updated application.

## Future Improvements

Possible future additions include:

* Expense filtering
* Expense search
* Monthly expense summaries
* Charts and analytics
* Authentication
* Pagination
* Budget tracking

## Author

**Prashant Vishwakarma**

B.Tech Computer Science Engineering

GitHub:
https://github.com/prashant99vishwakarma
