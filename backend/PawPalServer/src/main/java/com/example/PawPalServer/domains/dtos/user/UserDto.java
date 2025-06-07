package com.example.PawPalServer.domains.dtos.user;

import com.example.PawPalServer.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Integer userId;
    private String username;
    private String email;
    private String phone;
    private String fullName;
    private UserRole role;
    private String specialization;
    private Boolean isLock = false;
}
