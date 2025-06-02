package com.example.PawPalServer.domains.dtos.auth;

import lombok.Builder;
import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
