import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiPlus, FiMail, FiDollarSign } from 'react-icons/fi'
import DataTable from '../../components/common/DataTable'
import PaymentForm from './PaymentForm'

const dummyPayments = [
  {
    PaymentID: 'P001',
    Student: 'Rajesh Kumar',
    Amount: '5000',
    Date: '2023-12-01',
    Method: 'UPI',
  },
  {
    PaymentID: 'P002',
    Student: 'Priya Singh',
    Amount: '3500',
    Date: '2023-12-02',
    Method: 'Card',
  }
]

const dummyDues = [
  {
    Student: 'Vikram Rao',
    Room: 'R105',
    Rent: '7500',
    Paid: '5000',
    Due: '2500',
    Email: 'vikram@example.com',
  }
]

export default function PaymentListPage() {
  const [payments, setPayments] = useState(dummyPayments)
  const [filterStudent, setFilterStudent] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)

  const handleAddPayment = (paymentData) => {
    if (editingPayment) {
      setPayments(payments.map((p) => (p.PaymentID === editingPayment.PaymentID ? paymentData : p)))
      setEditingPayment(null)
    } else {
      const newPayment = {
        ...paymentData,
        PaymentID: `P${String(payments.length + 1).padStart(3, '0')}`,
      }
      setPayments([...payments, newPayment])
    }
    setShowForm(false)
  }

  const handleEdit = (payment) => {
    setEditingPayment(payment)
    setShowForm(true)
  }

  const handleDelete = (payment) => {
    if (window.confirm(`Delete payment ${payment.PaymentID}?`)) {
      setPayments(payments.filter((p) => p.PaymentID !== payment.PaymentID))
    }
  }

  const paymentColumns = ['PaymentID', 'Student', 'Amount', 'Date', 'Method']
  const dueColumns = ['Student', 'Room', 'Rent', 'Paid', 'Due', 'Email']

  const highlightedRows = dummyDues
    .map((due) => dummyDues.indexOf(due))
    .filter((idx) => parseInt(dummyDues[idx].Due) > 0)

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
          <h1 className="page-title" style={{ color: 'white' }}>Payment Management</h1>
          <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Track and manage student payments</p>
        </div>
        <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>
          <FiDollarSign />
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
          <motion.select
            className="select-input"
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
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
          >
            <option value="All">All Students</option>
            <option value="Rajesh Kumar">Rajesh Kumar</option>
            <option value="Priya Singh">Priya Singh</option>
            <option value="Amit Patel">Amit Patel</option>
          </motion.select>
          <motion.button
            className="btn btn-secondary btn-sm"
            onClick={() => setFilterStudent('All')}
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
        <div className="toolbar-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.button
            className="btn btn-warning"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(249, 115, 22, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
            <FiMail /> Send Due Emails
          </motion.button>
          <motion.button
            className="btn btn-primary"
            onClick={() => {
              setEditingPayment(null)
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
            <FiPlus /> Add Payment
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
              <h2 className="modal-title" style={{ color: 'white' }}>{editingPayment ? '✏️ Edit Payment' : '➕ Add New Payment'}</h2>
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
              <PaymentForm
                payment={editingPayment}
                onSubmit={(data) => {
                  handleAddPayment(data)
                  setShowForm(false)
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#111827', fontSize: '1.25rem', fontWeight: '600' }}>Recent Payments</h3>
        <DataTable
          columns={paymentColumns}
          data={payments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Due Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 style={{
          marginBottom: '1rem',
          marginTop: '2rem',
          textAlign: 'center',
          color: '#ef4444',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Current Month's Due Summary
        </h3>
        <DataTable
          columns={dueColumns}
          data={dummyDues}
          highlightRows={highlightedRows}
        />
      </motion.div>
    </motion.div>
  )
}
