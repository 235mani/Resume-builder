package com.resumebuilder.skill.repository;

import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByResumeVersionOrderByDisplayOrderAsc(
            ResumeVersion resumeVersion);

    Optional<Skill> findByIdAndResumeVersion(
            Long id,
            ResumeVersion resumeVersion);

}
