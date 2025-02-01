# Qikserve Restaurant Menu Challenge

> This project was developed as part of the **Front End Developer** interview process at Qikserve.  
> It implements a restaurant details page and a menu where customers can browse items and add them to a basket.

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [State Management (Redux)](#state-management-redux)
- [Possible Improvements](#possible-improvements)
- [Decisions & Assumptions](#decisions--assumptions)
- [Contact](#contact)

---

## Overview

The objective of this challenge is to:

1. **Display Restaurant Info**: Show details like name, description, and possibly location.
2. **List Menu Items**: Organized by category, with name, price, description, etc.
3. **Add to Basket**: Let users select items and update the basket in real time.
4. **View/Update Basket**: Show the total price and quantity of items added.

This project demonstrates best practices in **React**, **TypeScript**, **ES6+**, **Hooks**, and **Redux**. We focused on clean code, componentization, responsive layout, and a user-friendly experience.

---

## Live Demo

<!-- - **URL**: [https://my-url.com](https://my-url.com)   --> pendente

---

## Features

- **Restaurant Page**: Basic info about the restaurant.
- **Menu Listing**: Displays menu items, possibly grouped by category.
- **Basket Management**: Add, remove, and update item quantities in the basket.
- **Responsive Layout**: Works well on mobile, tablet, and desktop.
- **Redux Integration**: Basket data and state management handled by Redux or Redux Toolkit.

---

## Tech Stack

- **Next.js**: A React framework for SSR (Server-Side Rendering) and SSG (Static Site Generation). It handles routing and optimizations out of the box.
- **React** + **TypeScript** + **ES6+**
- **Redux** (or Redux Toolkit) for global state management
- **React Hooks** for local state and side effects
- **CSS Modules** / **SCSS** / **Styled-Components** (choose one) for styling

---

## Getting Started

### Prerequisites

- **Node.js** (>= 16.x recommended)
- **npm** or **yarn** installed

### Installation and Running

1. **Clone the repository**:

   ```bash
   - git clone https://github.com/your-username/qikserve-restaurant-challenge.git
   - cd qikserve-restaurant-challenge

   ```

2. **Install dependencies**:

   - npm install

   # or

   - yarn

3. Start the development server:
   - npm run dev
   # or
   - yarn dev

\*The application runs at http://localhost:3000.

### Build and Production

    - npm run build
    - npm run start

---

## Project Structure

.
├── app/
│ ├── layout.tsx # Global layout
│ ├── page.tsx # Restaurant info
│ ├── menu/
│ │ └── page.tsx # Menu listing
│ └── basket/
│ └── page.tsx # Basket page
├── components/
│ ├── MenuItem/
│ │ ├── MenuItem.tsx
│ │ └── MenuItem.module.css
│ ├── Basket/
│ └── ...
├── hooks/
│ └── useFetchMenu.ts # Example custom hook
├── store/
│ ├── index.ts # Redux store configuration
│ └── slices/
│ └── basketSlice.ts # Basket slice
├── styles/
│ └── globals.css
├── public/
│ └── ...
└── ...

- **app/**: Contains the route-based files.
- **components/**: Reusable UI components.
- **hooks/**: pendente.
- **store/**: Redux store & slices.
- **styles/**: Global or shared styling (CSS/SCSS files).
- **public/**: Static files (images, etc.).

---

## State Management (Redux)

- **Actions**: Dispatched when user interacts (e.g., add item to basket).
- **Reducers**: Update the global state based on actions (e.g., increment item count).
- **Selectors**: (Optional) Helper functions to retrieve data from the store.
- **Slices**: (If using Redux Toolkit) Each slice includes actions and reducers together.

---

## Decisions & Assumptions

- **Redux Toolkit**: Simplifies boilerplate for actions/reducers.
- **Componentization**: Each UI piece is a separate component (e.g., MenuItem, BasketItem).
- **Responsiveness**: Mobile-first approach for better user experience on smaller screens.
- **Assumption**: Fake or hard-coded data for the menu if no real API is provided.

---

## Contact

- **Author**: Diego Fedrizzi Petry Becker
- **Email**: diegofpetry@gmail.com
- **LinkedIn**: linkedin.com/in/diego-fedrizzi-petry-becker-21668720b

---

Thank you for checking out this challenge! Please feel free to reach out if you have any questions or feedback.
