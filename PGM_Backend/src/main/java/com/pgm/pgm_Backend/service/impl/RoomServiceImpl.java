package com.pgm.pgm_Backend.service.impl;

import com.pgm.pgm_Backend.exception.ResourceNotFoundException;
import com.pgm.pgm_Backend.model.Room;
import com.pgm.pgm_Backend.repository.RoomRepository;
import com.pgm.pgm_Backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
    }

    @Override
    public Room createRoom(Room room) {
        if (roomRepository.existsByRoomNumber(room.getRoomNumber())) {
            throw new IllegalArgumentException("Room number already exists");
        }
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = getRoomById(id);

        if (roomDetails.getType() != null) {
            room.setType(roomDetails.getType());
        }
        if (roomDetails.getCapacity() != null) {
            room.setCapacity(roomDetails.getCapacity());
        }
        if (roomDetails.getOccupiedBeds() != null) {
            room.setOccupiedBeds(roomDetails.getOccupiedBeds());
        }
        if (roomDetails.getRent() != null) {
            room.setRent(roomDetails.getRent());
        }
        if (roomDetails.getStatus() != null) {
            room.setStatus(roomDetails.getStatus());
        }
        if (roomDetails.getDescription() != null) {
            room.setDescription(roomDetails.getDescription());
        }

        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }

    @Override
    public List<Room> getRoomsByStatus(String status) {
        return roomRepository.findByStatus(status);
    }

    @Override
    public List<Room> getRoomsByType(String type) {
        return roomRepository.findByType(type);
    }
}
