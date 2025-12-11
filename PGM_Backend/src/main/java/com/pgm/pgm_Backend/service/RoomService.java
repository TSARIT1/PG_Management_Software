package com.pgm.pgm_Backend.service;

import com.pgm.pgm_Backend.model.Room;

import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(Long id);
    Room createRoom(Room room);
    Room updateRoom(Long id, Room room);
    void deleteRoom(Long id);
    List<Room> getRoomsByStatus(String status);
    List<Room> getRoomsByType(String type);
}
