-- Add new columns to admins table for profile management
-- Run this SQL script in your MySQL database

ALTER TABLE admins 
ADD COLUMN date_of_birth DATE NULL AFTER phone,
ADD COLUMN photo_url VARCHAR(255) NULL AFTER date_of_birth;

-- Verify the changes
DESCRIBE admins;
