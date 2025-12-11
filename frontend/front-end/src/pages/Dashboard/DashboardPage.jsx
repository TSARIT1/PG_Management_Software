import React from 'react'
import { motion } from 'framer-motion'
import StatCard from '../../components/common/StatCard'
import {
  FiUsers,
  FiTrendingUp,
  FiGrid,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiClock,
  FiUser,
  FiUserCheck,
  FiUserX,
} from 'react-icons/fi'

export default function DashboardPage() {
  const statsRow1 = [
    { icon: FiUsers, value: '0', label: 'Total Students', color: 'blue' },
    { icon: FiTrendingUp, value: '0', label: 'Total Staff', color: 'green' },
    { icon: FiGrid, value: '0', label: 'Total Rooms', color: 'teal' },
    { icon: FiCheckCircle, value: '0', label: 'Occupied Rooms', color: 'orange' },
    { icon: FiAlertCircle, value: '0', label: 'Available Rooms', color: 'green' },
  ]

  const statsRow2 = [
    { icon: FiDollarSign, value: '₹0', label: 'Total Revenue', color: 'blue' },
    { icon: FiClock, value: '₹0', label: "This Month's Revenue", color: 'blue' },
    { icon: FiUserCheck, value: '0', label: 'Present Today', color: 'green' },
    { icon: FiUserX, value: '0', label: 'Absent Today', color: 'red' },
    { icon: FiGrid, value: '0', label: 'Full Rooms', color: 'orange' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated Header */}
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
        <h1 className="page-title" style={{ color: 'white' }}>Dashboard Overview</h1>
        <p className="page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Welcome to your hostel management dashboard</p>
      </motion.div>

      {/* Row 1 */}
      <motion.div
        className="grid-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '2rem' }}
      >
        {statsRow1.map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <StatCard
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div
        className="grid-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statsRow2.map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <StatCard
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
