package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.exception.ResourceNotFoundException;
import com.pgm.pgm_Backend.model.Tenant;
import com.pgm.pgm_Backend.repository.TenantRepository;
import com.pgm.pgm_Backend.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;

    @Override
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @Override
    public Tenant getTenantById(Long id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));
    }

    @Override
    public Tenant createTenant(Tenant tenant) {
        if (tenantRepository.existsByEmail(tenant.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (tenantRepository.existsByPhone(tenant.getPhone())) {
            throw new IllegalArgumentException("Phone number already exists");
        }
        // Room assignment validation removed - multiple tenants can share a room based
        // on capacity
        // The room capacity is managed separately in the Room entity
        return tenantRepository.save(tenant);
    }

    @Override
    public Tenant updateTenant(Long id, Tenant tenantDetails) {
        Tenant tenant = getTenantById(id);

        if (tenantDetails.getName() != null) {
            tenant.setName(tenantDetails.getName());
        }
        if (tenantDetails.getAge() != null) {
            tenant.setAge(tenantDetails.getAge());
        }
        if (tenantDetails.getGender() != null) {
            tenant.setGender(tenantDetails.getGender());
        }
        if (tenantDetails.getPhone() != null && !tenantDetails.getPhone().equals(tenant.getPhone())) {
            if (tenantRepository.existsByPhone(tenantDetails.getPhone())) {
                throw new IllegalArgumentException("Phone number already exists");
            }
            tenant.setPhone(tenantDetails.getPhone());
        }
        if (tenantDetails.getEmail() != null && !tenantDetails.getEmail().equals(tenant.getEmail())) {
            if (tenantRepository.existsByEmail(tenantDetails.getEmail())) {
                throw new IllegalArgumentException("Email already exists");
            }
            tenant.setEmail(tenantDetails.getEmail());
        }
        if (tenantDetails.getRoomNumber() != null) {
            tenant.setRoomNumber(tenantDetails.getRoomNumber());
        }
        if (tenantDetails.getAddress() != null) {
            tenant.setAddress(tenantDetails.getAddress());
        }
        if (tenantDetails.getJoiningDate() != null) {
            tenant.setJoiningDate(tenantDetails.getJoiningDate());
        }
        if (tenantDetails.getStatus() != null) {
            tenant.setStatus(tenantDetails.getStatus());
        }

        return tenantRepository.save(tenant);
    }

    @Override
    public void deleteTenant(Long id) {
        Tenant tenant = getTenantById(id);
        tenantRepository.delete(tenant);
    }

    @Override
    public List<Tenant> getTenantsByStatus(String status) {
        return tenantRepository.findByStatus(status);
    }
}
