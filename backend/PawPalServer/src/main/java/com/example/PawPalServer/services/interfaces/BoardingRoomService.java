package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.BoardingRoom;

import java.util.List;

public interface BoardingRoomService {
    List<BoardingRoom> getRooms();
    BoardingRoom createRoom(BoardingRoom boardingRoom);
}
