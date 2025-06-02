package com.example.PawPalServer.domains.dtos.notification;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationDto {
    private Integer notificationId;
    private UserDto user;
    private PetDto pet;
    private String message;
    private NotificationType notificationType;
    private LocalDateTime sentAt;
    private Boolean isRead;
}
