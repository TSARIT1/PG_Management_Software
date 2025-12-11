import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getAllStudents } from '../../services/studentService'
import { getAllRooms } from '../../services/roomService'

export default function RoomOccupancyReportPage() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [roomsResp, studentsResp] = await Promise.all([
        getAllRooms(),
        getAllStudents()
      ])

      setRooms(roomsResp.data || roomsResp || [])
      setStudents(studentsResp.data || studentsResp || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRoomOccupancy = (room) => {
    const roomStudents = students.filter(s => s.roomNumber === room.roomNumber)
    const occupancyRate = room.capacity > 0 ? ((room.occupiedBeds / room.capacity) * 100).toFixed(0) : 0
    const availableBeds = room.capacity - room.occupiedBeds
    
    let status = 'Empty'
    if (room.occupiedBeds >= room.capacity) {
      status = 'Full'
    } else if (room.occupiedBeds > 0) {
      status = 'Partially Occupied'
    }

    return {
      ...room,
      studentCount: roomStudents.length,
      students: roomStudents,
      occupancyRate: Number(occupancyRate),
      availableBeds,
      status
    }
  }

  const roomsWithOccupancy = rooms
    .map(getRoomOccupancy)
    .filter(room => {
      const matchesSearch = room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || room.type === filterType
      return matchesSearch && matchesType
    })

  const totalCapacity = roomsWithOccupancy.reduce((sum, r) => sum + r.capacity, 0)
  const totalOccupied = roomsWithOccupancy.reduce((sum, r) => sum + r.occupiedBeds, 0)
  const totalAvailable = totalCapacity - totalOccupied
  const overallOccupancyRate = totalCapacity > 0 ? ((totalOccupied / totalCapacity) * 100).toFixed(1) : 0

  const fullRooms = roomsWithOccupancy.filter(r => r.occupiedBeds >= r.capacity).length
  const partiallyOccupied = roomsWithOccupancy.filter(r => r.occupiedBeds > 0 && r.occupiedBeds < r.capacity).length
  const emptyRooms = roomsWithOccupancy.filter(r => r.occupiedBeds === 0).length

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
          <h1 className="page-title" style={{ color: 'white', margin: 0 }}>Room Occupancy Report</h1>
        </div>
        <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Detailed room occupancy and capacity utilization statistics
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
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            minWidth: '150px',
          }}
        >
          <option value="All">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>
      </motion.div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
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
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{overallOccupancyRate}%</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Overall Occupancy</div>
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
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{totalOccupied}/{totalCapacity}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Beds Occupied</div>
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
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{fullRooms}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Full Rooms</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{emptyRooms}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Empty Rooms</div>
        </motion.div>
      </div>

      {/* Occupancy Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Occupancy Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>{fullRooms}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Full (100%)</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>{partiallyOccupied}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Partially Occupied</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{emptyRooms}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Empty (0%)</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{totalAvailable}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Available Beds</div>
          </div>
        </div>
      </motion.div>

      {/* Rooms Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: '#111827' }}>Room Details</h3>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : roomsWithOccupancy.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No rooms found</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Room</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Capacity</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Occupied</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Available</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Occupancy Rate</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {roomsWithOccupancy
                  .sort((a, b) => b.occupancyRate - a.occupancyRate)
                  .map((room, index) => (
                    <motion.tr
                      key={room.id || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      style={{ borderBottom: '1px solid #e5e7eb' }}
                      whileHover={{ background: '#f9fafb' }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600', color: '#111827', fontSize: '1.125rem' }}>
                          {room.roomNumber}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#374151' }}>{room.type}</td>
                      <td style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>{room.capacity}</td>
                      <td style={{ padding: '1rem', color: '#3b82f6', fontWeight: '600' }}>{room.occupiedBeds}</td>
                      <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>{room.availableBeds}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ 
                            flex: 1,
                            height: '10px',
                            background: '#e5e7eb',
                            borderRadius: '999px',
                            overflow: 'hidden',
                            maxWidth: '120px'
                          }}>
                            <div style={{
                              width: `${room.occupancyRate}%`,
                              height: '100%',
                              background: room.occupancyRate >= 100 ? '#ef4444' : room.occupancyRate >= 50 ? '#f59e0b' : '#10b981',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          <span style={{ 
                            fontWeight: '700',
                            color: room.occupancyRate >= 100 ? '#ef4444' : room.occupancyRate >= 50 ? '#f59e0b' : '#10b981',
                            minWidth: '50px'
                          }}>
                            {room.occupancyRate}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          background: room.status === 'Full' ? '#fee2e2' : room.status === 'Partially Occupied' ? '#fef3c7' : '#dcfce7',
                          color: room.status === 'Full' ? '#dc2626' : room.status === 'Partially Occupied' ? '#d97706' : '#059669'
                        }}>
                          {room.status}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
