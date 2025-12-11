import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiDownload, FiEye, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getAllStudents } from '../../services/studentService'
import { getAllRooms } from '../../services/roomService'
import paymentService from '../../services/paymentService'
import attendanceService from '../../services/attendanceService'

export default function StudentReportPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [rooms, setRooms] = useState([])
  const [payments, setPayments] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRoom, setFilterRoom] = useState('All')
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [studentsResp, roomsResp, paymentsResp, attendanceResp] = await Promise.all([
        getAllStudents(),
        getAllRooms(),
        paymentService.getAllPayments(),
        attendanceService.getAllAttendance()
      ])

      setStudents(studentsResp.data || studentsResp || [])
      setRooms(roomsResp.data || roomsResp || [])
      setPayments(paymentsResp.data || paymentsResp || [])
      setAttendance(attendanceResp.data || attendanceResp || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStudentReport = (student) => {
    // Get room details
    const room = rooms.find(r => r.roomNumber === student.roomNumber)
    const rent = room ? room.rent : 0

    // Get payment summary
    const studentPayments = payments.filter(p => p.student === student.name || p.studentName === student.name)
    const totalPaid = studentPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
    const totalDue = rent - totalPaid
    const lastPayment = studentPayments.length > 0 
      ? studentPayments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))[0]
      : null

    // Get attendance summary
    const studentAttendance = attendance.filter(a => a.studentName === student.name)
    const presentDays = studentAttendance.filter(a => a.status?.toUpperCase() === 'PRESENT').length
    const absentDays = studentAttendance.filter(a => a.status?.toUpperCase() === 'ABSENT').length
    const totalDays = studentAttendance.length
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0

    return {
      ...student,
      roomNumber: student.roomNumber || 'Not Assigned',
      rent,
      totalPaid,
      totalDue: totalDue > 0 ? totalDue : 0,
      lastPaymentDate: lastPayment ? lastPayment.paymentDate : 'N/A',
      lastPaymentAmount: lastPayment ? lastPayment.amount : 0,
      presentDays,
      absentDays,
      totalDays,
      attendancePercentage,
      recentPayments: studentPayments.slice(0, 5)
    }
  }

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.includes(searchTerm)
      const matchesRoom = filterRoom === 'All' || student.roomNumber === filterRoom
      return matchesSearch && matchesRoom
    })
    .map(getStudentReport)

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
          <h1 className="page-title" style={{ color: 'white', margin: 0 }}>Student Report</h1>
        </div>
        <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Comprehensive student data and analytics
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
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
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
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
              minWidth: '150px',
            }}
          >
            <option value="All">All Rooms</option>
            {[...new Set(students.map(s => s.roomNumber))].filter(Boolean).map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FiDownload /> Export
        </motion.button>
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
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{filteredStudents.length}</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Students</div>
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
            ₹{filteredStudents.reduce((sum, s) => sum + s.totalPaid, 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Collected</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Due</div>
        </motion.div>
      </div>

      {/* Students Table */}
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
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : filteredStudents.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No students found</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Room</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Rent</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Paid</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Due</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Attendance</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ borderBottom: '1px solid #e5e7eb' }}
                    whileHover={{ background: '#f9fafb' }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: '#111827' }}>{student.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{student.email}</div>
                    </td>
                    <td style={{ padding: '1rem', color: '#374151' }}>{student.roomNumber}</td>
                    <td style={{ padding: '1rem', color: '#374151' }}>₹{student.rent.toLocaleString()}</td>
                    <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>₹{student.totalPaid.toLocaleString()}</td>
                    <td style={{ padding: '1rem', color: student.totalDue > 0 ? '#ef4444' : '#10b981', fontWeight: '600' }}>
                      ₹{student.totalDue.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ 
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        background: student.attendancePercentage >= 75 ? '#dcfce7' : '#fef2f2',
                        color: student.attendancePercentage >= 75 ? '#059669' : '#dc2626',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {student.attendancePercentage}%
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <motion.button
                        onClick={() => setSelectedStudent(student)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          padding: '0.5rem',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <FiEye /> View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Detailed View Modal */}
      {selectedStudent && (
        <motion.div
          className="modal-overlay"
          onClick={() => setSelectedStudent(null)}
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
              maxWidth: '800px',
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
              <h2 style={{ margin: 0 }}>Student Details</h2>
              <button
                onClick={() => setSelectedStudent(null)}
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
              {/* Personal Info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Name</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedStudent.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedStudent.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedStudent.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Room Number</div>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{selectedStudent.roomNumber}</div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Payment Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#0369a1', marginBottom: '0.25rem' }}>Monthly Rent</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0c4a6e' }}>₹{selectedStudent.rent.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#15803d', marginBottom: '0.25rem' }}>Total Paid</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534' }}>₹{selectedStudent.totalPaid.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '0.25rem' }}>Total Due</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#991b1b' }}>₹{selectedStudent.totalDue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Attendance Summary */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Attendance Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{selectedStudent.totalDays}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Days</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>{selectedStudent.presentDays}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Present</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>{selectedStudent.absentDays}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Absent</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{selectedStudent.attendancePercentage}%</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Percentage</div>
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
              {selectedStudent.recentPayments && selectedStudent.recentPayments.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Recent Payments</h3>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead style={{ background: '#f9fafb' }}>
                        <tr>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Date</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Amount</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.recentPayments.map((payment, index) => (
                          <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>{payment.paymentDate}</td>
                            <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>₹{Number(payment.amount).toLocaleString()}</td>
                            <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#374151' }}>{payment.method || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
