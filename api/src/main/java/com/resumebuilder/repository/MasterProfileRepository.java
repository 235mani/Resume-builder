package com.resumebuilder.repository;

import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MasterProfileRepository extends JpaRepository<MasterProfile, Long> {

    Optional<MasterProfile> findByUser(User user);

    boolean existsByUser(User user);
}
