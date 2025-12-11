package com.pgm.pgm_Backend.repository;

import com.pgm.pgm_Backend.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByTenantId(Long tenantId);
    List<Payment> findByStatus(String status);
    List<Payment> findByPaymentDateBetween(LocalDate startDate, LocalDate endDate);
    List<Payment> findByTenantIdAndStatus(Long tenantId, String status);
    List<Payment> findByStudent(String student);
    List<Payment> findByMethod(String method);
}
