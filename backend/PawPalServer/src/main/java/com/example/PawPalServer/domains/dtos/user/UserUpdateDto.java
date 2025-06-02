package com.example.PawPalServer.domains.dtos.user;

import com.example.PawPalServer.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDto {
    private Integer userId;
    private String email;
    private String phone;
    private String fullName;
    private UserRole role;
    private String specialization;
    private Boolean isLock;
}
