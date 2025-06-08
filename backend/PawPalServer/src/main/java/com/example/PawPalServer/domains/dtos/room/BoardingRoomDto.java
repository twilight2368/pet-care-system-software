package com.example.PawPalServer.domains.dtos.room;

import com.example.PawPalServer.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardingRoomDto {
    private Integer roomId;
    private String roomNumber;
    private RoomType roomType;
}