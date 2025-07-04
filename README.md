# Event Management System (MERN)

A modern, full-stack Event Management System built with the MERN stack (MongoDB, Express, React, Node.js). Supports user and admin roles, JWT authentication, event CRUD, ticket booking, dashboards, and more.

---

## 🚀 Features
- **User & Admin Roles**: Role-based authentication and access control
- **JWT Authentication**: Secure login and registration
- **Event Management**: Admins can create, update, and delete events
- **Booking System**: Users can book/cancel tickets with seat management
- **Dashboards**: Personalized dashboards for users and admins
- **Responsive UI**: Clean, modern design with mobile support
- **Security**: Password hashing, protected routes, and .env for secrets

---

## 🗂️ Project Structure
```
Ethnus-mern/
├── backend/              # Express API & MongoDB models
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seedEvents.js     # Sample event seeder
│   ├── .env              # Backend environment variables
│   └── server.js
├── frontend/             # React app
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   ├── .env              # Frontend environment variables
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. **Clone the repository**
```sh
git clone <your-repo-url>
cd Ethnus-mern
```

### 2. **Backend Setup**
```sh
cd backend
npm install
```
- Create a `.env` file in `/backend` with:
  ```
  PORT=5000
  MONGO_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_jwt_secret
  ```
- To seed sample events:
  ```sh
  node seedEvents.js
  ```
- Start backend:
  ```sh
  npm start
  ```

### 3. **Frontend Setup**
```sh
cd ../frontend
npm install
```
- Create a `.env` file in `/frontend` with:
  ```
  REACT_APP_API_URL=http://localhost:5000
  ```
- Start frontend:
  ```sh
  npm start
  ```

---

## 🌐 Usage
- Register as a user or admin
- Admins can manage events and view all bookings
- Users can browse events, book/cancel tickets, and view their bookings
- Responsive design for mobile and desktop

---

## 📦 Environment Variables
- **Backend**: `/backend/.env` (never commit this file)
  - `PORT` - API server port
  - `MONGO_URI` - MongoDB Atlas connection string
  - `JWT_SECRET` - Secret for JWT signing
- **Frontend**: `/frontend/.env`
  - `REACT_APP_API_URL` - Backend API URL

---

## 🛡️ Security Notes
- All secrets and sensitive data are kept in `.env` files (see `.gitignore`)
- Passwords are hashed with bcrypt
- JWT is used for authentication and route protection

---

## 📝 License
MIT

---

## 🙏 Credits
Developed as a college MERN stack project by [Your Name].

---

## 📣 Contact
For questions or collaboration, open an issue or contact the maintainer.
