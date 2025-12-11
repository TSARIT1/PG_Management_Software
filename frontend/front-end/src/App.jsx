import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'

import LandingPage from './pages/Landing/LandingPage'

import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'

import DashboardPage from './pages/Dashboard/DashboardPage'

import StudentListPage from './pages/Students/StudentListPage'

import RoomListPage from './pages/Rooms/RoomListPage'

import PaymentListPage from './pages/Payments/PaymentListPage'

import StaffListPage from './pages/Staff/StaffListPage'

import AttendancePage from './pages/Attendance/AttendancePage'

import ReportsPage from './pages/Reports/ReportsPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - First Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentListPage />} />
          <Route path="rooms" element={<RoomListPage />} />
          <Route path="payments" element={<PaymentListPage />} />
          <Route path="staff" element={<StaffListPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
