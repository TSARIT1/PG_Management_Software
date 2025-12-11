package com.pgm.pgm_Backend.service;

import com.pgm.pgm_Backend.model.Staff;
import com.pgm.pgm_Backend.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Staff not found"));
    }

    public Staff createStaff(Staff staff) {
        // Basic uniqueness checks
        if (staffRepository.findByUsername(staff.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (staffRepository.findByEmail(staff.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff staff) {
        Staff existing = getStaffById(id);
        existing.setUsername(staff.getUsername());
        existing.setEmail(staff.getEmail());
        existing.setPhone(staff.getPhone());
        existing.setRole(staff.getRole());
        return staffRepository.save(existing);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}
