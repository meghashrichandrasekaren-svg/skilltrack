package com.skilltrack.backend.repository;

import com.skilltrack.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByRegisterNumber(String registerNumber);

    boolean existsByEmail(String email);
}