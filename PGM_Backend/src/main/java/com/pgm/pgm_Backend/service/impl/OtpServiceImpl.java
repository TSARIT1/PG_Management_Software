package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.model.OtpVerification;
import com.pgm.pgm_Backend.repository.OtpRepository;
import com.pgm.pgm_Backend.service.EmailService;
import com.pgm.pgm_Backend.service.OtpService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    @Override
    @Transactional
    public String generateAndSendOtp(String email, String adminName) {
        // Delete any existing OTPs for this email
        otpRepository.deleteByEmail(email);

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));

        // Create OTP verification record
        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmail(email);
        otpVerification.setOtp(otp);
        otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otpVerification.setVerified(false);

        otpRepository.save(otpVerification);

        // Send OTP via email
        emailService.sendOtpEmail(email, otp, adminName);

        return otp;
    }

    @Override
    @Transactional
    public boolean verifyOtp(String email, String otp) {
        var otpVerificationOpt = otpRepository.findByEmailAndOtp(email, otp);

        if (otpVerificationOpt.isEmpty()) {
            return false;
        }

        OtpVerification otpVerification = otpVerificationOpt.get();

        // Check if OTP is expired
        if (otpVerification.isExpired()) {
            return false;
        }

        // Check if already verified
        if (otpVerification.getVerified()) {
            return false;
        }

        // Mark as verified
        otpVerification.setVerified(true);
        otpRepository.save(otpVerification);

        return true;
    }

    @Override
    public boolean isOtpVerified(String email, String otp) {
        var otpVerificationOpt = otpRepository.findByEmailAndOtp(email, otp);

        if (otpVerificationOpt.isEmpty()) {
            return false;
        }

        OtpVerification otpVerification = otpVerificationOpt.get();

        // Check if OTP is expired
        if (otpVerification.isExpired()) {
            return false;
        }

        // Check if it's verified
        return otpVerification.getVerified();
    }

    @Override
    @Transactional
    public void cleanupExpiredOtps() {
        otpRepository.deleteByExpiryTimeBefore(LocalDateTime.now());
    }
}
