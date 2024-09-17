# USave - Expense Tracking Application

USave is a web-based expense tracking application built with Node.js, Express, and React. It enables users to manage their finances efficiently by providing features such as budget management, expense tracking, and user authentication.

## Demonstration Video 
Check out the demonstration video of the USave program: <a href="https://drive.google.com/file/d/1IgkSVOIG4sEo2vwcsaQe4R_hYMLipQH7/view?usp=sharing" target="_blank">Watch the demo video</a>

## Features

- **User Authentication**: Secure user login and registration with JWT (JSON Web Token) for managing user sessions.
- **Expense Management**: Users can add and delete expenses, allowing for comprehensive tracking of financial activity.
- **Budget Management**: Users can set a budget and monitor their spending against it, with visual feedback on remaining budget and percentage used.
- **Filtering**: Filter expenses by year and month to analyze spending patterns.
- **Responsive Design**: A clean and intuitive UI that is mobile-friendly, providing a seamless experience across devices.

## Tech Stack

- **Frontend**: 
  - React.js
  - CSS for styling
- **Backend**:
  - Node.js
  - Express.js
  - MySQL for database management
- **Libraries**:
  - Axios for making HTTP requests
  - React Router for client-side routing

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)
- A package manager (npm or yarn)

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:sungwoonpark0502/USave.git
   cd USave
2. **Set up the Backend**:
   - Navigate to the backend directory:
      ```bash
      cd usave-backend
   - Install the required packages:
      ```bash
      npm install
   - Set up your MySQL database:
        - Create a new database named usave.
        - Import the SQL schema from db/schema.sql (if provided).
   - Configure the database connection:
        - Update the config/db.js file with your MySQL credentials.
   - Start the backend server:
     ```bash
     node server.js   
4. **Set up the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd usave-frontend
   - Install the required packages:
     ```bash
     npm install
   - Start the frontend application:
     ```bash
     npm start
   - The frontend will be available at http://localhost:3000.
  
   ### Environment Variables

Ensure that you have the necessary environment variables set for your backend, such as database credentials and JWT secret. You can create a `.env` file in the backend directory with the following format:

    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=usave
    JWT_SECRET=your_jwt_secret

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user or log in with an existing account.
3. Once logged in, you can add expenses, set budgets, and view your expense list.
4. Use the filtering options to analyze your spending by month and year.

### API Endpoints

The backend exposes the following API endpoints:

- **POST** `/api/register`: Register a new user.
- **POST** `/api/login`: Authenticate a user and receive a JWT token.
- **GET** `/api/expenses`: Fetch all expenses for the authenticated user.
- **POST** `/api/expenses`: Create a new expense.
- **PUT** `/api/expenses/:id`: Update an existing expense.
- **DELETE** `/api/expenses/:id`: Delete an expense.

### Contribution

Contributions are welcome! Please feel free to submit issues or pull requests.
