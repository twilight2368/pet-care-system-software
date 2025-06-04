package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.dtos.auth.LoginRequest;
import com.example.PawPalServer.domains.dtos.auth.LoginResponse;

import java.util.Optional;

public interface AuthService {
    Optional<LoginResponse> login(LoginRequest loginRequest);
}
