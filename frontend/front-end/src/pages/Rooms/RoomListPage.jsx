import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiPlus, FiEdit2, FiTrash2, FiGrid } from 'react-icons/fi'
import DataTable from '../../components/common/DataTable'
import RoomForm from './RoomForm'

const dummyRooms = [
  {
    'Room No': 'R101',
    Type: 'Double',
    Capacity: '2',
    Occupied: '2',
    Available: '0',
    Rent: '5000',
    Status: 'Full',
  },
  {
    'Room No': 'R102',
    Type: 'Single',
    Capacity: '1',
    Occupied: '1',
    Available: '0',
    Rent: '3500',
    Status: 'Full',
  }
]

export default function RoomListPage() {
  const [rooms, setRooms] = useState(dummyRooms)
  const [filterType, setFilterType] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [selectedRooms, setSelectedRooms] = useState([])

  const filteredRooms = rooms.filter(
    (room) => filterType === 'All' || room.Type === filterType
  )

  const handleAddRoom = (roomData) => {
    if (editingRoom) {
      setRooms(rooms.map((r) => (r['Room No'] === editingRoom['Room No'] ? roomData : r)))
      setEditingRoom(null)
    } else {
      setRooms([...rooms, roomData])
    }
    setShowForm(false)
  }

  const handleEdit = (room) => {
    setEditingRoom(room)
    setShowForm(true)
  }

  const handleDelete = (room) => {
    if (window.confirm(`Delete room ${room['Room No']}?`)) {
      setRooms(rooms.filter((r) => r['Room No'] !== room['Room No']))
    }
  }

  const handleEditSelected = () => {
    if (selectedRooms.length === 1) {
      setEditingRoom(selectedRooms[0])
      setShowForm(true)
    } else if (selectedRooms.length === 0) {
      alert('Please select a room to edit')
    } else {
      alert('Please select only one room to edit')
    }
  }

  const handleDeleteSelected = () => {
    if (selectedRooms.length === 0) {
      alert('Please select rooms to delete')
      return
    }
    if (window.confirm(`Delete ${selectedRooms.length} selected room(s)?`)) {
      const roomsToDelete = selectedRooms.map((r) => r['Room No'])
      setRooms(rooms.filter((r) => !roomsToDelete.includes(r['Room No'])))
      setSelectedRooms([])
    }
  }

  const columns = ['Room No', 'Type', 'Capacity', 'Occupied', 'Available', 'Rent', 'Status']

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
          <h1 className="page-title" style={{ color: 'white' }}>Room Management</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Manage all hostel rooms and occupancy</p>
        </div>
        <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>
          <FiGrid />
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
        }}
      >
        <div className="toolbar-left" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <motion.select
            className="select-input"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            style={{
              padding: '0.625rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
              background: 'white',
              cursor: 'pointer',
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
          >
            <option value="All">All Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </motion.select>

          <motion.button 
            className="btn btn-secondary btn-sm"
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
              setEditingRoom(null)
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
            <FiPlus /> Add Room
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
          >
            <motion.div
              className="modal-header"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem 1rem 0 0',
              }}
            >
              <h2 className="modal-title" style={{ color: 'white' }}>
                {editingRoom ? '✏️ Edit Room' : '➕ Add New Room'}
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
              <RoomForm
                room={editingRoom}
                onSubmit={(data) => {
                  handleAddRoom(data)
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
          data={filteredRooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectChange={setSelectedRooms}
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
          <FiTrash2 /> Delete Selected ({selectedRooms.length})
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
