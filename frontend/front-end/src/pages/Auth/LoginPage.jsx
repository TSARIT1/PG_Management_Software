import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email && formData.password) {
      localStorage.setItem('user', JSON.stringify({ email: formData.email }))
      navigate('/dashboard')
    }
  }

  const handleSocialLogin = (provider) => {
    alert(`${provider} login will redirect to their authentication page`)
    localStorage.setItem('user', JSON.stringify({ email: `user@${provider.toLowerCase()}.com` }))
    navigate('/dashboard')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: 0.2 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: 0.2 },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + i * 0.1 },
    }),
  }

  return (
    <motion.div
      className="login-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f9fafb',
      }}
    >
      <motion.div
        variants={imageVariants}
        style={{
          flex: '0.55',
          backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(99, 102, 241, 0.7) 100%), url(/images/luis-desiro-qeMalFWKobM-unsplash.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)',
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>
            Welcome Back!
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.95, maxWidth: '400px', lineHeight: 1.6 }}>
            Log in to your account to access your hostel management dashboard, track payments, and stay connected with the community.
          </p>

          <motion.div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[
              { label: 'Students', value: '500+' },
              { label: 'Rooms', value: '150+' },
              { label: 'Staff', value: '50+' },
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        variants={formVariants}
        style={{
          flex: '0.45',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'white',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: '2rem' }}
          >
            <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
              Login
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              Access your Hostel account
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Email Input */}
            <motion.div
              className="form-group"
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: '1.5rem' }}
            >
              <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
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
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="form-group"
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: '1.5rem' }}
            >
              <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#111827' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: '2.75rem',
                    border: '1px solid #e5e7eb',
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    fontSize: '1.125rem',
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
                <span style={{ color: '#6b7280' }}>Remember me</span>
              </label>
              <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                Forgot password?
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              custom={3}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb'
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6'
                e.target.style.boxShadow = 'none'
              }}
            >
              Login <FiArrowRight style={{ fontSize: '1.125rem' }} />
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div
            custom={4}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              color: '#d1d5db',
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Or continue with</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            custom={5}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <motion.button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#111827',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb'
                e.target.style.borderColor = '#d1d5db'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6'
                e.target.style.borderColor = '#e5e7eb'
              }}
            >
              <FaGoogle style={{ color: '#ea4335' }} />
              Google
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#111827',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb'
                e.target.style.borderColor = '#d1d5db'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6'
                e.target.style.borderColor = '#e5e7eb'
              }}
            >
              <FaFacebook style={{ color: '#1877f2' }} />
              Facebook
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p
            custom={6}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '0.9rem',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#3b82f6',
                fontWeight: '600',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none'
              }}
            >
              Create one
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Responsive Mobile */}
      <style>{`
        @media (max-width: 768px) {
          .login-page {
            flex-direction: column;
          }
          .login-page > div {
            flex: 1 !important;
            min-height: 50vh;
          }
        }
      `}</style>
    </motion.div>
  )
}
