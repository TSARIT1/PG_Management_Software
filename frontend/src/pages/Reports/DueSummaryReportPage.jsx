import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getAllStudents } from '../../services/studentService'
import { getAllRooms } from '../../services/roomService'
import paymentService from '../../services/paymentService'

export default function DueSummaryReportPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [rooms, setRooms] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [studentsResp, roomsResp, paymentsResp] = await Promise.all([
        getAllStudents(),
        getAllRooms(),
        paymentService.getAllPayments()
      ])

      setStudents(studentsResp.data || studentsResp || [])
      setRooms(roomsResp.data || roomsResp || [])
      setPayments(paymentsResp.data || paymentsResp || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStudentDues = (student) => {
    // Get room rent
    const room = rooms.find(r => r.roomNumber === student.roomNumber)
    const monthlyRent = room ? room.rent : 0

    // Get total paid by student
    const studentPayments = payments.filter(p => 
      p.student === student.name || p.studentName === student.name
    )
    const totalPaid = studentPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0)

    // Calculate due
    const totalDue = monthlyRent - totalPaid
    const hasDue = totalDue > 0

    return {
      ...student,
      monthlyRent,
      totalPaid,
      totalDue: hasDue ? totalDue : 0,
      hasDue,
      paymentCount: studentPayments.length,
      lastPayment: studentPayments.length > 0 
        ? studentPayments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))[0]
        : null
    }
  }

  const studentsWithDues = students
    .map(getStudentDues)
    .filter(student => {
      const matchesSearch = 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = 
        filterStatus === 'All' ||
        (filterStatus === 'Has Dues' && student.hasDue) ||
        (filterStatus === 'Fully Paid' && !student.hasDue)

      return matchesSearch && matchesStatus
    })

  const totalDues = studentsWithDues.reduce((sum, s) => sum + s.totalDue, 0)
  const studentsWithDuesCount = studentsWithDues.filter(s => s.hasDue).length
  const fullyPaidCount = studentsWithDues.filter(s => !s.hasDue).length

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
          <h1 className="page-title" style={{ color: 'white', margin: 0 }}>Due Summary Report</h1>
        </div>
        <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Outstanding dues and payment status overview
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
            placeholder="Search by name or room..."
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
            minWidth: '150px',
          }}
        >
          <option value="All">All Students</option>
          <option value="Has Dues">Has Dues</option>
          <option value="Fully Paid">Fully Paid</option>
        </select>
      </motion.div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>₹{totalDues.toLocaleString()}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Outstanding</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{studentsWithDuesCount}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Students with Dues</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{fullyPaidCount}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Fully Paid</div>
        </motion.div>
      </div>

      {/* Dues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: '#111827' }}>Student Due Details</h3>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : studentsWithDues.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No students found</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Student</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Room</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Rent</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Paid</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Due</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Last Payment</th>
                </tr>
              </thead>
              <tbody>
                {studentsWithDues
                  .sort((a, b) => b.totalDue - a.totalDue)
                  .map((student, index) => (
                    <motion.tr
                      key={student.id || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      style={{ 
                        borderBottom: '1px solid #e5e7eb',
                        background: student.hasDue ? '#fef2f2' : 'white'
                      }}
                      whileHover={{ background: student.hasDue ? '#fee2e2' : '#f9fafb' }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600', color: '#111827' }}>{student.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{student.email}</div>
                      </td>
                      <td style={{ padding: '1rem', color: '#374151' }}>{student.roomNumber || 'N/A'}</td>
                      <td style={{ padding: '1rem', color: '#374151' }}>₹{student.monthlyRent.toLocaleString()}</td>
                      <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>
                        ₹{student.totalPaid.toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ 
                          fontWeight: '700', 
                          color: student.hasDue ? '#ef4444' : '#10b981',
                          fontSize: '1.125rem'
                        }}>
                          ₹{student.totalDue.toLocaleString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {student.hasDue ? (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '0.375rem',
                            background: '#fee2e2',
                            color: '#dc2626',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}>
                            <FiAlertCircle size={14} />
                            Pending
                          </div>
                        ) : (
                          <div style={{
                            display: 'inline-block',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '0.375rem',
                            background: '#dcfce7',
                            color: '#059669',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}>
                            Paid
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        {student.lastPayment 
                          ? new Date(student.lastPayment.paymentDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'No payments'
                        }
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
