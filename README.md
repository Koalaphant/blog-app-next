# 📝 Next.js Blog with Supabase and Prisma

This project is a full-featured blog built with **Next.js**, **Supabase**, and **Prisma ORM**. The blog supports all CRUD operations, allows users to submit posts via the front end, fetches live fixture data through a third-party API, and is fully responsive.

## 🚀 Features
- **CRUD Operations:** Create, Read, Update, and Delete posts directly from the front end.
- **Live Fixture Updates:** Fetches the latest fixture data using a third-party API.
- **Next.js API Routes:** Handles server-side CRUD operations for seamless data management.
- **Responsive Design:** Adapts to various screen sizes, ensuring a consistent user experience across devices.

## 🛠️ Tech Stack
- **Next.js:** React framework for server-side rendering and static site generation.
- **Supabase:** Open-source backend as a service, offering real-time data synchronization.
- **Prisma ORM:** Type-safe database management with an intuitive API.

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v14.x or later
- [npm](https://www.npmjs.com/) v6.x or later or [yarn](https://yarnpkg.com/) v1.x or later

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies:
   ```bash
   npm install

3. Create a .env.local file in the root directory and add the following environment variables (replace with your actual credentials):
   ```bash
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_url
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_FOOTBALL=your_api_football_key
   NEXT_PUBLIC_API_URL=http://localhost:3000/api

### Database Setup
1. Run Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
2. To visualise and manage your database, you can use Prisma Studio:
   ```bash
   npm prisma studio

### Running the Project
1. Start the development server:
   ```bash
   npm run dev
2. Open your browser and navigate to http://localhost:3000

## 🔐 Next Steps
- **Authentication:** Implement authentication to protect the admin panel route and secure API routes, ensuring only authorized users can manage content.

## 🤝 Contributing
- Contributions, issues, and feature requests are welcome!