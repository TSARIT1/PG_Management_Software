package com.pgm.pgm_Backend.controller;

import com.pgm.pgm_Backend.model.Admin;
import com.pgm.pgm_Backend.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/hostels")
    public ResponseEntity<?> getAllHostelLocations() {
        try {
            List<Admin> admins = locationService.getAllHostelLocations();

            // Map to simplified response with only necessary fields
            List<Map<String, Object>> locations = admins.stream()
                    .map(admin -> {
                        Map<String, Object> location = new HashMap<>();
                        location.put("id", admin.getId());
                        location.put("name", admin.getName());
                        location.put("hostelAddress", admin.getHostelAddress());
                        location.put("latitude", admin.getLatitude());
                        location.put("longitude", admin.getLongitude());
                        location.put("phone", admin.getPhone());
                        location.put("email", admin.getEmail());
                        return location;
                    })
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Hostel locations retrieved successfully");
            response.put("data", locations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Failed to retrieve hostel locations: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
