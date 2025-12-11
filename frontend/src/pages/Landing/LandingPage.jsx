import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiUsers, FiHome, FiAward, FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi'
import MapComponent from '../../components/map/MapComponent'
import AppointmentForm from '../../components/appointment/AppointmentForm'
import { getAllHostelLocations } from '../../services/locationService'
import { geocodeAddress, calculateDistance } from '../../services/geocodingService'

export default function LandingPage() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [hostelLocations, setHostelLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [searchCenter, setSearchCenter] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [loadingLocations, setLoadingLocations] = useState(false)
  const [searchRadius, setSearchRadius] = useState(50) // Default 50km radius

  // Background images array
  const backgroundImages = [
    '/images/young-friends-hostel.jpg',
    '/images/taton-moise-ukQQm0mLWyI-unsplash.jpg',
    '/images/maria-moroz-hzWyJwwLYw0-unsplash.jpg',
  ]

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch hostel locations on mount
  useEffect(() => {
    fetchHostelLocations()
  }, [])

  const fetchHostelLocations = async () => {
    try {
      setLoadingLocations(true)
      const response = await getAllHostelLocations()
      if (response.status === 'success') {
        setHostelLocations(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch hostel locations:', error)
    } finally {
      setLoadingLocations(false)
    }
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Search query:', searchQuery)
  }

  // Handle location search
  const handleLocationSearch = async (e) => {
    e.preventDefault()
    if (locationSearch.trim()) {
      try {
        setLoadingLocations(true)
        
        // Geocode the searched location
        const geocoded = await geocodeAddress(locationSearch)
        
        if (geocoded) {
          setSearchCenter({ lat: geocoded.lat, lng: geocoded.lng })
          
          // Filter hostels within the search radius
          const nearby = hostelLocations.filter(hostel => {
            if (!hostel.latitude || !hostel.longitude) return false
            
            const distance = calculateDistance(
              geocoded.lat,
              geocoded.lng,
              hostel.latitude,
              hostel.longitude
            )
            
            return distance <= searchRadius
          })
          
          setFilteredLocations(nearby)
          setShowMap(true)
          
          // Scroll to map section
          setTimeout(() => {
            const mapSection = document.getElementById('map-section')
            if (mapSection) {
              mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 100)
        } else {
          alert('Location not found. Please try a different search term.')
        }
      } catch (error) {
        console.error('Error searching location:', error)
        alert('Failed to search location. Please try again.')
      } finally {
        setLoadingLocations(false)
      }
    }
  }

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
  }

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
      {/* Navigation Bar */}
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0.75rem 1.5rem',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled ? '1px solid #e5e7eb' : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: isScrolled ? '#111827' : 'white',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onClick={() => scrollToSection('hero')}
          >
            PG/Hostel Management
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              flex: '0 1 300px',
              position: 'relative',
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.5rem',
                borderRadius: '2rem',
                border: isScrolled ? '2px solid #e5e7eb' : '2px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: isScrolled ? 'white' : 'rgba(255, 255, 255, 0.2)',
                color: isScrolled ? '#111827' : 'white',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#111827'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isScrolled ? '#e5e7eb' : 'rgba(255, 255, 255, 0.3)'
                e.target.style.backgroundColor = isScrolled ? 'white' : 'rgba(255, 255, 255, 0.2)'
                e.target.style.color = isScrolled ? '#111827' : 'white'
              }}
            />
            <FiSearch
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem',
              }}
            />
          </form>

          {/* Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Appointment', id: 'appointment' },
              { label: 'About Us', id: 'about' },
              { label: 'Contact Us', id: 'info' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isScrolled ? '#111827' : 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled ? '#111827' : 'white'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'transparent',
                color: isScrolled ? '#3b82f6' : 'white',
                border: `2px solid ${isScrolled ? '#3b82f6' : 'white'}`,
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Register
            </motion.button>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image Slider */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: currentSlide === index ? 1 : 0,
            }}
          />
        ))}
        
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 2 }} />
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >
          <FiChevronRight />
        </button>

        {/* Slide Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            display: 'flex',
            gap: '1rem',
          }}
        >
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentSlide === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentSlide !== index) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
                }
              }}
            />
          ))}
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1.5rem',
            width: '100%',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            Welcome to PG/Hostel Management platform
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              marginBottom: '1.5rem',
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
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Login <FiArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Register
            </motion.button>
          </motion.div>

          {/* Location Search Bar */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: '2.5rem',
              maxWidth: '600px',
              margin: '2.5rem auto 0',
            }}
          >
            <form onSubmit={handleLocationSearch}>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '3rem',
                  padding: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <FiMapPin
                  style={{
                    fontSize: '1.5rem',
                    color: 'white',
                    marginLeft: '1rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by area, locality, or city (e.g., Andheri, Mumbai)"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '400',
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = 'none'
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <FiSearch /> Search
                </motion.button>
              </div>
            </form>
            
            {/* Helper text - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginTop: '1.5rem',
              }}
            >
              <p
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(59, 130, 246, 0.9))',
                  borderRadius: '2rem',
                  fontSize: '1.05rem',
                  color: 'white',
                  fontWeight: '600',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  letterSpacing: '0.3px',
                }}
              >
                ✨ Find the perfect PG/Hostel near your college or workplace
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Map Section */}
      {showMap && (
        <motion.section
          id="map-section"
          style={{
            padding: '3rem 1.5rem',
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '1rem',
                color: '#111827',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              📍 Registered PG/Hostels Near You
            </motion.h2>
            <p style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1rem',
            }}>
              {filteredLocations.length > 0 
                ? `${filteredLocations.length} PG/Hostels found within ${searchRadius}km of "${locationSearch}"`
                : `Searching for PG/Hostels near "${locationSearch}"...`
              }
            </p>
            
            {loadingLocations ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#6b7280',
              }}>
                <p>Searching for locations...</p>
              </div>
            ) : (
              <MapComponent 
                locations={filteredLocations} 
                searchQuery=""
                searchCenter={searchCenter}
              />
            )}
          </div>
        </motion.section>
      )}

      {/* Appointment Section */}
      <motion.section
        id="appointment"
        style={{
          padding: '4rem 1.5rem',
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
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Book Your Visit
          </motion.h2>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '3rem',
            fontSize: '1.125rem',
          }}>
            Schedule an appointment to visit your preferred PG/Hostel
          </p>
          
          <AppointmentForm />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        style={{
          padding: '3rem 1.5rem',
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
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2.5rem',
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
                desc: '24/7 support and efficient PG/Hostel management system',
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
          padding: '3rem 1.5rem',
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
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2.5rem',
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

      {/* About Section */}
      <motion.section
        id="about"
        style={{
          padding: '3rem 1.5rem',
          backgroundColor: 'white',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About PG/Hostel
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
            PG/Hostel is a premium accommodation facility designed for students and young professionals seeking a comfortable, safe, and community-oriented living space. With modern amenities, professional management, and a dedicated support system, we ensure every resident has a home away from home.
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
          padding: '2.5rem 1.5rem',
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
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
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
            fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
            marginBottom: '1.5rem',
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
            padding: '0.875rem 2rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Get Started <FiArrowRight />
        </motion.button>
      </motion.section>

      {/* Info Section - Contact Details */}
      <motion.section
        id="info"
        style={{
          padding: '3rem 1.5rem',
          backgroundColor: '#f9fafb',
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
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2.5rem',
              color: '#111827',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contact Us
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
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
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

      {/* Footer */}
      <footer
        style={{
          padding: '1.5rem 1rem',
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
