package com.student.controller;

import com.student.dto.request.StudentRequest;
import com.student.dto.response.ApiResponse;
import com.student.dto.response.StudentResponse;
import com.student.entity.User;
import com.student.security.UserPrincipal;
import com.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    
    private final StudentService studentService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<StudentResponse>> createStudent(
            @Valid @RequestBody StudentRequest request) {
        User user = getCurrentUser();
        StudentResponse response = studentService.createStudent(request, user.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Student created successfully", response));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {
        List<StudentResponse> students = studentService.getAllStudents();
        return ResponseEntity.ok(new ApiResponse<>(true, "Students retrieved successfully", students));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(@PathVariable Long id) {
        StudentResponse student = studentService.getStudentById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Student retrieved successfully", student));
    }
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<StudentResponse>> getMyProfile() {
        User user = getCurrentUser();
        StudentResponse student = studentService.getStudentByUserId(user.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Student profile retrieved successfully", student));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.updateStudent(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Student updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Student deleted successfully", null));
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getStudentsByDepartment(
            @PathVariable String department) {
        List<StudentResponse> students = studentService.getStudentsByDepartment(department);
        return ResponseEntity.ok(new ApiResponse<>(true, "Students retrieved successfully", students));
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getUser();
    }
}