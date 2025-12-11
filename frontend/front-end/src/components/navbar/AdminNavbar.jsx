import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'

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
        Hostel Management System
      </motion.div>

      <div className="navbar-right">
        <motion.div 
          className="navbar-user"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="navbar-user-icon"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: 'white',
              fontWeight: '600',
            }}
          >
            <FiUser />
          </div>
          <span style={{ fontWeight: '500' }}>admin (Admin)</span>
        </motion.div>

        <motion.button 
          className="navbar-logout-btn" 
          onClick={handleLogout}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          <FiLogOut style={{ fontSize: '16px' }} />
          Logout
        </motion.button>
      </div>
    </motion.nav>
  )
}
