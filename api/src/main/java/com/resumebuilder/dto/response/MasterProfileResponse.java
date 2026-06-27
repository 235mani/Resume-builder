package com.resumebuilder.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MasterProfileResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String location;

    private String linkedin;

    private String github;

    private String portfolio;

    private String photoUrl;
}
