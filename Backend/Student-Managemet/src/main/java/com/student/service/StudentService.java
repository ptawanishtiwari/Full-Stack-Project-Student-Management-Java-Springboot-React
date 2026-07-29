package com.student.service;

import com.student.dto.request.StudentRequest;
import com.student.dto.response.StudentResponse;
import com.student.entity.Student;
import com.student.entity.User;
import com.student.repository.StudentRepository;
import com.student.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public StudentResponse createStudent(StudentRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Student student = Student.builder()
                .studentId(generateStudentId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .department(request.getDepartment())
                .course(request.getCourse())
                .dateOfBirth(request.getDateOfBirth())
                .address(request.getAddress())
                .parentName(request.getParentName())
                .parentPhone(request.getParentPhone())
                .parentEmail(request.getParentEmail())
                .gpa(0.0)
                .totalCredits(0)
                .enrollmentDate(LocalDate.now())
                .user(user)
                .build();
        
        studentRepository.save(student);
        return convertToResponse(student);
    }
    
    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return convertToResponse(student);
    }
    
    public StudentResponse getStudentByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return convertToResponse(student);
    }
    
    @Transactional
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setDepartment(request.getDepartment());
        student.setCourse(request.getCourse());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAddress(request.getAddress());
        student.setParentName(request.getParentName());
        student.setParentPhone(request.getParentPhone());
        student.setParentEmail(request.getParentEmail());
        
        studentRepository.save(student);
        return convertToResponse(student);
    }
    
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        studentRepository.delete(student);
    }
    
    public List<StudentResponse> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    private String generateStudentId() {
        return "STU-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private StudentResponse convertToResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .studentId(student.getStudentId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .department(student.getDepartment())
                .course(student.getCourse())
                .dateOfBirth(student.getDateOfBirth())
                .address(student.getAddress())
                .parentName(student.getParentName())
                .parentPhone(student.getParentPhone())
                .parentEmail(student.getParentEmail())
                .gpa(student.getGpa())
                .totalCredits(student.getTotalCredits())
                .enrollmentDate(student.getEnrollmentDate())
                .fullName(student.getUser().getFullName())
                .email(student.getUser().getEmail())
                .build();
    }
}