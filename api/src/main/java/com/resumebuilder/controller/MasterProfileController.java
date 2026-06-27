package com.resumebuilder.controller;

import com.resumebuilder.dto.request.MasterProfileRequest;
import com.resumebuilder.dto.response.MasterProfileResponse;
import com.resumebuilder.service.MasterProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class MasterProfileController {

    private final MasterProfileService masterProfileService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MasterProfileResponse createProfile(
            @Valid @RequestBody MasterProfileRequest request) {

        return masterProfileService.createProfile(request);
    }

    @GetMapping
    public MasterProfileResponse getMyProfile() {

        return masterProfileService.getMyProfile();
    }

    @PutMapping
    public MasterProfileResponse updateProfile(
            @Valid @RequestBody MasterProfileRequest request) {

        return masterProfileService.updateProfile(request);
    }
}