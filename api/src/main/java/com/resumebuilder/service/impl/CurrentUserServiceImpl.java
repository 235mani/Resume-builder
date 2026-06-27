package com.resumebuilder.service.impl;

import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.entity.User;
import com.resumebuilder.exception.ResourceNotFoundException;
import com.resumebuilder.repository.MasterProfileRepository;
import com.resumebuilder.repository.ResumeVersionRepository;
import com.resumebuilder.repository.UserRepository;
import com.resumebuilder.service.CurrentUserService;
import com.resumebuilder.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserServiceImpl implements CurrentUserService {

    private final UserRepository userRepository;
    private final MasterProfileRepository masterProfileRepository;
    private final ResumeVersionRepository resumeVersionRepository;

    @Override
    public User getCurrentUser() {

        String email = SecurityUtil.getLoggedInUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }

    @Override
    public MasterProfile getCurrentProfile() {

        User user = getCurrentUser();

        return masterProfileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Master Profile not found."));
    }

    @Override
    public ResumeVersion getOwnedResumeVersion(Long resumeVersionId) {

        User user = getCurrentUser();

        MasterProfile masterProfile = masterProfileRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Master Profile not found"));

        return resumeVersionRepository
                .findByIdAndMasterProfile(resumeVersionId, masterProfile)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Version not found"));
    }
}