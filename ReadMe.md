# 🍔 Food Delivery Web Application

A full-stack Food Delivery platform built using the **MERN stack** 
(MongoDB, Express.js, React.js, Node.js), designed for seamless restaurant browsing,food ordering, and order tracking.

---

## 🚀 Live Demo

> 🔗 Click below to explore the deployed environments:

- 🌐 **Frontend**: [View Website](https://fooddelivery-frontend-t8w2.onrender.com)
- ⚙️ **Backend**: [API Endpoint](https://fooddelivery-backend-1ocy.onrender.com)
- 🛠️ **Admin Panel**: [Admin Dashboard](https://fooddelivery-admin-qsig.onrender.com))


---

## 📂 Project Structure

This repository includes:
FoodDelivery/
│
├── client/ # Frontend (React.js)
├── admin/ # Admin Panel (React.js)
└── server/ # Backend (Node.js + Express)

---

## 🧑‍🍳 Features

### User (Frontend)
- Browse food categories and items
- Add to cart and place orders
- User registration and login
- Track order status
- Responsive UI for all devices

### Admin Panel
- Secure admin login
- Manage food items and categories
- View and manage user orders
- Update order statuses

### Backend (API)
- RESTful APIs using Express
- JWT-based Authentication
- Stripe Payment Gateway Integration
- MongoDB database (via Mongoose)
- Role-based access control

---

## 🛠️ Tech Stack

| Technology       | Description                        |
|------------------|------------------------------------|
| React.js         | Frontend framework                 |
| Node.js + Express| Backend server                     |
| MongoDB          | NoSQL database                     |
| Stripe           | Payment gateway integration        |
| JWT              | Authentication & authorization     |
| Axios            | API handling on frontend           |
| Toastify         | Notification system                |
| CSS              | Custom styling                     |

---

## 💡 Installation

1. Clone the repository

```bash
git clone https://github.com/Ashutosh-02502/FoodDelivery.git
cd FoodDelivery
------
2. Setup Backend

cd backend
npm install
npm run server
------
3. Setup Frontend

cd frontend
npm install
npm run dev
------
3. Setup Admin panel

cd admin
npm install
npm run dev
------

.env
PORT=4000 / Deployed backend Url
MONGO_URI=your_mongodb_connection_string
JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_key"
