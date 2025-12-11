package com.pgm.pgm_Backend.service;

public interface EmailService {

    void sendOtpEmail(String toEmail, String otp, String adminName);

    void sendPasswordResetConfirmation(String toEmail, String adminName);
}
