package com.example.PawPalServer.domains.dtos.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtTokenDto {
    private String token;
    private String type = "Bearer";
}
