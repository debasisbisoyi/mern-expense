
# Expense Tracker

A full-stack expense tracker application that allows users to manage their income and expenses, view financial insights, and filter transactions based on date ranges.


## Demo

 https://mern-expense.vercel.app/

demo user 
email: user@user.com
pass: user1234


## Features

- User Authentication - Secure login & signup using JWT authentication
- Dashboard Overview - Displays total balance, income, and expenses
- Transaction Management - Add, delete, and view transactions
- Filter transactions by date range
- View recent transactions
- Financial Insights - Last 30 days of income and expenses
- Visual representation of financial data
- Download Reports - Export expense details as an Excel file
- Responsive UI - Works seamlessly on all devices

## Tech Stack

### Frontend:

React.js

Tailwind CSS for styling

React Router for navigation

Axios for API calls

React Icons for UI enhancements

### Backend:

Node.js with Express.js

MongoDB with Mongoose

JSON Web Tokens (JWT) for authentication

Cloudinary for image storage

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In backend Folder create .env file

`PORT`

`MONGO_URI`

`JWT_SECRET`

In frontend Folder create .env file

`VITE_APP_CLOUDINARY_CLOUDNAME`

`VITE_APP_BACKEND_URL`


### how to run this in local

To Run this project

Inside backend

```bash
npm install
npm run dev
```
Inside frontend
```bash
npm install
npm run dev
```

