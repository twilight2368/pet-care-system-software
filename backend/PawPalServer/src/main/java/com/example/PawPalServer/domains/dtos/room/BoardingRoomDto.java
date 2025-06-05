package com.example.PawPalServer.domains.dtos.room;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardingRoomDto {
    private Integer roomId;
    private String roomNumber;
}