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

export default function StudentForm({ student, onSubmit }) {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Room: '',
    Admission: '',
    Contact: '',
    Email: '',
  })

  useEffect(() => {
    if (student) {
      setFormData({
        Name: student.Name,
        Age: student.Age,
        Gender: student.Gender,
        Room: student.Room,
        Admission: student.Admission,
        Contact: student.Contact,
        Email: student.Email,
      })
    }
  }, [student])

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
      {/* Name */}
      <motion.div
        className="form-group"
        custom={0}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '1.5rem' }}
      >
        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
          Name
        </label>
        <motion.input
          type="text"
          name="Name"
          className="form-input"
          value={formData.Name}
          onChange={handleChange}
          required
          style={inputStyle}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </motion.div>

      {/* Row 1: Age & Gender */}
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
          custom={1}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Age
          </label>
          <motion.input
            type="number"
            name="Age"
            className="form-input"
            value={formData.Age}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>

        <motion.div
          className="form-group"
          custom={2}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Gender
          </label>
          <motion.select
            name="Gender"
            className="form-select"
            value={formData.Gender}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </motion.select>
        </motion.div>
      </motion.div>

      {/* Row 2: Room & Admission */}
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
          custom={3}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Room
          </label>
          <motion.select
            name="Room"
            className="form-select"
            value={formData.Room}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          >
            <option value="">Select Room</option>
            <option value="R101">R101</option>
            <option value="R102">R102</option>
            <option value="R103">R103</option>
            <option value="R104">R104</option>
            <option value="R105">R105</option>
          </motion.select>
        </motion.div>

        <motion.div
          className="form-group"
          custom={4}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Admission Date
          </label>
          <motion.input
            type="date"
            name="Admission"
            className="form-input"
            value={formData.Admission}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>
      </motion.div>

      {/* Row 3: Contact & Email */}
      <motion.div 
        className="form-row"
        custom={3}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}
      >
        <motion.div
          className="form-group"
          custom={5}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Contact
          </label>
          <motion.input
            type="tel"
            name="Contact"
            className="form-input"
            value={formData.Contact}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>

        <motion.div
          className="form-group"
          custom={6}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
            Email
          </label>
          <motion.input
            type="email"
            name="Email"
            className="form-input"
            value={formData.Email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </motion.div>
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
          {student ? '✏️ Update Student' : '➕ Add Student'}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}
