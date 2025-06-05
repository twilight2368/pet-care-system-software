package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.Notification;

import java.util.List;

public interface NotificationService {
     List<Notification> getNotificationByUserId(Integer id);
     Notification createNotification(Notification notification);
     Notification updateNotification(Notification notification);
     boolean isExist(Integer id);
     void delete(Integer id);
}
