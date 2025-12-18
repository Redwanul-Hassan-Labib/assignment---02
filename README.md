# Vehicle Rental API – REST Backend

A clean and structured REST API for a Vehicle Rental platform.
Supports authentication, user management, vehicle management, and booking system.

---

## 🔗 Live URL

https://assignment-02-orpin.vercel.app/

## 📦 Repository

https://github.com/Redwanul-Hassan-Labib/assignment---02.git

---

# 🚀 Features

* User Authentication (Signup / Signin)
* Role-based Access (customer/Admin)
* Vehicle CRUD operations
* Booking system
* User management
* Secure routes using JWT
* Clean folder structure

---

# 🛠️ Technology Stack

* **Node.js**
* **Express.js**
* **PostgreSQL + NeonBD**
* **JWT Authentication**
* **bcrypt Password Hashing**
* **dotenv for environment config**

---

# 📁 API Endpoints

## 🔐 Auth Routes

### **POST /api/v1/auth/signup**

Create a new user account.

### **POST /api/v1/auth/signin**

Sign in and receive JWT token.

---

## 🚗 Vehicle Routes

### **POST /api/v1/vehicles**

Create new vehicle (Admin).

### **GET /api/v1/vehicles**

Get all vehicles.

### **GET /api/v1/vehicles/:vehicleId**

Get single vehicle details.

### **PUT /api/v1/vehicles/:vehicleId**

Update a vehicle.

### **DELETE /api/v1/vehicles/:vehicleId**

Delete a vehicle.

---

## 👤 User Routes

### **GET /api/v1/users**

Get all users.

### **PUT /api/v1/users/:userId**

Update a user.

### **DELETE /api/v1/users/:userId**

Delete a user.

---

## 📄 Booking Routes

### **POST /api/v1/bookings**

Create a booking.

### **GET /api/v1/bookings**

Get all bookings
(Admin → all, User → own bookings)

### **PUT /api/v1/bookings/:bookingId**

Update a specific booking.

---

# ⚙️ Installation & Setup

Follow these steps to run the project locally:

### **1. Clone the Repository**

```bash
git clone https://github.com/Redwanul-Hassan-Labib/assignment---02.git
cd <project-folder>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Create .env File**

Inside the project root, create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4. Run the Server**

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

### **5. Test the API**

Use **Postman**, **Insomnia**, or your frontend app.

---

# 📚 Folder Structure (Example)

```
/src
 ├── controllers
 ├── routes
 ├── models
 ├── middlewares
 ├── utils
 └── server.js
```

---

# ✅ Summary

This README includes:

* Full API documentation
* Installation guide
* Tech stack
* All endpoints
* Usage instructions

Add your repo link + live URL at the top and you're done.
