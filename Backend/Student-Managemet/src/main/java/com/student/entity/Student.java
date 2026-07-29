package com.student.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
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
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}