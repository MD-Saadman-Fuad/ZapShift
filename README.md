# ZapShift Client

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)

Frontend application for **ZapShift**, a courier and parcel management platform built for fast booking, secure payments, rider operations, and real-time delivery tracking.

This repository contains the **client-side** application of the project. It provides separate experiences for **customers**, **riders**, and **administrators** through a role-based dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Feature Highlights](#feature-highlights)
- [Role-Based Dashboard](#role-based-dashboard)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Deployment Notes](#deployment-notes)

---

## Overview

ZapShift Client is a modern parcel delivery frontend where users can:

- create and manage parcel orders,
- calculate delivery charges automatically,
- complete payment through a hosted checkout flow,
- track parcel progress using a timeline view,
- apply as a rider,
- and access dashboards based on their assigned role.

The application is designed around a logistics workflow that connects customers, riders, and admins in one platform.

---

## Feature Highlights

### Customer Features

- Email/password authentication with Firebase
- Google sign-in support
- Profile image upload during registration via ImgBB
- Parcel booking form with sender and receiver information
- Automatic delivery cost calculation based on:
  - parcel type,
  - parcel weight,
  - same-district vs inter-district delivery
- Payment initiation from the dashboard
- Parcel list with payment status and tracking ID
- Parcel tracking timeline with delivery logs
- Payment history view

### Rider Features

- Rider application form with region and district selection
- Assigned delivery list
- Delivery status updates during the shipment lifecycle
- Completed delivery list with payout calculation

### Admin Features

- Approve or reject rider applications
- Assign available riders to pending pickups
- Manage user roles
- Search users from the dashboard
- View parcel delivery statistics with chart-based summaries

### Platform Features

- Coverage map for service centers across 64 districts
- Protected routes for authenticated users
- Role-based route guards for admin and rider pages
- Server-state management with TanStack Query
- Responsive UI using Tailwind CSS and DaisyUI

---

## Role-Based Dashboard

| Role  | Access                                                                        |
| ----- | ----------------------------------------------------------------------------- |
| User  | Create parcels, pay for orders, view tracking IDs, check payment history      |
| Rider | View assigned deliveries, update delivery status, review completed deliveries |
| Admin | Approve riders, assign riders, manage users, view delivery analytics          |

---

## Tech Stack

| Category       | Technologies                     |
| -------------- | -------------------------------- |
| Frontend       | React 19, Vite                   |
| Routing        | React Router                     |
| Styling        | Tailwind CSS, DaisyUI            |
| Data Fetching  | TanStack Query, Axios            |
| Forms          | React Hook Form                  |
| Authentication | Firebase Authentication          |
| Maps           | React Leaflet, Leaflet           |
| Charts         | Recharts                         |
| UI Utilities   | SweetAlert2, React Icons, Swiper |

---

## Project Structure

```text
src/
├── Components/         # Shared reusable UI pieces
├── Context/            # Authentication context and provider
├── Hooks/              # Custom hooks for auth, roles, and Axios
├── layouts/            # Root, auth, and dashboard layouts
├── Pages/
│   ├── Auth/           # Login, register, social login
│   ├── Coverage/       # Service center coverage map
│   ├── Dashboard/      # User, rider, and admin dashboard pages
│   ├── HomePage/       # Landing page sections
│   ├── ParcelTrack/    # Tracking timeline view
│   ├── Rider/          # Rider application page
│   └── SendParcel/     # Parcel booking form
└── Routes/             # App router and protected route wrappers
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm
- A running backend API for ZapShift

### Installation

```bash
git clone <your-repository-url>
cd zap-shift-client
npm install
```

### Run the project

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

---

## Environment Variables

Create a `.env.local` file in the project root and add the following values:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_backend_url=http://localhost:3000
VITE_image_hosting_key=your_imgbb_api_key
```

### Important

The shared Axios instances in this project are currently configured to use `http://localhost:3000` directly. For local development, keep your backend running on that port, or update the Axios base URL configuration before deployment.

---

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the project        |

---

## Backend Integration

This client depends on a separate backend service for application data and business logic.

The frontend consumes APIs related to:

- users
- rider applications
- parcels
- delivery status updates
- tracking logs
- payments and checkout session creation
- admin statistics

For the full experience, the backend should support authentication-aware requests and return data for the role-based dashboard flows used by this client.

---

## Deployment Notes

Before deploying, make sure to:

1. set all frontend environment variables in your hosting platform,
2. update the API base URL to your production backend,
3. add your deployed domain to Firebase authorized domains,
4. verify payment success and cancellation callback URLs,
5. confirm that the backend CORS policy allows your frontend domain.

---

## Summary

ZapShift Client is a portfolio-ready logistics frontend focused on real-world courier workflows. It combines authentication, parcel booking, payment handling, tracking, rider management, and admin controls in a single React application.
