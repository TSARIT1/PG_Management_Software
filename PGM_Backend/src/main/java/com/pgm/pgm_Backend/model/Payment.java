package com.pgm.pgm_Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // tenantId is optional from frontend; keep for associations but not required
    @Column(nullable = true)
    private Long tenantId;

    @NotBlank(message = "Student is required")
    @Column(nullable = false)
    @JsonAlias({ "Student", "student" })
    private String student;

    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @NotNull(message = "Amount is required")
    @Column(nullable = false)
    @JsonAlias({ "Amount", "amount" })
    private Double amount;

    @NotNull(message = "Payment date cannot be null")
    @Column(nullable = false)
    @JsonAlias({ "Date", "date", "paymentDate" })
    private LocalDate paymentDate;

    @NotBlank(message = "Payment method cannot be blank")
    @Column(nullable = false)
    @JsonAlias({ "Method", "method" })
    private String method;

    // status comes from backend business logic; make optional for frontend payloads
    @Column(nullable = true)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "transaction_details", columnDefinition = "TEXT")
    private String transactionDetails;

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = "COMPLETED";
        }
        // Auto-generate transaction ID if not provided
        if (transactionId == null || transactionId.trim().isEmpty()) {
            transactionId = generateTransactionId();
        }
        // Auto-generate transaction details if not provided
        if (transactionDetails == null || transactionDetails.trim().isEmpty()) {
            transactionDetails = String.format("Payment of ₹%.2f by %s via %s on %s",
                    amount, student, method, paymentDate);
        }
    }

    private String generateTransactionId() {
        // Generate unique transaction ID: TXN + timestamp + random number
        long timestamp = System.currentTimeMillis();
        int random = (int) (Math.random() * 10000);
        return String.format("TXN%d%04d", timestamp, random);
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
