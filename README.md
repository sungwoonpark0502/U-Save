# USave - Expense Tracker Application

## Overview

USave is a finance tracking application designed to help users manage their expenses efficiently. The application provides a user-friendly interface for adding, viewing, editing, and deleting expenses, allowing users to keep track of their financial activities easily. Built with a modern tech stack, USave aims to deliver a seamless experience across both web and mobile platforms.

## Features

- **User Authentication**: Secure login and registration process for users.
- **Expense Management**: Add, edit, delete, and view expenses with details like name, amount, and date.
- **Responsive Design**: A clean and neat UI inspired by Apple design principles, ensuring a great user experience on all devices.
- **Data Persistence**: Store and retrieve expenses using a MySQL database.

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)

## Usage

- Access the application at [http://localhost:3000](http://localhost:3000) (or the port your React app is running on).
- Register a new user or log in to an existing account.
- Manage your expenses by adding, editing, or deleting entries.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss changes or improvements.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL server running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sungwoonpark0502/USave.git
   cd USave/usave-backend
2. **Install backend dependencies:
   ```bash
   npm install
3. **Set up your database and create a .env file in the usave-backend directory with the following variables:
   ```bash
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   PORT=5003
5. **Start the backend server:
   ```bash
   npm start
6. **In a separate terminal, navigate to the usave-frontend directory:
   ```bash
   cd usave-frontend
8. **Install frontend dependencies:
   ```bash
   npm install
10. **Start the frontend application:**
   ```bash
   npm start
