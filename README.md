# Wa-Morgan 

**Wa-Morgan** is a modern e-commerce web application built with React and Vite. It delivers a seamless shopping experience — browsing products, searching for items, viewing detailed product information, registering and logging in, and managing a shopping cart — all through an intuitive, responsive interface.

The project showcases React component architecture, React Router for client-side navigation, Context API for state management, REST API integration, and modern UI development with Tailwind CSS and shadcn/ui.


## Project Overview

The primary objective of Wa-Morgan is to simulate the functionality of a modern online clothing store while following React development best practices. The application emphasizes reusable components, responsive layouts, and a clean user experience.

---

## Features

| Category | Feature |
|---|---|
| **Shopping** | Responsive homepage, product listing, live product search, individual product details page |
| **Cart** | Shopping cart functionality with global state via Context API |
| **Auth** | User registration and login |
| **Navigation** | Dynamic routing with React Router, responsive navbar and footer |
| **UI** | Modern, responsive interface built with Tailwind CSS and shadcn/ui |

---


## Project Structure

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── ProtectedRoute.jsx
│   ├── SearchBart.jsx
│   └── Cart.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Checkout.jsx
│   ├── Succes.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ProductDetails.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/Cymi-eng/Wa-Morgan.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Wa-Morgan
   ```

3. Install all required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Data Source

Product information is retrieved from the [Fake Store API](https://fakestoreapi.com/).

---

## Application Workflow

1. Users visit the homepage.
2. Browse available clothing products.
3. Search for products by name.
4. View detailed product information.
5. Add products to the shopping cart.
6. Register or log into an account.
7. Proceed to checkout *(future implementation)*.

---

## Current Status

The following modules have been completed:

- ✅ Homepage
- ✅ Navigation
- ✅ Product listing
- ✅ Product search
- ✅ Product details
- ✅ Shopping cart
- ✅ User authentication interface
- ✅ Footer
- ✅ Responsive layout

---


## Learning Objectives

This project demonstrates practical knowledge of:

- React component architecture
- State management using Context API
- Client-side routing
- REST API integration
- Responsive web design
- Reusable UI components
- Modern frontend development practices

---

## Author

**Ian Cymi**
GitHub: [@Cymi-eng](https://github.com/Cymi-eng)

---

## License

This project is under the MIT License