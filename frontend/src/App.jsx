import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'
import { ProtectedRoute } from './components/ProtectedRoute'

import LandingPage from './pages/Landing/LandingPage'

import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'

import DashboardPage from './pages/Dashboard/DashboardPage'

import StudentListPage from './pages/Students/StudentListPage'

import RoomListPage from './pages/Rooms/RoomListPage'

import PaymentListPage from './pages/Payments/PaymentListPage'

import StaffListPage from './pages/Staff/StaffListPage'

import AttendancePage from './pages/Attendance/AttendancePage'

import AppointmentsPage from './pages/Appointments/AppointmentsPage'

import ReportsPage from './pages/Reports/ReportsPage'
import StudentReportPage from './pages/Reports/StudentReportPage'
import RoomReportPage from './pages/Reports/RoomReportPage'
import PaymentReportPage from './pages/Reports/PaymentReportPage'
import DueSummaryReportPage from './pages/Reports/DueSummaryReportPage'
import AttendanceReportPage from './pages/Reports/AttendanceReportPage'
import RoomOccupancyReportPage from './pages/Reports/RoomOccupancyReportPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - First Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes - Protected */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentListPage />} />
          <Route path="rooms" element={<RoomListPage />} />
          <Route path="payments" element={<PaymentListPage />} />
          <Route path="staff" element={<StaffListPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/students" element={<StudentReportPage />} />
          <Route path="reports/rooms" element={<RoomReportPage />} />
          <Route path="reports/payments" element={<PaymentReportPage />} />
          <Route path="reports/dues" element={<DueSummaryReportPage />} />
          <Route path="reports/attendance" element={<AttendanceReportPage />} />
          <Route path="reports/occupancy" element={<RoomOccupancyReportPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App