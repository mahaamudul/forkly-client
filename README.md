# 🍽️ Forkly - Restaurant Management System (Client)

A modern, full-featured React/Vite-based restaurant management and food ordering application with admin dashboard, user dashboard, payment processing, and real-time order management.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [UI Workflow](#ui-workflow)
- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Configuration](#configuration)

---

## ✨ Features

### 👥 User Features
- **User Authentication**
  - Email/Password Registration & Login
  - Firebase Authentication
  - Social Login Integration
  - Secure Session Management

- **Menu & Browsing**
  - Dynamic Menu with Categorized Items
  - Search & Filter Functionality
  - Food Cards with Ratings & Reviews
  - Detailed Food Item Information
  - Popular Menu Highlights

- **Shopping & Ordering**
  - Shopping Cart Management
  - Add/Remove Items from Cart
  - Quantity Adjustment
  - Real-time Cart Updates
  - Persistent Cart Storage

- **Payment & Checkout**
  - Stripe Payment Integration
  - Secure Checkout Process
  - Payment History Tracking
  - Multiple Payment Methods
  - Order Confirmation

- **Reservations & Bookings**
  - Table Reservation System
  - Booking Management
  - View Booking History
  - Modify Bookings
  - Cancel Reservations

- **User Dashboard**
  - Personal Profile Management
  - View Order History
  - Payment History
  - My Reservations
  - Review Management

- **Reviews & Ratings**
  - Add Food Reviews & Ratings
  - Star Rating System
  - View Community Reviews
  - Review Management

### 🛠️ Admin Features
- **Admin Dashboard**
  - Analytics & Metrics
  - Order Overview
  - Revenue Tracking
  - User Statistics

- **Menu Management**
  - Add New Menu Items
  - Update Menu Items
  - Delete Menu Items
  - Bulk Item Management
  - Image Upload

- **Order Management**
  - View All Orders
  - Order Status Updates
  - Order Fulfillment
  - Order History

- **User Management**
  - View All Users
  - User Role Assignment
  - User Status Management
  - Admin Promotion

- **Booking Management**
  - View All Bookings
  - Manage Reservations
  - Update Booking Status
  - Cancel Bookings

- **Review Management**
  - View All Reviews
  - Approve/Reject Reviews
  - Delete Inappropriate Reviews
  - Review Analytics

- **Payment Tracking**
  - View Payment History
  - Payment Status
  - Revenue Reports
  - Transaction Details

- **Restaurant Settings**
  - Configure Restaurant Info
  - Operating Hours
  - Menu Categories
  - Dining Capacity

---

## 🏗️ Tech Stack

### Frontend Framework & Build
- **React 18.2.0** - UI Library
- **Vite 5.2.0** - Build Tool & Dev Server
- **React Router DOM 6.23.1** - Client-side Routing

### State Management & Data Fetching
- **TanStack React Query 5.37.1** - Server State Management
- **Axios 1.7.2** - HTTP Client
- **React Hook Form 7.51.5** - Form State Management

### Authentication & Backend
- **Firebase 10.12.1** - Authentication & Backend Services
- **React Helmet Async 2.0.5** - SEO & Document Head

### Payment Processing
- **Stripe React 2.7.1** - Payment Integration
- **Stripe JS 3.5.0** - Stripe Library

### UI & Styling
- **Tailwind CSS 3.4.3** - Utility-first CSS Framework
- **DaisyUI 4.11.1** - Tailwind Component Library
- **React Icons 5.2.1** - Icon Library

### UI Components & Effects
- **React Responsive Carousel 3.2.23** - Carousel Component
- **Swiper 11.1.3** - Touch Slider
- **React Parallax 3.5.1** - Parallax Effects
- **React Tabs 6.0.2** - Tab Navigation
- **React Rating 1.5.0** - Star Rating

### Utilities & Validation
- **React Simple Captcha 9.3.1** - CAPTCHA Validation
- **SweetAlert2 11.11.0** - Beautiful Alerts & Modals
- **LocalForage 1.10.0** - Local Storage Solution
- **Match Sorter 6.3.4** - Fuzzy Search
- **Sort By 1.2.0** - Array Sorting

---

## 🔄 UI Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        FORKLY APPLICATION                       │
└─────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │ Landing Page │
                              └──────┬───────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
             ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼────────┐
             │ Browse Menu  │  │  Contact    │  │ About Forkly │
             └──────┬──────┘  └─────────────┘  └──────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
   ┌────▼────────┐        ┌─────▼──────┐
   │ User Logged │        │  Not Logged │
   │     In      │        │    In       │
   └────┬────────┘        └─────┬───────┘
        │                       │
        │                  ┌────▼─────────┐
        │                  │ Login/Register│
        │                  │   Options     │
        │                  ├───────────────┤
        │                  │ • Email Login │
        │                  │ • Social Auth │
        │                  │ • Register    │
        │                  └────┬──────────┘
        │                       │
        └───────────────────────┘
                    │
        ┌───────────▼──────────────┐
        │  Browse & Order Menu     │
        ├──────────────────────────┤
        │ • View Categories        │
        │ • Search/Filter Items    │
        │ • View Reviews & Ratings │
        │ • Add to Cart            │
        └───────────────┬──────────┘
                        │
        ┌───────────────▼──────────────┐
        │  Shopping Cart & Checkout    │
        ├──────────────────────────────┤
        │ • Review Cart Items          │
        │ • Adjust Quantities          │
        │ • Apply Discounts            │
        │ • Proceed to Checkout        │
        └───────────────┬──────────────┘
                        │
        ┌───────────────▼──────────────┐
        │  Payment Processing (Stripe) │
        ├──────────────────────────────┤
        │ • Enter Payment Details      │
        │ • Process Payment            │
        │ • Order Confirmation         │
        └───────────────┬──────────────┘
                        │
        ┌───────────────▼──────────────────┐
        │  User Dashboard Access           │
        ├──────────────────────────────────┤
        │ • Order History & Status         │
        │ • Payment History                │
        │ • Reservations/Bookings          │
        │ • Add Reviews & Ratings          │
        │ • Profile Management             │
        └──────────────────────────────────┘

                    ┌──────────────────────┐
                    │  Admin Access Only   │
                    ├──────────────────────┤
                    │ • Admin Dashboard    │
                    │ • Menu Management    │
                    │ • Order Management   │
                    │ • User Management    │
                    │ • Booking Management │
                    │ • Review Moderation  │
                    │ • Payment Tracking   │
                    │ • Settings           │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```
client/
├── src/
│   ├── main.jsx                    # Entry Point
│   ├── index.css                   # Global Styles
│   ├── components/                 # Reusable Components
│   │   ├── Admin/                  # Admin Components
│   │   ├── FoodCard/               # Food Item Cards
│   │   ├── Loading/                # Loading States
│   │   ├── SectionTitle/           # Section Headers
│   │   └── SocialLogin/            # Social Auth
│   ├── pages/                      # Page Components
│   │   ├── Home/                   # Landing Page
│   │   ├── Menu/                   # Menu Browse
│   │   ├── Order/                  # Ordering
│   │   ├── Login/Register/         # Authentication
│   │   ├── Dashboard/              # User & Admin Dashboards
│   │   │   ├── Additems/           # Add Menu Items
│   │   │   ├── ManageItems/        # Manage Menu
│   │   │   ├── Cart/               # Shopping Cart
│   │   │   ├── Payment/            # Checkout
│   │   │   ├── Reservation/        # Bookings
│   │   │   └── AdminHome/          # Admin Dashboard
│   │   └── Contact/                # Contact Page
│   ├── Layouts/
│   │   ├── Main.jsx                # Main Layout
│   │   └── DashBoard.jsx           # Dashboard Layout
│   ├── Routers/
│   │   ├── Routes.jsx              # Route Configuration
│   │   ├── PrivateRoute.jsx        # Protected Routes
│   │   └── AdminRoute.jsx          # Admin Only Routes
│   ├── hooks/                      # Custom Hooks
│   │   ├── useAdmin.jsx            # Admin Check
│   │   ├── useCart.jsx             # Cart Management
│   │   ├── useMenu.jsx             # Menu Data
│   │   └── useAxios*.jsx           # API Calls
│   ├── provider/                   # Context Providers
│   │   └── AuthProvider.jsx        # Auth Context
│   ├── firebase/                   # Firebase Config
│   ├── config/                     # Configuration
│   ├── utils/                      # Utility Functions
│   └── assets/                     # Images & Static Files
├── public/                         # Public Assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm
- Firebase Account
- Stripe Account (for payments)

### Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 📜 Scripts

```bash
# Development Server
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview

# Lint Code
npm run lint
```

---

## ⚙️ Configuration

### API Configuration
The client expects the API at `VITE_API_BASE_URL` environment variable, falling back to `http://localhost:5000` for local development.

See [config/api.js](config/api.js) for API configuration details.

### Firebase Setup
Configure Firebase credentials in [firebase/firebase.config.js](firebase/firebase.config.js) using environment variables.

### Stripe Integration
Stripe public key is configured for payment processing. Ensure proper CORS configuration on backend.

---

## 🔐 Security Features

- ✅ Firebase Authentication with Email & Social Login
- ✅ Private Routes for Authenticated Users
- ✅ Admin Routes with Role-based Access Control
- ✅ Secure Payment Processing with Stripe
- ✅ CAPTCHA Verification for Forms
- ✅ Environment Variable Configuration
- ✅ XSS Protection with React

---

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS and DaisyUI components:
- 📱 Mobile-first approach
- 💻 Desktop optimized
- 🖥️ Tablet support
- 🎨 Consistent UI across devices

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License.
