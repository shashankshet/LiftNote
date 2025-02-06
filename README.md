# 💪 LiftNote - Your Ultimate Weight Training Companion

Welcome to **LiftNote**, an interactive weight training logging app designed to help you **track your progress**, **optimize your workouts**, and **train smarter**. Whether you're hitting PRs or refining your form, LiftNote is here to elevate your fitness journey. 🚀

> ⚠️ **Note:** Currently, only the **frontend** is hosted. The **backend** will be hosted soon for full user access. Stay tuned! 🚀

---

## 🚀 Features
- **Workout Logging**: Record exercises, sets, reps, and weights effortlessly.
- **Progress Tracking**: Visualize your gains over time.
- **Smart Recommendations**: Train optimally with data-driven insights.
- **Google Authentication**: Secure sign-in with Google OAuth.

---

## ⚙️ Technical Setup

### 🖥️ Frontend (React)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### 🗄️ Backend (Go + MongoDB)

#### 1️⃣ Prerequisites
- **MongoDB**: Make sure MongoDB is installed and running.

#### 2️⃣ Setup Backend

```bash
# Navigate to the backend directory
cd backend

# Install Go packages
go mod tidy
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the `backend` folder with the following:

```env
MONGODB_URI=mongodb://localhost:27017/liftnote
PORT=8080
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URL=http://localhost:8080/auth/google/callback
```

#### 4️⃣ Run the Backend Server

```bash
go run cmd/main.go
```

---

## 🔑 Authentication
LiftNote uses **Google OAuth 2.0** for seamless and secure login. Make sure to set up your Google credentials and update the `.env` file accordingly.

---

## 📊 Database
- **Database:** MongoDB
- **Collections:** Users, Workouts
- Designed to efficiently store and retrieve workout logs for quick performance.

---

## 🤝 Contributing
We welcome contributions! 🚀  
1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/awesome-feature`)  
3. Commit your changes (`git commit -m 'Add awesome feature'`)  
4. Push to the branch (`git push origin feature/awesome-feature`)  
5. Open a pull request 🎉

---

## 📧 Contact
For any questions or suggestions:
- **GitHub:** [LiftNote Repository](https://github.com/shashankshet/LiftNote)
- **Email:** shashankshet@example.com

---

## ⭐ Show Your Support
If you find this project helpful, **star the repository** ⭐ and help us spread the word!

> **"Train Hard. Track Smart. LiftNote."** 💥

