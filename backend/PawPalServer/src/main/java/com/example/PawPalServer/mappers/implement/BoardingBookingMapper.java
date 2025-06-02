package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.boarding.BoardingBookingDto;
import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BoardingBookingMapper implements Mapper<BoardingBookingDto, BoardingBooking> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BoardingBookingDto mapToDto(BoardingBooking boardingBooking) {
        return modelMapper.map(boardingBooking, BoardingBookingDto.class);
    }

    @Override
    public BoardingBooking mapToEntity(BoardingBookingDto boardingBookingDto) {
        return modelMapper.map(boardingBookingDto, BoardingBooking.class);
    }
}
