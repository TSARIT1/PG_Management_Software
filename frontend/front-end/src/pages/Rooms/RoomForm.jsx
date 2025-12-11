import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1 },
  }),
}

const rowVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.15 },
  }),
}

export default function RoomForm({ room, onSubmit }) {
  const [formData, setFormData] = useState({
    'Room No': '',
    Type: '',
    Capacity: '',
    Occupied: '',
    Available: '',
    Rent: '',
    Status: '',
  })

  useEffect(() => {
    if (room) {
      setFormData(room)
    }
  }, [room])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  }

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#3b82f6'
    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e5e7eb'
    e.target.style.boxShadow = 'none'
  }

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Row 1: Room No & Type */}
      <motion.div 
        className="form-row"
        custom={0}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}
      >
        <motion.div
          className="form-group"
          custom={0}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Room No
          </label>
          <motion.input
            type="text"
            name="Room No"
            className="form-input"
            value={formData['Room No']}
            onChange={handleChange}
            required
            disabled={room ? true : false}
            style={{
              ...inputStyle,
              background: room ? '#f9fafb' : 'white',
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>

        <motion.div
          className="form-group"
          custom={1}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Type
          </label>
          <motion.select
            name="Type"
            className="form-select"
            value={formData.Type}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          >
            <option value="">Select Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </motion.select>
        </motion.div>
      </motion.div>

      {/* Row 2: Capacity & Occupied */}
      <motion.div 
        className="form-row"
        custom={1}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}
      >
        <motion.div
          className="form-group"
          custom={2}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Capacity
          </label>
          <motion.input
            type="number"
            name="Capacity"
            className="form-input"
            value={formData.Capacity}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>

        <motion.div
          className="form-group"
          custom={3}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Occupied
          </label>
          <motion.input
            type="number"
            name="Occupied"
            className="form-input"
            value={formData.Occupied}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>
      </motion.div>

      {/* Row 3: Available & Rent */}
      <motion.div 
        className="form-row"
        custom={2}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}
      >
        <motion.div
          className="form-group"
          custom={4}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Available
          </label>
          <motion.input
            type="number"
            name="Available"
            className="form-input"
            value={formData.Available}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>

        <motion.div
          className="form-group"
          custom={5}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Rent (₹)
          </label>
          <motion.input
            type="number"
            name="Rent"
            className="form-input"
            value={formData.Rent}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>
      </motion.div>

      {/* Status */}
      <motion.div
        className="form-group"
        custom={3}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '1.5rem' }}
      >
        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
          Status
        </label>
        <motion.select
          name="Status"
          className="form-select"
          value={formData.Status}
          onChange={handleChange}
          required
          style={inputStyle}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        >
          <option value="">Select Status</option>
          <option value="Full">Full</option>
          <option value="Available">Available</option>
        </motion.select>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        custom={4}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {room ? '✏️ Update Room' : '➕ Add Room'}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}
