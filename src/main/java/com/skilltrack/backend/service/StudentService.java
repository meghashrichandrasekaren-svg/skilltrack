package com.skilltrack.backend.service;

import com.skilltrack.backend.entity.Student;
import com.skilltrack.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existingStudent.setStudentName(student.getStudentName());
        existingStudent.setRegisterNumber(student.getRegisterNumber());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setYear(student.getYear());
        existingStudent.setSection(student.getSection());
        existingStudent.setCollegeName(student.getCollegeName());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }

        studentRepository.deleteById(id);
    }
}