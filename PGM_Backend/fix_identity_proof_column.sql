-- Migration script to fix identity_proof column size issue
-- Run this SQL script in your MySQL database

USE pgm_database;

-- Drop the existing column if it exists with wrong type
ALTER TABLE tenants MODIFY COLUMN identity_proof LONGTEXT;

-- Verify the change
DESCRIBE tenants;
