package com.resumebuilder.service;

import com.resumebuilder.dto.request.ResumeVersionRequest;
import com.resumebuilder.dto.response.ResumeVersionResponse;
import java.util.List;


public interface ResumeVersionService {

    ResumeVersionResponse create(ResumeVersionRequest request);

    List<ResumeVersionResponse> getAll();

    ResumeVersionResponse getById(Long resumeVersionId);

    ResumeVersionResponse update(Long resumeVersionId, ResumeVersionRequest request);

    void delete(Long resumeVersionId);

    ResumeVersionResponse publish(Long resumeVersionId);

    ResumeVersionResponse unpublish(Long resumeVersionId);
}