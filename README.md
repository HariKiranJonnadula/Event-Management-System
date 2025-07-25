Here is your **cleaned-up and final version** of the `README.md` with the merge conflict resolved, credits properly included, and everything formatted professionally:

---

# Event Management System (MERN)

A modern, full-stack Event Management System built with the MERN stack (MongoDB, Express, React, Node.js). Supports user and admin roles, JWT authentication, event CRUD, ticket booking, dashboards, and more.

---

## 🚀 Features

* **User & Admin Roles**: Role-based authentication and access control
* **JWT Authentication**: Secure login and registration
* **Event Management**: Admins can create, update, and delete events
* **Booking System**: Users can book/cancel tickets with seat management
* **Dashboards**: Personalized dashboards for users and admins
* **Responsive UI**: Clean, modern design with mobile support
* **Security**: Password hashing, protected routes, and `.env` for secrets

---

## 🗂️ Project Structure

```
Event-Management-System/
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

```bash
git clone https://github.com/HariKiranJonnadula/Event-Management-System.git
cd Event-Management-System
```

### 2. **Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file in `/backend` with:

  ```env
  PORT=5000
  MONGO_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_jwt_secret
  ```
* To seed sample events:

  ```bash
  node seedEvents.js
  ```
* Start backend:

  ```bash
  npm start
  ```

### 3. **Frontend Setup**

```bash
cd ../frontend
npm install
```

* Create a `.env` file in `/frontend` with:

  ```env
  REACT_APP_API_URL=http://localhost:5000
  ```
* Start frontend:

  ```bash
  npm start
  ```

---

## 🌐 Usage

* Register as a user or admin
* Admins can manage events and view all bookings
* Users can browse events, book/cancel tickets, and view their bookings
* Responsive design for mobile and desktop

---

## 📦 Environment Variables

**Backend** (`/backend/.env`):

* `PORT` – API server port
* `MONGO_URI` – MongoDB Atlas connection string
* `JWT_SECRET` – Secret for JWT signing

**Frontend** (`/frontend/.env`):

* `REACT_APP_API_URL` – Backend API URL

---

## 🛡️ Security Notes

* Secrets and sensitive data are kept in `.env` files (excluded by `.gitignore`)
* Passwords are hashed using `bcrypt`
* JWT tokens are used for secure authentication

---

## 🙏 Credits

Developed as a college MERN stack project by:

* [Hari Kiran Jonnadula](https://github.com/HariKiranJonnadula)
* And friends

---

## 📝 License

MIT

---

## 📣 Contact

For questions, suggestions, or collaborations, please open an issue or contact the maintainers via GitHub.

---

Let me know if you'd like to:

* Add screenshots or a demo GIF
* Write a LinkedIn post linking to this project
* Deploy the site and add a hosted link to the README

Happy to help!
