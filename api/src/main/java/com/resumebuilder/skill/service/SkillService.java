package com.resumebuilder.skill.service;

import com.resumebuilder.skill.dto.CreateSkillRequest;
import com.resumebuilder.skill.dto.SkillResponse;
import com.resumebuilder.skill.dto.UpdateSkillRequest;

import java.util.List;

public interface SkillService {

    SkillResponse create(Long resumeVersionId, CreateSkillRequest request);

    List<SkillResponse> getAll(Long resumeVersionId);

    SkillResponse getById(Long resumeVersionId, Long skillId);

    SkillResponse update(Long resumeVersionId,
                         Long skillId,
                         UpdateSkillRequest request);

    void delete(Long resumeVersionId, Long skillId);
}
