# ZapShift Client

ZapShift Client is the frontend for a role-based courier and parcel management platform. It supports customer parcel booking, Stripe payment flow, rider operations, and admin management from a single React application.

## Tech Stack

- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4 + DaisyUI
- TanStack Query + Axios
- Firebase Authentication
- Recharts + React Leaflet
- SweetAlert2 + Swiper

## Core Features

### Customer
- Register/login with email-password and Google
- Create parcel requests with dynamic delivery charge calculation
- Pay for parcels through Stripe Checkout
- Track parcel movement using tracking ID and timeline logs
- View payment history and parcel status from dashboard

### Rider
- Apply as a rider
- View assigned deliveries
- Update delivery progress and complete deliveries

### Admin
- Approve rider applications
- Assign riders to parcels
- Manage user roles
- Monitor delivery statistics and operational data

## Application Flow

1. User creates a parcel request.
2. Parcel is saved with a generated tracking ID.
3. User initiates payment from dashboard.
4. Backend creates Stripe Checkout session.
5. After successful payment, parcel status is updated.
6. Rider/admin workflows continue delivery lifecycle.

## Role-Based Routing

- Public: Home, About, Coverage, Parcel Tracking
- Auth: Login, Register
- Private: Dashboard routes
- Guarded dashboard routes:
  - `AdminRoute`: approve riders, assign riders, manage users
  - `RiderRoute`: assigned/completed deliveries

## Project Structure

```text
src/
├── Components/
├── Context/
├── Hooks/
├── layouts/
├── Pages/
│   ├── Auth/
│   ├── Dashboard/
│   ├── HomePage/
│   ├── Coverage/
│   ├── ParcelTrack/
│   ├── Rider/
│   └── SendParcel/
└── Routes/
```

## Local Setup

### Prerequisites
- Node.js 20+
- npm
- Running ZapShift backend API

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Environment Variables

Create `.env.local` in project root:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_backend_url=
VITE_image_hosting_key=
```

### Notes
- Firebase config is loaded from `import.meta.env` in `src/Pages/Firebase/Firebase.config.js`.
- Social login and registration user sync calls use `VITE_backend_url`.
- Axios hooks currently point to the deployed backend URL in:
  - `src/Hooks/useAxios.jsx`
  - `src/Hooks/useAxiosSecure.jsx`

## Deployment

### Frontend (Vercel)
- SPA deep-link rewrite is configured in `vercel.json`.
- Ensure environment variables are added in Vercel project settings.

### Backend (Render)
- Configure backend CORS to allow frontend domain.
- Set Stripe and domain env values correctly (especially payment success/cancel base domain).

## Common Production Checks

- Payment redirect goes to wrong domain:
  - Check backend `SITE_DOMAIN` value on Render.
- Payment success route returns 404:
  - Confirm Vercel rewrite config is deployed.
- Login works but user insert returns 409:
  - User already exists (expected for duplicate email).

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## License

This project is for educational and portfolio use unless otherwise specified by the repository owner.
