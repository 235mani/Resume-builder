package com.resumebuilder.service;

import com.resumebuilder.dto.request.MasterProfileRequest;
import com.resumebuilder.dto.response.MasterProfileResponse;

public interface MasterProfileService {

    MasterProfileResponse createProfile(MasterProfileRequest request);

    MasterProfileResponse getMyProfile();

    MasterProfileResponse updateProfile(MasterProfileRequest request);
}
