package com.example.PawPalServer.controllers;


import com.example.PawPalServer.domains.dtos.notification.NotificationDto;
import com.example.PawPalServer.domains.entities.Notification;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private Mapper<NotificationDto, Notification> notificationMapper;

    @GetMapping("/api/notification/{id}")
    public ResponseEntity<List<NotificationDto>> getNotification(@PathVariable("id") Integer id){
        List<Notification> results = notificationService.getNotificationByUserId(id);
        return new ResponseEntity<>(results.stream().map(notificationMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @PutMapping("/api/notification/{id}")
    public ResponseEntity<NotificationDto> updateNotification(@PathVariable("id") Integer id, @RequestBody NotificationDto notificationDto){
        if (notificationService.isExist(id)){
            Notification updated = notificationService.updateNotification(notificationMapper.mapToEntity(notificationDto));
            return new ResponseEntity<>(notificationMapper.mapToDto(updated), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
