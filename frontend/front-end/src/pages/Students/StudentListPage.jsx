import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiRefreshCw, FiPlus, FiEdit2, FiTrash2, FiEye, FiUsers } from 'react-icons/fi'
import DataTable from '../../components/common/DataTable'
import StudentForm from './StudentForm'

const dummyStudents = [
  {
    ID: 'S001',
    Name: 'Rajesh Kumar',
    Age: 20,
    Gender: 'Male',
    Room: 'R101',
    Admission: '2023-06-15',
    Contact: '9876543210',
    Email: 'rajesh@example.com',
  },
  {
    ID: 'S002',
    Name: 'Priya Singh',
    Age: 19,
    Gender: 'Female',
    Room: 'R102',
    Admission: '2023-07-20',
    Contact: '9876543211',
    Email: 'priya@example.com',
  }
  
]

export default function StudentListPage() {
  const [students, setStudents] = useState(dummyStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleAddStudent = (studentData) => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.ID === editingStudent.ID ? { ...studentData, ID: editingStudent.ID } : s)))
      setEditingStudent(null)
    } else {
      const newStudent = {
        ...studentData,
        ID: `S${String(students.length + 1).padStart(3, '0')}`,
      }
      setStudents([...students, newStudent])
    }
    setShowForm(false)
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDelete = (student) => {
    if (window.confirm(`Delete student ${student.Name}?`)) {
      setStudents(students.filter((s) => s.ID !== student.ID))
    }
  }

  const handleRefresh = () => {
    setSearchTerm('')
  }

  const handleEditSelected = () => {
    if (selectedStudents.length === 1) {
      setEditingStudent(selectedStudents[0])
      setShowForm(true)
    } else if (selectedStudents.length === 0) {
      alert('Please select a student to edit')
    } else {
      alert('Please select only one student to edit')
    }
  }

  const handleDeleteSelected = () => {
    if (selectedStudents.length === 0) {
      alert('Please select students to delete')
      return
    }
    if (window.confirm(`Delete ${selectedStudents.length} selected student(s)?`)) {
      const idsToDelete = selectedStudents.map((s) => s.ID)
      setStudents(students.filter((s) => !idsToDelete.includes(s.ID)))
      setSelectedStudents([])
    }
  }

  const columns = ['ID', 'Name', 'Age', 'Gender', 'Room', 'Admission', 'Contact', 'Email']

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
          <h1 className="page-title" style={{ color: 'white' }}>Student Management</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Manage all student records and information</p>
        </div>
        <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>
          <FiUsers />
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div 
        className="toolbar"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div className="toolbar-left" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div
            style={{ position: 'relative', flex: 1, minWidth: '200px' }}
            whileFocus={{ scale: 1.02 }}
          >
            <motion.input
              type="text"
              className="search-input"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                paddingLeft: '2.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
            <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }} />
          </motion.div>

          <motion.button 
            className="btn btn-primary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.625rem 1rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
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
            <FiSearch /> Search
          </motion.button>

          <motion.button 
            className="btn btn-secondary btn-sm"
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.625rem 1rem',
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
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
            <FiRefreshCw /> Refresh
          </motion.button>
        </div>

        <div className="toolbar-right">
          <motion.button
            className="btn btn-primary"
            onClick={() => {
              setEditingStudent(null)
              setShowForm(true)
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
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
            <FiPlus /> Add Student
          </motion.button>
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
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            <motion.div
              className="modal-header"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem 1rem 0 0',
              }}
            >
              <h2 className="modal-title" style={{ color: 'white' }}>
                {editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}
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
              <StudentForm
                student={editingStudent}
                onSubmit={(data) => {
                  handleAddStudent(data)
                  setShowForm(false)
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectChange={setSelectedStudents}
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
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <motion.button 
          className="btn btn-danger" 
          onClick={handleDeleteSelected}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
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
          <FiTrash2 /> Delete Selected ({selectedStudents.length})
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
