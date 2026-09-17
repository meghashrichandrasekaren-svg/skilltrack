package com.skilltrack.backend.service;

import com.skilltrack.backend.entity.Certificate;
import com.skilltrack.backend.repository.CertificateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificateService {

    private final CertificateRepository repository;

    public CertificateService(CertificateRepository repository) {
        this.repository = repository;
    }

    public Certificate create(Certificate certificate) {
        return repository.save(certificate);
    }

    public List<Certificate> getAll() {
        return repository.findAll();
    }

    public Optional<Certificate> getById(Long id) {
        return repository.findById(id);
    }

    public Certificate update(Long id, Certificate certificate) {

        Certificate existing = repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Certificate not found"
                        )
                );

        existing.setCertificateName(
                certificate.getCertificateName()
        );

        existing.setStudentName(
                certificate.getStudentName()
        );

        existing.setIssuingOrganization(
                certificate.getIssuingOrganization()
        );

        existing.setIssueDate(
                certificate.getIssueDate()
        );

        /*
         * Update image only when a new image is provided.
         * This prevents the old image from disappearing
         * when editing other certificate details.
         */
        if (certificate.getCertificateImage() != null
                && !certificate.getCertificateImage().isEmpty()) {

            existing.setCertificateImage(
                    certificate.getCertificateImage()
            );
        }

        return repository.save(existing);
    }

    public void delete(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Certificate not found"
            );
        }

        repository.deleteById(id);
    }
}