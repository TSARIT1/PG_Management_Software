package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.exception.ResourceNotFoundException;
import com.pgm.pgm_Backend.model.Attendance;
import com.pgm.pgm_Backend.repository.AttendanceRepository;
import com.pgm.pgm_Backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public Attendance markAttendance(Attendance attendance) {
        // Check if attendance already exists for this student on this date
        var existing = attendanceRepository.findByStudentNameAndDate(
                attendance.getStudentName(),
                attendance.getDate());

        if (existing.isPresent()) {
            // Update existing attendance
            Attendance existingAttendance = existing.get();
            existingAttendance.setStatus(attendance.getStatus());
            existingAttendance.setNotes(attendance.getNotes());
            existingAttendance.setRoomNumber(attendance.getRoomNumber());
            return attendanceRepository.save(existingAttendance);
        }

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @Override
    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    @Override
    public List<Attendance> getAttendanceByStudent(String studentName) {
        return attendanceRepository.findByStudentName(studentName);
    }

    @Override
    public List<Attendance> getAttendanceByRoom(String roomNumber) {
        return attendanceRepository.findByRoomNumber(roomNumber);
    }

    @Override
    public List<Attendance> getAttendanceByStatus(String status) {
        return attendanceRepository.findByStatus(status);
    }

    @Override
    public Attendance updateAttendance(Long id, Attendance attendance) {
        Attendance existingAttendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        existingAttendance.setStudentName(attendance.getStudentName());
        existingAttendance.setRoomNumber(attendance.getRoomNumber());
        existingAttendance.setDate(attendance.getDate());
        existingAttendance.setStatus(attendance.getStatus());
        existingAttendance.setNotes(attendance.getNotes());

        return attendanceRepository.save(existingAttendance);
    }

    @Override
    public void deleteAttendance(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        attendanceRepository.delete(attendance);
    }

    @Override
    public List<Attendance> markBulkAttendance(List<Attendance> attendanceList) {
        List<Attendance> savedAttendance = new ArrayList<>();
        for (Attendance attendance : attendanceList) {
            savedAttendance.add(markAttendance(attendance));
        }
        return savedAttendance;
    }
}
