import React from 'react';

const Feature = () => {
  const features = [
    {
      icon: 'bi-pencil-square',
      title: 'Easy Enrollment',
      desc: 'Quickly register new students with our intuitive form workflow.',
      color: 'primary',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Performance Analytics',
      desc: 'Track grades, attendance, and progress with visual dashboards.',
      color: 'success',
    },
    {
      icon: 'bi-bell',
      title: 'Smart Notifications',
      desc: 'Automated alerts for upcoming exams, deadlines, and events.',
      color: 'warning',
    },
    {
      icon: 'bi-shield-lock',
      title: 'Secure Records',
      desc: 'Role-based access ensures student data stays protected.',
      color: 'danger',
    },
  ];

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">
        <i className="bi bi-stars me-2"></i>Key Features
      </h2>
      <div className="row g-4">
        {features.map((feature, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-3 hover-lift">
              <div className="card-body">
                <div className={`bg-${feature.color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                  <i className={`bi ${feature.icon} fs-1 text-${feature.color}`}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-6px);
          transition: all 0.25s ease;
        }
        .bg-opacity-10 {
          --bs-bg-opacity: 0.1;
        }
      `}</style>
    </div>
  );
};

export default Feature;