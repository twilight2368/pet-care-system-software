package com.example.PawPalServer.domains.dtos.auth;

import com.example.PawPalServer.domains.dtos.user.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private UserDto user;
    private JwtTokenDto jwt;
}
