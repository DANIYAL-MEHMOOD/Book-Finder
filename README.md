# Book Finder App

## Overview
The **Book Finder App** allows users to:
- Search for books using a custom-built API (created with .NET).
- Save favorite books in a database (SQL Server).
- Implement JWT authentication for user registration and login.
- Persist user preferences (e.g., theme settings) using local storage.
- Manage application state using Vue.js (or React with TypeScript).

---
## Project Structure
```
/book-finder-frontend   (Frontend - Vue.js or React + TypeScript)
/backend                (Backend - .NET Core API)
```

---
## Requirements
### 1. Backend (.NET) - API Development
- Use **ASP.NET Core** (Minimal API or MVC) to create a REST API.
- Use **Entity Framework Core** (or any ORM) to interact with SQL Server.
- Implement **JWT authentication** (users must register and log in before accessing the app).
- Implement the following endpoints:

#### **Auth API**
- `POST /api/auth/register` → Register a new user.
- `POST /api/auth/login` → Authenticate and return a JWT token.

#### **Book API**
- `GET /api/books?search={query}` → Fetch books (from a database or an external API like Google Books).
- `GET /api/books/{id}` → Fetch details of a specific book.

#### **Favorites API (Protected - Requires JWT)**
- `POST /api/favorites` → Save a book as a favorite.
- `GET /api/favorites` → Get all favorite books for the logged-in user.
- `DELETE /api/favorites/{id}` → Remove a book from favorites.

### 2. Frontend (Vue.js or React + TypeScript) - UI Development
- Implement **user authentication** (register & login with JWT).
- Implement a **search bar** to search for books via the API.
- Display **book results** (title, author, and cover image).
- Allow users to **add/remove books from favorites** (only when logged in).
- Show a separate screen for **favorite books**.

### 3. State Management & UI Enhancements
- Use **Vuex (or Pinia) for Vue** / **Context API or Redux for React**.
- Show **loading indicators** while fetching data.
- Handle **API failures & empty states** properly.
- Implement **Light & Dark mode** using Vue's Composition API or React hooks.

---
## Tech Stack
### **Backend (.NET 6 or later)**
- ASP.NET Core Web API
- Entity Framework Core (or any .NET ORM)
- SQL Server
- JWT Authentication

### **Frontend (Vue.js or React + TypeScript)**
- Vue 3 (Composition API) + Vuex/Pinia OR React with TypeScript + Redux/Context API
- TailwindCSS or Bootstrap for UI
- Local storage for theme preferences

---
## Installation & Setup
### **Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   dotnet restore
   ```
3. Apply database migrations:
   ```sh
   dotnet ef database update
   ```
4. Run the API server:
   ```sh
   dotnet run
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

---
## Running the Project
1. Start the backend (`dotnet run`).
2. Start the frontend (`npm run dev`).
3. Open the app in your browser (e.g., `http://localhost:5173` for Vite-based projects).

---
## Contribution
Feel free to contribute! Fork the repo and create a pull request with your changes.

---
## License
This project is open-source and available under the MIT License.

