package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.exception.ResourceNotFoundException;
import com.pgm.pgm_Backend.model.Payment;
import com.pgm.pgm_Backend.repository.PaymentRepository;
import com.pgm.pgm_Backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }

    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = getPaymentById(id);

        if (paymentDetails.getAmount() != null) {
            payment.setAmount(paymentDetails.getAmount());
        }
        if (paymentDetails.getPaymentDate() != null) {
            payment.setPaymentDate(paymentDetails.getPaymentDate());
        }
        if (paymentDetails.getMethod() != null) {
            payment.setMethod(paymentDetails.getMethod());
        }
        if (paymentDetails.getStatus() != null) {
            payment.setStatus(paymentDetails.getStatus());
        }

        if (paymentDetails.getNotes() != null) {
            payment.setNotes(paymentDetails.getNotes());
        }

        return paymentRepository.save(payment);
    }

    @Override
    public void deletePayment(Long id) {
        Payment payment = getPaymentById(id);
        paymentRepository.delete(payment);
    }

    @Override
    public List<Payment> getPaymentsByTenantId(Long tenantId) {
        return paymentRepository.findByTenantId(tenantId);
    }

    @Override
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    public List<Payment> getPaymentsByDateRange(LocalDate startDate, LocalDate endDate) {
        return paymentRepository.findByPaymentDateBetween(startDate, endDate);
    }

    @Override
    public List<Payment> getPaymentsByStudent(String student) {
        return paymentRepository.findByStudent(student);
    }

    @Override
    public List<Payment> getPaymentsByMethod(String method) {
        return paymentRepository.findByMethod(method);
    }
}
