package com.skilltrack.backend.service;

import com.skilltrack.backend.entity.Internship;
import com.skilltrack.backend.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    private final InternshipRepository repository;

    public InternshipService(InternshipRepository repository) {
        this.repository = repository;
    }

    public Internship create(Internship internship) {
        return repository.save(internship);
    }

    public List<Internship> getAll() {
        return repository.findAll();
    }

    public Optional<Internship> getById(Long id) {
        return repository.findById(id);
    }

    public Internship update(Long id, Internship internship) {
        Internship existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        existing.setCompanyName(internship.getCompanyName());
        existing.setStudentName(internship.getStudentName());
        existing.setRole(internship.getRole());
        existing.setStartDate(internship.getStartDate());
        existing.setEndDate(internship.getEndDate());
        existing.setStatus(internship.getStatus());
        existing.setInternshipUrl(internship.getInternshipUrl());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}