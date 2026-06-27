package com.resumebuilder.service.impl;

import com.resumebuilder.dto.request.MasterProfileRequest;
import com.resumebuilder.dto.response.MasterProfileResponse;
import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.User;
import com.resumebuilder.exception.ResourceAlreadyExistsException;
import com.resumebuilder.exception.ResourceNotFoundException;
import com.resumebuilder.repository.MasterProfileRepository;
import com.resumebuilder.repository.UserRepository;
import com.resumebuilder.service.CurrentUserService;
import com.resumebuilder.service.MasterProfileService;
import com.resumebuilder.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MasterProfileServiceImpl implements MasterProfileService {

    private final MasterProfileRepository masterProfileRepository;
    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;

    @Override
    public MasterProfileResponse createProfile(MasterProfileRequest request) {

        User user = currentUserService.getCurrentUser();

        if (masterProfileRepository.existsByUser(user)) {
            throw new ResourceAlreadyExistsException("Master Profile already exists.");
        }

        MasterProfile profile = new MasterProfile();

        profile.setUser(user);
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setLinkedin(request.getLinkedin());
        profile.setGithub(request.getGithub());
        profile.setPortfolio(request.getPortfolio());
        profile.setPhotoUrl(request.getPhotoUrl());

        MasterProfile savedProfile = masterProfileRepository.save(profile);

        return mapToResponse(savedProfile);
    }

    @Override
    public MasterProfileResponse getMyProfile() {

        User user = currentUserService.getCurrentUser();

        MasterProfile profile = currentUserService.getCurrentProfile();

        return mapToResponse(profile);
    }

    @Override
    public MasterProfileResponse updateProfile(MasterProfileRequest request) {

        User user = currentUserService.getCurrentUser();

        MasterProfile profile = currentUserService.getCurrentProfile();

        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setLinkedin(request.getLinkedin());
        profile.setGithub(request.getGithub());
        profile.setPortfolio(request.getPortfolio());
        profile.setPhotoUrl(request.getPhotoUrl());

        MasterProfile updatedProfile = masterProfileRepository.save(profile);

        return mapToResponse(updatedProfile);
    }


    private MasterProfileResponse mapToResponse(MasterProfile profile) {

        return MasterProfileResponse.builder()
                .id(profile.getId())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .location(profile.getLocation())
                .linkedin(profile.getLinkedin())
                .github(profile.getGithub())
                .portfolio(profile.getPortfolio())
                .photoUrl(profile.getPhotoUrl())
                .build();
    }
}