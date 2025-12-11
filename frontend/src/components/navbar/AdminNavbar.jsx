import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminProfileDropdown from './AdminProfileDropdown'

export default function AdminNavbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(90deg, #1f2937 0%, #111827 100%)',
        position: 'sticky',
        top: 0,
        zIndex: 1010,
      }}
    >
      <motion.div 
        className="navbar-brand"
        whileHover={{ scale: 1.05 }}
        style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        PG/Hostel Management System
      </motion.div>

      <div className="navbar-right">
        <AdminProfileDropdown onLogout={handleLogout} />
      </div>
    </motion.nav>
  )
}
