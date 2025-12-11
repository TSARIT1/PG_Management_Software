import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiUser, FiPhone, FiMail, FiMapPin, FiClock, FiCheck, FiX, FiMessageSquare } from 'react-icons/fi'
import { getAllAppointments, updateAppointmentStatus } from '../../services/appointmentService'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL') // ALL, PENDING, CONFIRMED, CANCELLED
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await getAllAppointments()
      if (response.status === 'success') {
        setAppointments(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status)
      fetchAppointments()
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'ALL') return true
    return apt.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#f59e0b'
      case 'CONFIRMED': return '#10b981'
      case 'CANCELLED': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '0.5rem',
        }}>
          📅 Appointments
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage all appointment requests from candidates
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: filter === status ? '#667eea' : '#f3f4f6',
              color: filter === status ? 'white' : '#374151',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          Loading appointments...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#f9fafb',
          borderRadius: '1rem',
          color: '#6b7280',
        }}>
          No appointments found
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: `2px solid ${getStatusColor(appointment.status)}20`,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedAppointment(appointment)}
            >
              {/* Status Badge */}
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                background: `${getStatusColor(appointment.status)}20`,
                color: getStatusColor(appointment.status),
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}>
                {appointment.status}
              </div>

              {/* Candidate Info */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}>
                  <FiUser style={{ color: '#667eea' }} />
                  <span style={{ fontWeight: '600', color: '#111827' }}>
                    {appointment.candidateName}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}>
                  <FiPhone size={14} />
                  <span>{appointment.candidatePhone}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}>
                  <FiMail size={14} />
                  <span>{appointment.candidateEmail}</span>
                </div>
              </div>

              {/* Appointment Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: '#f3f4f6',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
              }}>
                <FiCalendar style={{ color: '#667eea' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  {formatDate(appointment.appointmentDate)}
                </span>
              </div>

              {/* Message Preview */}
              {appointment.message && (
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontStyle: 'italic',
                  marginTop: '0.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  💬 {appointment.message}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedAppointment && (
        <div
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
          onClick={() => setSelectedAppointment(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#111827',
            }}>
              Appointment Details
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '1rem',
                background: `${getStatusColor(selectedAppointment.status)}20`,
                color: getStatusColor(selectedAppointment.status),
                fontWeight: '600',
                marginBottom: '1rem',
              }}>
                {selectedAppointment.status}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <FiUser style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Candidate Name
                </label>
                <p style={{ color: '#374151' }}>{selectedAppointment.candidateName}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <FiPhone style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Phone Number
                </label>
                <p style={{ color: '#374151' }}>{selectedAppointment.candidatePhone}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <FiMail style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <p style={{ color: '#374151' }}>{selectedAppointment.candidateEmail}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <FiCalendar style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Appointment Date & Time
                </label>
                <p style={{ color: '#374151' }}>{formatDate(selectedAppointment.appointmentDate)}</p>
              </div>

              {selectedAppointment.message && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                    <FiMessageSquare style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Message
                  </label>
                  <p style={{
                    color: '#374151',
                    padding: '0.75rem',
                    background: '#f3f4f6',
                    borderRadius: '0.5rem',
                  }}>
                    {selectedAppointment.message}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedAppointment.status === 'PENDING' && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleStatusUpdate(selectedAppointment.id, 'CONFIRMED')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <FiCheck /> Confirm
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedAppointment.id, 'CANCELLED')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedAppointment(null)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
