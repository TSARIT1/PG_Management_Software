import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowLeft, FiUsers, FiDollarSign } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getAllStudents } from '../../services/studentService'
import { getAllRooms } from '../../services/roomService'
import paymentService from '../../services/paymentService'

export default function RoomReportPage() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [roomsResp, studentsResp, paymentsResp] = await Promise.all([
        getAllRooms(),
        getAllStudents(),
        paymentService.getAllPayments()
      ])

      setRooms(roomsResp.data || roomsResp || [])
      setStudents(studentsResp.data || studentsResp || [])
      setPayments(paymentsResp.data || paymentsResp || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRoomReport = (room) => {
    // Get students in this room
    const roomStudents = students.filter(s => s.roomNumber === room.roomNumber)
    
    // Calculate revenue from this room
    const roomRevenue = payments.reduce((sum, payment) => {
      const student = roomStudents.find(s => s.name === payment.student || s.name === payment.studentName)
      if (student) {
        return sum + Number(payment.amount || 0)
      }
      return sum
    }, 0)

    // Calculate occupancy percentage
    const occupancyPercentage = room.capacity > 0 
      ? ((room.occupiedBeds / room.capacity) * 100).toFixed(0)
      : 0

    // Determine status
    let status = 'Available'
    if (room.occupiedBeds >= room.capacity) {
      status = 'Full'
    } else if (room.occupiedBeds > 0) {
      status = 'Partially Occupied'
    }

    return {
      ...room,
      studentCount: roomStudents.length,
      students: roomStudents,
      revenue: roomRevenue,
      occupancyPercentage,
      status,
      availableBeds: room.capacity - room.occupiedBeds
    }
  }

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      const roomData = getRoomReport(room)
      const matchesStatus = filterStatus === 'All' || roomData.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .map(getRoomReport)

  const totalRevenue = filteredRooms.reduce((sum, r) => sum + r.revenue, 0)
  const totalOccupied = filteredRooms.reduce((sum, r) => sum + r.occupiedBeds, 0)
  const totalCapacity = filteredRooms.reduce((sum, r) => sum + r.capacity, 0)

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <motion.button
            onClick={() => navigate('/reports')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiArrowLeft size={20} />
          </motion.button>
          <h1 className="page-title" style={{ color: 'white', margin: 0 }}>Room Report</h1>
        </div>
        <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Room occupancy and revenue analytics
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
          <input
            type="text"
            placeholder="Search by room number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            minWidth: '180px',
          }}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Partially Occupied">Partially Occupied</option>
          <option value="Full">Full</option>
        </select>
      </motion.div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{filteredRooms.length}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Rooms</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            {totalOccupied}/{totalCapacity}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Occupied/Capacity</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Revenue</div>
        </motion.div>
      </div>

      {/* Rooms Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading...</div>
        ) : filteredRooms.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', gridColumn: '1 / -1' }}>
            No rooms found
          </div>
        ) : (
          filteredRooms.map((room, index) => (
            <motion.div
              key={room.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedRoom(room)}
              style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Room Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                    {room.roomNumber}
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    {room.type} Room
                  </div>
                </div>
                <div style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: room.status === 'Full' ? '#fef2f2' : room.status === 'Available' ? '#f0fdf4' : '#fef3c7',
                  color: room.status === 'Full' ? '#dc2626' : room.status === 'Available' ? '#059669' : '#d97706'
                }}>
                  {room.status}
                </div>
              </div>

              {/* Occupancy Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Occupancy</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                    {room.occupancyPercentage}%
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#e5e7eb', 
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${room.occupancyPercentage}%`,
                    height: '100%',
                    background: room.occupancyPercentage >= 100 ? '#ef4444' : room.occupancyPercentage >= 50 ? '#f59e0b' : '#10b981',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Capacity</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>{room.capacity}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Occupied</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3b82f6' }}>{room.occupiedBeds}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Rent</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>₹{room.rent.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Revenue</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b' }}>₹{room.revenue.toLocaleString()}</div>
                </div>
              </div>

              {/* Students */}
              <div style={{ 
                padding: '0.75rem', 
                background: '#f9fafb', 
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiUsers style={{ color: '#6b7280' }} />
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  {room.studentCount} {room.studentCount === 1 ? 'Student' : 'Students'}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <motion.div
          className="modal-overlay"
          onClick={() => setSelectedRoom(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '1rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1.5rem',
              borderRadius: '1rem 1rem 0 0',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ margin: 0 }}>Room {selectedRoom.roomNumber}</h2>
              <button
                onClick={() => setSelectedRoom(null)}
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
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              {/* Room Info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Room Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Type</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedRoom.type}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Status</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedRoom.status}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Capacity</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedRoom.capacity} beds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Occupied</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedRoom.occupiedBeds} beds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Monthly Rent</div>
                    <div style={{ fontWeight: '600', color: '#10b981' }}>₹{selectedRoom.rent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Revenue</div>
                    <div style={{ fontWeight: '600', color: '#f59e0b' }}>₹{selectedRoom.revenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Students in Room */}
              <div>
                <h3 style={{ marginBottom: '1rem', color: '#111827' }}>
                  Students ({selectedRoom.students.length})
                </h3>
                {selectedRoom.students.length === 0 ? (
                  <div style={{ 
                    padding: '2rem', 
                    textAlign: 'center', 
                    color: '#6b7280',
                    background: '#f9fafb',
                    borderRadius: '0.5rem'
                  }}>
                    No students assigned
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedRoom.students.map((student, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '1rem',
                          background: '#f9fafb',
                          borderRadius: '0.5rem',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {student.email}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {student.phone}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
