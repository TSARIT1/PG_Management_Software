import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi'
import DataTable from '../../components/common/DataTable'
import StaffForm from './StaffForm'

const dummyStaff = [
  {
    UserID: 'U001',
    Username: 'admin',
    Email: 'admin@hostel.com',
    Role: 'Admin',
    'Created Date': '2023-01-15',
  },
]

export default function StaffListPage() {
  const [staff, setStaff] = useState(dummyStaff)
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [selectedStaff, setSelectedStaff] = useState([])

  const handleAddStaff = (staffData) => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s.UserID === editingStaff.UserID ? { ...staffData, UserID: editingStaff.UserID } : s)))
      setEditingStaff(null)
    } else {
      const newStaff = {
        ...staffData,
        UserID: `U${String(staff.length + 1).padStart(3, '0')}`,
        'Created Date': new Date().toISOString().split('T')[0],
      }
      setStaff([...staff, newStaff])
    }
    setShowForm(false)
  }

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember)
    setShowForm(true)
  }

  const handleDelete = (staffMember) => {
    if (window.confirm(`Delete staff member ${staffMember.Username}?`)) {
      setStaff(staff.filter((s) => s.UserID !== staffMember.UserID))
    }
  }

  const handleResetPassword = () => {
    if (selectedStaff.length === 0) {
      alert('Please select staff member(s) to reset password')
      return
    }
    if (window.confirm(`Reset password for ${selectedStaff.length} staff member(s)?`)) {
      alert('Password reset emails sent successfully!')
    }
  }

  const handleDeleteSelected = () => {
    if (selectedStaff.length === 0) {
      alert('Please select staff member(s) to delete')
      return
    }
    if (window.confirm(`Delete ${selectedStaff.length} selected staff member(s)?`)) {
      const idsToDelete = selectedStaff.map((s) => s.UserID)
      setStaff(staff.filter((s) => !idsToDelete.includes(s.UserID)))
      setSelectedStaff([])
    }
  }

  const columns = ['UserID', 'Username', 'Email', 'Role', 'Created Date']

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Enhanced Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 className="page-title" style={{ color: 'white' }}>Staff Management</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Manage hostel staff and administrators</p>
        </div>
        <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>
          <FiUsers />
        </div>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <motion.div 
          className="modal-overlay" 
          onClick={() => setShowForm(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal-header"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem 1rem 0 0',
              }}
            >
              <h2 className="modal-title" style={{ color: 'white' }}>
                {editingStaff ? '✏️ Edit Staff' : '➕ Add New Staff'}
              </h2>
              <motion.button 
                className="modal-close-btn" 
                onClick={() => setShowForm(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  width: '2rem',
                  height: '2rem',
                }}
              >
                ✕
              </motion.button>
            </motion.div>
            <div className="modal-body">
              <StaffForm
                staff={editingStaff}
                onSubmit={(data) => {
                  handleAddStaff(data)
                  setShowForm(false)
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Toolbar */}
      <motion.div 
        className="toolbar"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ 
          justifyContent: 'flex-end',
          marginBottom: '2rem',
        }}
      >
        <motion.button
          className="btn btn-primary"
          onClick={() => {
            setEditingStaff(null)
            setShowForm(true)
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            padding: '0.75rem 1.5rem',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem',
          }}
        >
          <FiPlus /> Add Staff
        </motion.button>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={staff}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectChange={setSelectedStaff}
        />
      </motion.div>

      {/* Action Bar */}
      <motion.div
        className="action-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <motion.button 
          className="btn btn-warning btn-sm" 
          onClick={handleResetPassword}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '0.625rem 1.25rem',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <FiEdit2 /> Reset Password
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
