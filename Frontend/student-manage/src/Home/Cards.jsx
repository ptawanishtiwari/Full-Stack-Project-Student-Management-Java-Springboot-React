import React from 'react';

const Cards = () => {
  const cards = [
    {
      id: 1,
      icon: 'bi-people-fill',
      title: 'Total Students',
      count: '1,284',
      description: 'Active students enrolled in various programs across 12 departments',
      color: 'primary',
      gradient: 'ai-gradient-blue',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop&crop=center',
      badge: '+12% this month',
      badgeColor: 'success',
      progress: 85,
      trend: 'up'
    },
    {
      id: 2,
      icon: 'bi-trophy-fill',
      title: 'Honors Students',
      count: '342',
      description: 'Exceptional students maintaining GPA above 3.8',
      color: 'warning',
      gradient: 'ai-gradient-gold',
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop&crop=center',
      badge: '+8% this semester',
      badgeColor: 'success',
      progress: 72,
      trend: 'up'
    },
    {
      id: 3,
      icon: 'bi-building-fill',
      title: 'Departments',
      count: '12',
      description: 'Academic departments offering 45+ programs',
      color: 'success',
      gradient: 'ai-gradient-green',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&crop=center',
      badge: '2 new departments',
      badgeColor: 'info',
      progress: 60,
      trend: 'up'
    },
    {
      id: 4,
      icon: 'bi-calendar-check-fill',
      title: 'Attendance Rate',
      count: '89%',
      description: 'Overall student attendance this academic year',
      color: 'info',
      gradient: 'ai-gradient-cyan',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&crop=center',
      badge: '+5% from last year',
      badgeColor: 'success',
      progress: 89,
      trend: 'up'
    },
    {
      id: 5,
      icon: 'bi-graph-up-arrow',
      title: 'Passing Rate',
      count: '94%',
      description: 'Students successfully passing all courses',
      color: 'danger',
      gradient: 'ai-gradient-rose',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      badge: 'Top performing batch',
      badgeColor: 'warning',
      progress: 94,
      trend: 'up'
    },
    {
      id: 6,
      icon: 'bi-mortarboard-fill',
      title: 'Graduates',
      count: '567',
      description: 'Students graduated in the academic year 2023-24',
      color: 'purple',
      gradient: 'ai-gradient-purple',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop&crop=center&rotate=90',
      badge: 'Class of 2024',
      badgeColor: 'primary',
      progress: 78,
      trend: 'up'
    }
  ];

  return (
    <div className="container py-5">
      {/* Header with AI Theme */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <i className="bi bi-grid-3x3-gap-fill me-2" style={{ WebkitTextFillColor: '#667eea' }}></i>
            AI Dashboard Overview
          </h2>
          <p className="text-muted">Real-time analytics powered by intelligent insights</p>
        </div>
        <div>
          <button className="btn btn-primary rounded-pill px-4 py-2 shadow-sm" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none'
          }}>
            <i className="bi bi-robot me-2"></i>AI Insights
          </button>
        </div>
      </div>

      <div className="row g-4">
        {cards.map((card) => (
          <div className="col-lg-4 col-md-6" key={card.id}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden ai-card">
              {/* Image with Overlay */}
              <div className="position-relative card-image-container">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-100 h-100 card-image"
                  style={{ objectFit: 'cover' }}
                />
                {/* Gradient Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
                }}></div>
                
                {/* Icon on Image */}
                <div className="position-absolute top-0 start-0 m-3">
                  <div className={`${card.gradient} rounded-3 p-3 shadow-lg`} style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${card.icon} fs-2 text-white`}></i>
                  </div>
                </div>

                {/* Badge */}
                <div className="position-absolute top-0 end-0 m-3">
                  <span className={`badge bg-${card.badgeColor} text-white px-3 py-2 rounded-pill shadow-sm`}>
                    <i className={`bi bi-arrow-${card.trend} me-1`}></i>
                    {card.badge}
                  </span>
                </div>

                {/* Stats on Image */}
                <div className="position-absolute bottom-0 start-0 w-100 p-3">
                  <h3 className="display-3 fw-bold text-white mb-0">{card.count}</h3>
                </div>
              </div>

              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-dark mb-2">{card.title}</h5>
                <p className="card-text text-muted small mb-3">{card.description}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-muted small">Progress</span>
                    <span className="text-muted small fw-bold">{card.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${card.progress}%`,
                        background: `linear-gradient(90deg, ${getGradientColor(card.color)})`,
                        borderRadius: '10px'
                      }}
                    ></div>
                  </div>
                </div>

                {/* AI-Powered Insights */}
                <div className="d-flex align-items-center bg-light rounded-3 p-2 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                  <small className="text-muted">
                    <span className="fw-semibold">AI Insight:</span> {getInsight(card.title)}
                  </small>
                </div>

                {/* Enhanced Buttons */}
                <div className="d-flex gap-2">
                  {/* <button className="btn btn-primary rounded-pill flex-grow-1 ai-btn-primary">
                    <i className="bi bi-eye me-2"></i>View Details
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button> */}
                  <button className="btn btn-outline-primary rounded-pill px-3 ai-btn-outline">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* AI Theme Gradients */
        .ai-gradient-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .ai-gradient-gold {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .ai-gradient-green {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .ai-gradient-cyan {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
        .ai-gradient-rose {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }
        .ai-gradient-purple {
          background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
        }

        /* Card Styles */
        .ai-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }
        
        .ai-card:hover {
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25) !important;
        }
        
        .ai-card:hover .card-image {
          transform: scale(1.08);
        }
        
        .card-image-container {
          height: 200px;
          overflow: hidden;
          position: relative;
        }
        
        .card-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* AI Buttons */
        .ai-btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .ai-btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .ai-btn-primary::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.6s ease;
        }
        
        .ai-btn-primary:hover::after {
          transform: rotate(45deg) translateX(100%);
        }

        .ai-btn-outline {
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .ai-btn-outline:hover {
          border-color: #667eea;
          background: #f8f9ff;
          transform: rotate(90deg);
        }

        /* Progress Bar Animation */
        .progress-bar {
          transition: width 1.5s ease;
        }

        /* Glassmorphism for AI Insight */
        .ai-insight {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card-image-container {
            height: 180px;
          }
          .display-3 {
            font-size: 2.5rem;
          }
          .ai-card:hover {
            transform: translateY(-8px);
          }
        }
        
        @media (max-width: 576px) {
          .card-image-container {
            height: 160px;
          }
          .display-3 {
            font-size: 2rem;
          }
          .ai-btn-primary {
            font-size: 0.9rem;
          }
        }

        /* Floating Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .ai-card:hover .ai-gradient-blue,
        .ai-card:hover .ai-gradient-gold,
        .ai-card:hover .ai-gradient-green,
        .ai-card:hover .ai-gradient-cyan,
        .ai-card:hover .ai-gradient-rose,
        .ai-card:hover .ai-gradient-purple {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Helper function to get gradient colors
const getGradientColor = (color) => {
  const gradients = {
    primary: '#667eea, #764ba2',
    warning: '#f093fb, #f5576c',
    success: '#4facfe, #00f2fe',
    info: '#43e97b, #38f9d7',
    danger: '#fa709a, #fee140',
    purple: '#a18cd1, #fbc2eb'
  };
  return gradients[color] || gradients.primary;
};

// AI Insights based on card title
const getInsight = (title) => {
  const insights = {
    'Total Students': 'Enrollment growing at 12% YoY. AI predicts 1,500 students by 2025.',
    'Honors Students': '342 students achieving excellence. Top performing in STEM fields.',
    'Departments': '12 departments with 45+ programs. CS and AI programs seeing highest demand.',
    'Attendance Rate': '89% attendance. AI recommends personalized engagement for 11% absentees.',
    'Passing Rate': '94% passing rate. 6% improvement needed in mathematics department.',
    'Graduates': '567 graduates ready for workforce. 78% placed in top companies.'
  };
  return insights[title] || 'Analyzing data patterns for better insights.';
};

export default Cards;