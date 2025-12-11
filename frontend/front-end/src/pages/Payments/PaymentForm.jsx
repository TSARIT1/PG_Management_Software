import React, { useState, useEffect } from 'react'

export default function PaymentForm({ payment, onSubmit }) {
  const [formData, setFormData] = useState({
    Student: '',
    Amount: '',
    Date: '',
    Method: '',
  })

  useEffect(() => {
    if (payment) {
      setFormData({
        Student: payment.Student,
        Amount: payment.Amount,
        Date: payment.Date,
        Method: payment.Method,
      })
    }
  }, [payment])

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Student</label>
        <select name="Student" className="form-select" value={formData.Student} onChange={handleChange} required>
          <option value="">Select Student</option>
          <option value="Rajesh Kumar">Rajesh Kumar</option>
          <option value="Priya Singh">Priya Singh</option>
          <option value="Amit Patel">Amit Patel</option>
          <option value="Sneha Gupta">Sneha Gupta</option>
          <option value="Vikram Rao">Vikram Rao</option>
          <option value="Anjali Das">Anjali Das</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="Amount"
            className="form-input"
            value={formData.Amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="Date"
            className="form-input"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Method</label>
        <select name="Method" className="form-select" value={formData.Method} onChange={handleChange} required>
          <option value="">Select Method</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button type="submit" className="btn btn-primary btn-block">
          {payment ? 'Update Payment' : 'Add Payment'}
        </button>
      </div>
    </form>
  )
}
