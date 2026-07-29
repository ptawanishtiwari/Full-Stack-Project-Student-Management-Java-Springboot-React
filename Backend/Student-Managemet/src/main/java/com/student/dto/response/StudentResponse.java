package com.student.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    private Long id;
    private String studentId;
    private String firstName;
    private String lastName;
    private String department;
    private String course;
    private LocalDate dateOfBirth;
    private String address;
    private String parentName;
    private String parentPhone;
    private String parentEmail;
    private double gpa;
    private int totalCredits;
    private LocalDate enrollmentDate;
    private String fullName;
    private String email;
}