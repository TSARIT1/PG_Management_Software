package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String toEmail, String otp, String adminName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset OTP - PG/Hostel Management System");
        message.setText(String.format(
                "Hello %s,\n\n" +
                        "You have requested to reset your password.\n\n" +
                        "Your OTP code is: %s\n\n" +
                        "This OTP will expire in 10 minutes.\n\n" +
                        "If you did not request this password reset, please ignore this email.\n\n" +
                        "Best regards,\n" +
                        "PG/Hostel Management System",
                adminName, otp));

        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetConfirmation(String toEmail, String adminName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Successful - PG/Hostel Management System");
        message.setText(String.format(
                "Hello %s,\n\n" +
                        "Your password has been successfully reset.\n\n" +
                        "If you did not make this change, please contact support immediately.\n\n" +
                        "Best regards,\n" +
                        "PG/Hostel Management System",
                adminName));

        mailSender.send(message);
    }
}
