package com.resumebuilder.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MasterProfileRequest {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 100)
    private String location;

    private String linkedin;

    private String github;

    private String portfolio;

    private String photoUrl;
}
