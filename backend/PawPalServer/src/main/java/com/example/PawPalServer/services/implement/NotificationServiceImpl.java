package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.Notification;
import com.example.PawPalServer.repositories.NotificationRepository;
import com.example.PawPalServer.services.interfaces.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> getNotificationByUserId(Integer id) {
        return notificationRepository.findByUser_userId(id);
    }

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public boolean isExist(Integer id) {
        return notificationRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        notificationRepository.deleteById(id);
    }
}
