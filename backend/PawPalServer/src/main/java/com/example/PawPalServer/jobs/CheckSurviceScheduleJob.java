package com.example.PawPalServer.jobs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CheckSurviceScheduleJob {

    @Scheduled(fixedRate = 10000) // every 10 seconds
    public void logHeartbeat() {
        log.info("PawPal server is still alive!");
    }
}
