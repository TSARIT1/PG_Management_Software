package com.pgm.pgm_Backend.repository;

import com.pgm.pgm_Backend.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Optional<Tenant> findByEmail(String email);
    Optional<Tenant> findByPhone(String phone);
    List<Tenant> findByStatus(String status);
    Optional<Tenant> findByRoomNumber(String roomNumber);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsByRoomNumber(String roomNumber);
}
