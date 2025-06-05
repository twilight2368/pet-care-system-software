package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.BoardingRoom;
import com.example.PawPalServer.repositories.BoardingRoomRepository;
import com.example.PawPalServer.services.interfaces.BoardingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardingRoomServiceImpl implements BoardingRoomService {

    @Autowired
    private BoardingRoomRepository boardingRoomRepository;

    @Override
    public List<BoardingRoom> getRooms() {
        return boardingRoomRepository.findAll();
    }

    @Override
    public BoardingRoom createRoom(BoardingRoom boardingRoom) {
        return boardingRoomRepository.save(boardingRoom);
    }
}
