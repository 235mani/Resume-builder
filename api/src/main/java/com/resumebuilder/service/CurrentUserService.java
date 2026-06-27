package com.resumebuilder.service;

import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.entity.User;

public interface CurrentUserService {

    User getCurrentUser();

    MasterProfile getCurrentProfile();

    ResumeVersion getOwnedResumeVersion(Long resumeVersionId);
}