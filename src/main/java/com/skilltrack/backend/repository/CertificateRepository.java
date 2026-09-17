package com.skilltrack.backend.repository;

import com.skilltrack.backend.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository
        extends JpaRepository<Certificate, Long> {
}