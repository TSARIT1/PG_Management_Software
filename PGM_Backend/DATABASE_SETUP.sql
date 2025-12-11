-- PG Management System Database Setup
-- Run this script in MySQL to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS pgm_database;
USE pgm_database;

-- Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Tenants Table
CREATE TABLE IF NOT EXISTS tenants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    joining_date DATE NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL,
    capacity INT NOT NULL,
    occupied_beds INT NOT NULL DEFAULT 0,
    rent DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tenant_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    method VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_type VARCHAR(20) DEFAULT 'Monthly',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Indexes for better performance
CREATE INDEX idx_admin_email ON admins(email);
CREATE INDEX idx_admin_phone ON admins(phone);

CREATE INDEX idx_tenant_email ON tenants(email);
CREATE INDEX idx_tenant_phone ON tenants(phone);
CREATE INDEX idx_tenant_room_number ON tenants(room_number);
CREATE INDEX idx_tenant_status ON tenants(status);

CREATE INDEX idx_room_number ON rooms(room_number);
CREATE INDEX idx_room_type ON rooms(type);
CREATE INDEX idx_room_status ON rooms(status);

CREATE INDEX idx_payment_tenant ON payments(tenant_id);
CREATE INDEX idx_payment_status ON payments(status);
CREATE INDEX idx_payment_date ON payments(payment_date);

-- Insert Sample Data (Optional)
-- Sample Admin
INSERT INTO admins (name, email, phone, password) 
VALUES ('Admin User', 'admin@pgm.com', '9876543210', 'admin@123');

-- Sample Rooms
INSERT INTO rooms (room_number, type, capacity, occupied_beds, rent, status, description)
VALUES 
    ('101', 'Single', 1, 1, 10000.00, 'OCCUPIED', 'Single room with window view'),
    ('102', 'Double', 2, 2, 15000.00, 'OCCUPIED', 'Double room with attached bathroom'),
    ('103', 'Double', 2, 0, 12000.00, 'AVAILABLE', 'Recently renovated double room'),
    ('104', 'Single', 1, 0, 8000.00, 'AVAILABLE', 'Budget single room');

-- Sample Tenants
INSERT INTO tenants (name, age, phone, email, room_number, joining_date, address, status)
VALUES 
    ('Rajesh Kumar', 22, '9876543211', 'rajesh@email.com', '101', '2024-01-15', '123 Main Street, City', 'ACTIVE'),
    ('Priya Singh', 21, '9876543212', 'priya@email.com', '102', '2024-02-20', '456 Oak Avenue, City', 'ACTIVE');

-- Sample Payments
INSERT INTO payments (tenant_id, amount, payment_date, method, status, payment_type, notes)
VALUES 
    (1, 10000.00, '2024-12-01', 'TRANSFER', 'COMPLETED', 'Monthly', 'December rent payment'),
    (2, 15000.00, '2024-12-02', 'CASH', 'COMPLETED', 'Monthly', 'December rent payment');
