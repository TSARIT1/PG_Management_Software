package com.pgm.pgm_Backend.repository;

import com.pgm.pgm_Backend.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByDate(LocalDate date);

    List<Attendance> findByStudentName(String studentName);

    List<Attendance> findByRoomNumber(String roomNumber);

    List<Attendance> findByStatus(String status);

    Optional<Attendance> findByStudentNameAndDate(String studentName, LocalDate date);

    List<Attendance> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
