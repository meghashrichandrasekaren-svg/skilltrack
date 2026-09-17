package com.skilltrack.backend.repository;

import com.skilltrack.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
}