package com.skilltrack.backend.controller;

import com.skilltrack.backend.entity.Certificate;
import com.skilltrack.backend.service.CertificateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificateController {

    private final CertificateService service;

    public CertificateController(
            CertificateService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Certificate> create(
            @Valid @RequestBody Certificate certificate) {

        Certificate saved =
                service.create(certificate);

        return new ResponseEntity<>(
                saved,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificate> getById(
            @PathVariable Long id) {

        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificate> update(
            @PathVariable Long id,
            @Valid @RequestBody Certificate certificate) {

        return ResponseEntity.ok(
                service.update(id, certificate)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}