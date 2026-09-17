package com.skilltrack.backend.controller;

import com.skilltrack.backend.entity.Internship;
import com.skilltrack.backend.service.InternshipService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipController {

    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Internship> create(
            @Valid @RequestBody Internship internship) {
        return new ResponseEntity<>(
                service.create(internship),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Internship>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Internship> update(
            @PathVariable Long id,
            @Valid @RequestBody Internship internship) {
        return ResponseEntity.ok(service.update(id, internship));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}