package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.exception.ResourceNotFoundException;
import com.pgm.pgm_Backend.model.Admin;
import com.pgm.pgm_Backend.repository.AdminRepository;
import com.pgm.pgm_Backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public Admin register(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public Admin login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return admin;
    }

    @Override
    public Admin getById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
    }

    @Override
    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = getById(id);

        if (adminDetails.getName() != null) {
            admin.setName(adminDetails.getName());
        }
        if (adminDetails.getPhone() != null) {
            admin.setPhone(adminDetails.getPhone());
        }
        if (adminDetails.getPassword() != null) {
            admin.setPassword(passwordEncoder.encode(adminDetails.getPassword()));
        }

        return adminRepository.save(admin);
    }

    @Override
    public void deleteAdmin(Long id) {
        Admin admin = getById(id);
        adminRepository.delete(admin);
    }

    @Override
    public Admin getProfile() {
        // Get the currently authenticated user's email from SecurityContext
        String email = org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email));
    }

    @Override
    public Admin updateProfile(Admin adminDetails) {
        Admin admin = getProfile();

        if (adminDetails.getName() != null) {
            admin.setName(adminDetails.getName());
        }
        // Only update email if it's different from current email
        if (adminDetails.getEmail() != null && !adminDetails.getEmail().equals(admin.getEmail())) {
            // Check if new email is already taken by another admin
            Optional<Admin> existingAdmin = adminRepository.findByEmail(adminDetails.getEmail());
            if (existingAdmin.isPresent() && !existingAdmin.get().getId().equals(admin.getId())) {
                throw new IllegalArgumentException("Email already in use");
            }
            admin.setEmail(adminDetails.getEmail());
        }
        if (adminDetails.getPhone() != null) {
            admin.setPhone(adminDetails.getPhone());
        }
        if (adminDetails.getDateOfBirth() != null) {
            admin.setDateOfBirth(adminDetails.getDateOfBirth());
        }
        if (adminDetails.getHostelAddress() != null) {
            admin.setHostelAddress(adminDetails.getHostelAddress());
        }
        if (adminDetails.getPassword() != null && !adminDetails.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(adminDetails.getPassword()));
        }

        return adminRepository.save(admin);
    }

    @Override
    public String uploadPhoto(org.springframework.web.multipart.MultipartFile file) {
        Admin admin = getProfile();

        try {
            // Create uploads directory if it doesn't exist
            java.nio.file.Path uploadPath = java.nio.file.Paths.get("uploads/admin-photos");
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }

            // Delete old photo if exists
            if (admin.getPhotoUrl() != null && !admin.getPhotoUrl().isEmpty()) {
                deletePhotoFile(admin.getPhotoUrl());
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".jpg";
            String filename = "admin_" + admin.getId() + "_" + System.currentTimeMillis() + extension;

            // Save file
            java.nio.file.Path filePath = uploadPath.resolve(filename);
            java.nio.file.Files.copy(file.getInputStream(), filePath,
                    java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // Update admin photo URL
            String photoUrl = "/uploads/admin-photos/" + filename;
            admin.setPhotoUrl(photoUrl);
            adminRepository.save(admin);

            return photoUrl;
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload photo: " + e.getMessage());
        }
    }

    @Override
    public void deletePhoto() {
        Admin admin = getProfile();

        if (admin.getPhotoUrl() != null && !admin.getPhotoUrl().isEmpty()) {
            deletePhotoFile(admin.getPhotoUrl());
            admin.setPhotoUrl(null);
            adminRepository.save(admin);
        }
    }

    private void deletePhotoFile(String photoUrl) {
        try {
            java.nio.file.Path filePath = java.nio.file.Paths.get("uploads/admin-photos")
                    .resolve(photoUrl.substring(photoUrl.lastIndexOf("/") + 1));
            java.nio.file.Files.deleteIfExists(filePath);
        } catch (Exception e) {
            // Log error but don't throw exception
            System.err.println("Failed to delete photo file: " + e.getMessage());
        }
    }

    @Override
    public Admin getByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email));
    }

    @Override
    public Admin resetPassword(String email, String newPassword) {
        Admin admin = getByEmail(email);
        admin.setPassword(passwordEncoder.encode(newPassword));
        return adminRepository.save(admin);
    }

    @Override
    public java.util.List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
