package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.notification.NotificationDto;
import com.example.PawPalServer.domains.entities.Notification;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper implements Mapper<NotificationDto, Notification> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public NotificationDto mapToDto(Notification notification) {
        return modelMapper.map(notification, NotificationDto.class);
    }

    @Override
    public Notification mapToEntity(NotificationDto notificationDto) {
        return modelMapper.map(notificationDto, Notification.class);
    }


}
