# Hostel Management System Frontend

A modern, responsive React admin panel for managing hostel operations built with Vite, React Router v6, Framer Motion, and plain CSS.

## Features

- **Dashboard Overview**: Real-time statistics and key metrics
- **Student Management**: Full CRUD operations for student records
- **Room Management**: Track room occupancy and maintenance
- **Payment Tracking**: Monitor student payments and dues
- **Staff Management**: Manage hostel staff and roles
- **Attendance**: Track daily student attendance
- **Reports & Analytics**: Generate various hostel reports
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Framer Motion for page transitions and interactions

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Styling**: Plain CSS with custom utilities

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── styles/
│   ├── index.css
│   ├── layout.css
│   ├── components.css
│   └── animations.css
├── layouts/
│   └── AdminLayout.jsx
├── components/
│   ├── navbar/
│   │   └── AdminNavbar.jsx
│   ├── sidebar/
│   │   └── AdminSidebar.jsx
│   └── common/
│       ├── StatCard.jsx
│       └── DataTable.jsx
└── pages/
    ├── Auth/
    │   ├── LoginPage.jsx
    │   └── RegisterPage.jsx
    ├── Dashboard/
    │   └── DashboardPage.jsx
    ├── Students/
    │   ├── StudentListPage.jsx
    │   └── StudentForm.jsx
    ├── Rooms/
    │   ├── RoomListPage.jsx
    │   └── RoomForm.jsx
    ├── Payments/
    │   ├── PaymentListPage.jsx
    │   └── PaymentForm.jsx
    ├── Staff/
    │   ├── StaffListPage.jsx
    │   └── StaffForm.jsx
    ├── Attendance/
    │   └── AttendancePage.jsx
    └── Reports/
        └── ReportsPage.jsx
```

## Installation

```bash
cd frontend
npm install
```

## Running the Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The optimized build will be output to the `dist` folder.

## Routing

- `/` → Redirects to `/login`
- `/register` → User registration page
- `/login` → User login page
- `/dashboard` → Main dashboard with stats
- `/students` → Student management
- `/rooms` → Room management
- `/payments` → Payment tracking
- `/staff` → Staff management
- `/attendance` → Attendance records
- `/reports` → Reports & analytics

## Authentication Flow

The app uses local state for authentication (no real backend). Login/Register pages allow navigation to the dashboard. Logout clears the user session and redirects to login.

## Styling

All components use plain CSS with a consistent color scheme:
- **Sidebar**: Dark charcoal (#1f2937)
- **Navbar**: Slightly lighter dark (#374151)
- **Primary Colors**: Blue, Green, Orange, Red, Teal
- **Text**: Light gray for contrast

## Animations

Smooth page transitions and hover effects powered by Framer Motion:
- Fade-in on page load
- Slide-up animations
- Card hover scale effects
- Button interactions

## Notes

- All data is stored in component state using dummy data
- No backend API calls are made in the current version
- Forms update local state but do not persist data
- Fully responsive CSS grid and flexbox layout

## License

MIT
