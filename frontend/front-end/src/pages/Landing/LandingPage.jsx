import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiUsers, FiHome, FiAward } from 'react-icons/fi'

export default function LandingPage() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1 },
    },
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/young-friends-hostel.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem',
            width: '100%',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            Welcome to Hostel Management platform
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.5rem',
              marginBottom: '2rem',
              opacity: 0.95,
              fontWeight: '300',
            }}
          >
            Your Home Away From Home - Modern Management, Premium Living Experience
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '3rem',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              Login <FiArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Register
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                icon: FiHome,
                title: 'Modern Facilities',
                desc: 'State-of-the-art amenities and well-maintained rooms',
              },
              {
                icon: FiUsers,
                title: 'Community Living',
                desc: 'Safe and friendly environment for students',
              },
              {
                icon: FiAward,
                title: 'Professional Management',
                desc: '24/7 support and efficient hostel management system',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  style={{
                    padding: '2rem',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    borderLeft: '4px solid #3b82f6',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Icon style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        style={{
          padding: '4rem 2rem',
          backgroundColor: '#f9fafb',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Hostel
          </motion.h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              '/images/young-friends-hostel.jpg',
              '/images/zoshua-colah-TzMGehZmocI-unsplash.jpg',
            ].map((img, idx) => (
              <motion.div
                key={idx}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                whileHover={{ y: -10 }}
              >
                <img
                  src={img}
                  alt={`Hostel ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Hostel Information
          </motion.h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                icon: FiMapPin,
                title: 'Address',
                content: '123 University Street, Campus Area, City - 400001',
              },
              {
                icon: FiPhone,
                title: 'Phone',
                content: '+91 (800) 123-4567',
              },
              {
                icon: FiMail,
                title: 'Email',
                content: 'info@elitehostel.com',
              },
            ].map((info, idx) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={idx}
                  style={{
                    padding: '2rem',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ backgroundColor: '#e5e7eb' }}
                >
                  <Icon style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                    {info.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{info.content}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        style={{
          padding: '4rem 2rem',
          backgroundColor: '#f9fafb',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Elite Hostel
          </motion.h2>

          <motion.p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Elite Hostel is a premium accommodation facility designed for students and young professionals seeking a comfortable, safe, and community-oriented living space. With modern amenities, professional management, and a dedicated support system, we ensure every resident has a home away from home.
          </motion.p>

          <motion.p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: '#6b7280',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our state-of-the-art management system ensures seamless operations, transparent payment tracking, and efficient communication between residents and management. Join our community today!
          </motion.p>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        style={{
          padding: '3rem 2rem',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/zoshua-colah-TzMGehZmocI-unsplash.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          color: 'white',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Join Our Community?
        </motion.h2>

        <motion.p
          style={{
            fontSize: '1.125rem',
            marginBottom: '2rem',
            opacity: 0.9,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Register now to secure your spot in Elite Hostel
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
          style={{
            padding: '1rem 2.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          Get Started <FiArrowRight />
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer
        style={{
          padding: '2rem',
          backgroundColor: '#1f2937',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>
          © 2025 Elite Hostel. All rights reserved.
        </p>
        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
          Premium Student Housing | Modern Management | Professional Service
        </p>
      </footer>
    </div>
  )
}
