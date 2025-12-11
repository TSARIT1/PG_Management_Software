package com.pgm.pgm_Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin admin; // The PG/Hostel owner

    @Column(name = "candidate_name", nullable = false)
    private String candidateName;

    @Column(name = "candidate_phone", nullable = false)
    private String candidatePhone;

    @Column(name = "candidate_email", nullable = false)
    private String candidateEmail;

    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime appointmentDate;

    @Column(name = "message")
    private String message;

    @Column(name = "status")
    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
