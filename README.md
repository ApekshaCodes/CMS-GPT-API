# CMS GPT API

A lightweight content management system (CMS) API built using **Next.js 15**, **TypeScript**, **MongoDB**, and **JWT authentication**. This backend service can serve as the foundation for AI-driven or traditional content platforms.

---

## 🚀 Technologies Used

- **Next.js** 15 (App Router)
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **React 18** (used for API layer with potential UI)

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/CMS-GPT-API.git
cd CMS-GPT-API

 Install dependencies

npm install

 Set up environment variables
Create a .env file in the root directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the development server
npm run dev

🛠 Scripts
npm run dev — Run in development mode

npm run build — Build for production

npm start — Start production server

📁 Project Structure

CMS-GPT-API/
├── src/               # Application source code
├── .env               # Environment variables (not committed)
├── package.json       # Project metadata and scripts
├── tsconfig.json      # TypeScript configuration
├── next.config.ts     # Next.js configuration
└── README.md          # Project documentation

📄 License
This project is licensed under the MIT License.
