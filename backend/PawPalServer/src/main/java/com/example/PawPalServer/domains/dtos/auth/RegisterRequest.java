package com.example.PawPalServer.domains.dtos.auth;

import com.example.PawPalServer.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String specialization;
    private UserRole role;
}
