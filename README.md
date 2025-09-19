# 🗣️ Anogab – Anonymous Gabbing

**Anogab** (Anonymous Gabbing) is a safe space where you can speak freely, connect with others, and find relief or insight through real conversations. Whether you're looking to share your experiences, ask questions, or simply engage in meaningful small talk, Anogab gives you the freedom to do so without judgment.

🔗 **Live Demo**: [anogab.vercel.app](https://anogab.vercel.app)

---

## 🚀 Features

- 🔐 **One-on-One Anonymous Chats** – Talk freely in private with zero identity sharing.
- 💬 **Open Chatrooms** – Group spaces to share thoughts, stories, or advice.
- 📱 **Responsive Design** – Optimized for both desktop and mobile devices.

---

## 🧠 Tech Stack

- **Frontend**: React, JavaScript, CSS  
- **Backend**: Java 17+, Spring Boot, Maven  
- **Deployment**: Vercel (Frontend), *[Add backend host e.g., Render/Heroku/AWS]*  
- **Containerization**: Docker

---

## 📁 Project Structure

```plaintext
Anogab/
│
├── frontend-anogab/      # React frontend
│   ├── src/              # React components & pages
│   └── package.json      # Frontend dependencies
│
├── anogab/               # Spring Boot backend
│   ├── src/main/java     # Backend source code
│   └── pom.xml           # Maven dependencies
│
└── README.md             # Project documentation
```
---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vivek9545/Anogab.git
cd Anogab
```
### 2. Backend (Spring Boot)

```bash
Copy code
cd anogab

# Build and run the backend
./mvnw clean package
./mvnw spring-boot:run

# Server will run at:
http://localhost:8080
```
### 3. Frontend (React)
```bash
Copy code
cd ../frontend-anogab

# Install dependencies
npm install  # or npm ci

# Start the frontend
npm start

# App will run at:
http://localhost:3000
```

## 🤝 Contributing
We welcome contributions! Here's how you can help:

Fork the repository

```
# Create a branch
git checkout -b feature-name

# Commit your changes
git commit -m "Add feature"

# Push to GitHub
git push origin feature-name

```
## 📜 License
This project is licensed under the [MIT License.](LICENSE)

## 📬 Contact
For inquiries or feedback, reach out:

Email: vivek.meher303@gmail.com

GitHub: [@vivek9545](https://github.com/vivek9545/)
