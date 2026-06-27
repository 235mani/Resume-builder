package com.resumebuilder.repository;

import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.ResumeVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeVersionRepository extends JpaRepository<ResumeVersion, Long> {

    List<ResumeVersion> findByMasterProfile(MasterProfile masterProfile);

    Optional<ResumeVersion> findByMasterProfileAndSlug(
            MasterProfile masterProfile,
            String slug
    );

    boolean existsByMasterProfileAndSlug(
            MasterProfile masterProfile,
            String slug
    );

    Optional<ResumeVersion> findByIdAndMasterProfile(
            Long id,
            MasterProfile masterProfile
    );
}