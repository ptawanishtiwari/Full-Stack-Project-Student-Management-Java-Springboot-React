package com.student.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {
    
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(
            HttpStatus.NOT_FOUND,
            String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue),
            "RESOURCE_NOT_FOUND"
        );
    }
    
    public ResourceNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message, "RESOURCE_NOT_FOUND");
    }
    
    // Common factory methods
    public static ResourceNotFoundException userNotFound(Long userId) {
        return new ResourceNotFoundException("User", "id", userId);
    }
    
    public static ResourceNotFoundException userNotFound(String email) {
        return new ResourceNotFoundException("User", "email", email);
    }
    
    public static ResourceNotFoundException studentNotFound(Long studentId) {
        return new ResourceNotFoundException("Student", "id", studentId);
    }
    
    public static ResourceNotFoundException studentNotFound(String studentId) {
        return new ResourceNotFoundException("Student", "studentId", studentId);
    }
    
    public static ResourceNotFoundException roleNotFound(String roleName) {
        return new ResourceNotFoundException("Role", "name", roleName);
    }
}