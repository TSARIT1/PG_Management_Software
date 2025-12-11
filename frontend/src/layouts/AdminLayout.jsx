import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/navbar/AdminNavbar'
import AdminSidebar from '../components/sidebar/AdminSidebar'
import '../styles/layout.css'

export default function AdminLayout() {
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content-wrapper">
        <AdminNavbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
