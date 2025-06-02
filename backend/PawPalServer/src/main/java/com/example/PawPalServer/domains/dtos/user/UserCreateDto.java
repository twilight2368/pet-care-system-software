package com.example.PawPalServer.domains.dtos.user;

import com.example.PawPalServer.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreateDto {

    private String username;

    private String password;  // Raw password to be hashed before saving

    private String email;

    private String phone;

    private String fullName;

    private UserRole role;

    private String specialization;
}
