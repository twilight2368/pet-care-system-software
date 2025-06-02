package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.entities.BoardingRoom;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BoardingRoomMapper implements Mapper<BoardingRoomDto, BoardingRoom> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BoardingRoomDto mapToDto(BoardingRoom boardingRoom) {
        return modelMapper.map(boardingRoom, BoardingRoomDto.class);
    }

    @Override
    public BoardingRoom mapToEntity(BoardingRoomDto boardingRoomDto) {
        return modelMapper.map(boardingRoomDto, BoardingRoom.class);
    }
}
