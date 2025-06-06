package com.example.PawPalServer.jobs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class CheckSurviceScheduleJob {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Scheduled(fixedRate = 10000) // every 10 seconds
    public void logHeartbeat() {
        String currentTime = LocalDateTime.now().format(FORMATTER);
        log.info("PawPal server is still alive at {}!", currentTime);
    }
}
