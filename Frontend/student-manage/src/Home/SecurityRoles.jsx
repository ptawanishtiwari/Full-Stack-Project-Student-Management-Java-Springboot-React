import React, { useState } from 'react';

const SecurityRoles = () => {
  const [selectedRole, setSelectedRole] = useState('admin');

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      icon: 'bi-shield-lock-fill',
      color: 'danger',
      gradient: 'ai-gradient-admin',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      description: 'Full system access with complete control over all features and user management.',
      features: [
        'Full system access and control',
        'Manage all users and roles',
        'View all student records',
        'System configuration',
        'Generate reports',
        'Access audit logs'
      ],
      permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage'],
      badge: 'Super Admin',
      badgeColor: 'danger',
      stats: { users: '1,284', departments: '12', reports: '456' }
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: 'bi-person-badge-fill',
      color: 'primary',
      gradient: 'ai-gradient-teacher',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&crop=center',
      description: 'Manage classes, grade students, and track academic progress with limited administrative access.',
      features: [
        'Manage assigned classes',
        'Grade student assignments',
        'View student profiles',
        'Track attendance',
        'Create course materials',
        'Communicate with students'
      ],
      permissions: ['Create', 'Read', 'Update'],
      badge: 'Faculty',
      badgeColor: 'primary',
      stats: { students: '45', classes: '6', assignments: '23' }
    },
    {
      id: 'student',
      title: 'Student',
      icon: 'bi-mortarboard-fill',
      color: 'success',
      gradient: 'ai-gradient-student',
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop&crop=center',
      description: 'Access personal records, view grades, register for courses, and track academic progress.',
      features: [
        'View personal profile',
        'Check grades and transcripts',
        'Register for courses',
        'View class schedule',
        'Submit assignments',
        'Access learning materials'
      ],
      permissions: ['Read'],
      badge: 'Learner',
      badgeColor: 'success',
      stats: { courses: '5', assignments: '12', gpa: '3.8' }
    }
  ];

  const getPermissionIcon = (permission) => {
    const icons = {
      'Create': 'bi-plus-circle',
      'Read': 'bi-eye',
      'Update': 'bi-pencil-square',
      'Delete': 'bi-trash',
      'Manage': 'bi-gear'
    };
    return icons[permission] || 'bi-circle';
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          <i className="bi bi-shield-check me-2" style={{ WebkitTextFillColor: '#667eea' }}></i>
          Security & Role Management
        </h2>
        <p className="text-muted mb-3">Role-based access control for secure authentication</p>
        
        {/* Security Badges */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <span className="badge bg-success bg-opacity-10 text-success py-2 px-3 rounded-pill">
            <i className="bi bi-shield-fill-check me-1"></i> 256-bit Encryption
          </span>
          <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
            <i className="bi bi-clock-history me-1"></i> Session Management
          </span>
          <span className="badge bg-warning bg-opacity-10 text-warning py-2 px-3 rounded-pill">
            <i className="bi bi-fingerprint me-1"></i> MFA Enabled
          </span>
          <span className="badge bg-info bg-opacity-10 text-info py-2 px-3 rounded-pill">
            <i className="bi bi-shield-plus me-1"></i> Role-Based Access
          </span>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`btn rounded-pill px-4 py-2 fw-semibold transition-all ${
              selectedRole === role.id 
                ? `btn-${role.color} shadow` 
                : 'btn-outline-secondary'
            }`}
            onClick={() => setSelectedRole(role.id)}
            style={{
              transform: selectedRole === role.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          >
            <i className={`bi ${role.icon} me-2`}></i>
            {role.title}
            {selectedRole === role.id && (
              <span className="ms-2">
                <i className="bi bi-check-circle-fill"></i>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Role Details Card */}
      <div className="row justify-content-center">
        {roles.map((role) => (
          <div key={role.id} className="col-lg-10">
            <div 
              className={`card border-0 shadow-lg rounded-4 overflow-hidden transition-all ${
                selectedRole === role.id ? 'ai-card-active' : 'ai-card-inactive'
              }`}
              style={{
                opacity: selectedRole === role.id ? 1 : 0.6,
                transform: selectedRole === role.id ? 'scale(1)' : 'scale(0.98)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: selectedRole === role.id ? 'block' : 'none'
              }}
            >
              <div className="row g-0">
                {/* Left Column - Image & Overview */}
                <div className="col-md-5 position-relative">
                  <div className="h-100" style={{ minHeight: '400px', overflow: 'hidden' }}>
                    <img 
                      src={role.image} 
                      alt={role.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    {/* Overlay */}
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
                    }}></div>
                    
                    {/* Icon */}
                    <div className="position-absolute top-0 start-0 m-4">
                      <div className={`${role.gradient} rounded-4 p-3 shadow-lg`} style={{ width: '70px', height: '70px' }}>
                        <i className={`bi ${role.icon} fs-1 text-white`}></i>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="position-absolute top-0 end-0 m-4">
                      <span className={`badge bg-${role.badgeColor} text-white px-4 py-2 rounded-pill shadow-lg`}>
                        <i className="bi bi-star-fill me-2"></i>
                        {role.badge}
                      </span>
                    </div>

                    {/* Stats on Image */}
                    <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
                      <h2 className="display-5 fw-bold mb-2">{role.title}</h2>
                      <p className="mb-3 opacity-75">{role.description}</p>
                      <div className="d-flex gap-4">
                        {Object.entries(role.stats).map(([key, value]) => (
                          <div key={key}>
                            <span className="d-block h4 fw-bold mb-0">{value}</span>
                            <span className="small opacity-75 text-capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features & Permissions */}
                <div className="col-md-7">
                  <div className="card-body p-4">
                    {/* Permissions Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold text-dark mb-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Access Permissions
                      </h4>
                      <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                        <i className="bi bi-people me-1"></i> {role.permissions.length} permissions
                      </span>
                    </div>

                    {/* Permission Badges */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {role.permissions.map((perm) => (
                        <span key={perm} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                          <i className={`${getPermissionIcon(perm)} me-1`}></i>
                          {perm}
                        </span>
                      ))}
                    </div>

                    {/* Features List */}
                    <h6 className="fw-bold text-dark mb-3">
                      <i className="bi bi-list-check me-2"></i>
                      Features & Capabilities
                    </h6>
                    <div className="row g-2 mb-4">
                      {role.features.map((feature, idx) => (
                        <div className="col-md-6" key={idx}>
                          <div className="d-flex align-items-center bg-light rounded-3 p-2 hover-feature">
                            <i className="bi bi-check-circle-fill text-primary me-2"></i>
                            <span className="small">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Security & Action Footer */}
                    <div className="pt-3 border-top">
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        {/* Security Icons */}
                        <div className="d-flex gap-3">
                          <span className="text-muted small">
                            <i className="bi bi-shield-lock text-success me-1"></i>
                            Encrypted
                          </span>
                          <span className="text-muted small">
                            <i className="bi bi-clock text-info me-1"></i>
                            Session: 24h
                          </span>
                          <span className="text-muted small">
                            <i className="bi bi-fingerprint text-warning me-1"></i>
                            2FA Ready
                          </span>
                        </div>
                        
                        {/* Action Button */}
                        {/* <button className={`btn btn-${role.color} rounded-pill px-4 ai-btn-${role.color}`}>
                          <i className="bi bi-key me-2"></i>
                          Access {role.title} Dashboard
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <div className="row g-4 mt-4">
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 hover-card">
            <h3 className="text-primary mb-1">3</h3>
            <p className="text-muted small mb-0">Roles Managed</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 hover-card">
            <h3 className="text-success mb-1">12</h3>
            <p className="text-muted small mb-0">Permissions</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 hover-card">
            <h3 className="text-warning mb-1">100%</h3>
            <p className="text-muted small mb-0">Security Score</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 hover-card">
            <h3 className="text-danger mb-1">256-bit</h3>
            <p className="text-muted small mb-0">Encryption</p>
          </div>
        </div>
      </div>

      <style>{`
        /* AI Gradients */
        .ai-gradient-admin {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .ai-gradient-teacher {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .ai-gradient-student {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .ai-card-active {
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3) !important;
        }

        .hover-feature {
          transition: all 0.2s ease;
          cursor: default;
        }

        .hover-feature:hover {
          background: #e9ecef !important;
          transform: translateX(4px);
        }

        .hover-card {
          transition: all 0.3s ease;
          cursor: default;
        }

        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08) !important;
        }

        /* AI Buttons */
        .ai-btn-danger {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border: none;
          transition: all 0.3s ease;
          color: white;
        }
        .ai-btn-danger:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
          color: white;
        }

        .ai-btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
          color: white;
        }
        .ai-btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          color: white;
        }

        .ai-btn-success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          transition: all 0.3s ease;
          color: white;
        }
        .ai-btn-success:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
          color: white;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }
          .display-5 {
            font-size: 1.8rem;
          }
          .ai-btn-danger,
          .ai-btn-primary,
          .ai-btn-success {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 1rem !important;
          }
          .display-5 {
            font-size: 1.5rem;
          }
          .position-absolute .badge {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SecurityRoles;