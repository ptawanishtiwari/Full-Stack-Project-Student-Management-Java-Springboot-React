import React from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop',
      title: 'Welcome to Student Management System',
      subtitle: 'Efficiently manage student records, grades, and attendance'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=400&fit=crop',
      title: 'Track Academic Progress',
      subtitle: 'Monitor student performance with real-time analytics'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=400&fit=crop',
      title: 'Simplify Administration',
      subtitle: 'Automate enrollment, scheduling, and communication'
    }
  ];

  return (
    <div id="studentSlider" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#studentSlider"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : ''}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner" style={{ height: '500px' }}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            style={{ height: '100%' }}
          >
            <img 
              src={slide.image} 
              className="d-block w-100 h-100" 
              alt={slide.title}
              style={{ objectFit: 'cover' }}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100" 
                 style={{ backgroundColor: 'rgba(0,0,0,0.4)', bottom: 0, top: 0, left: 0, right: 0 }}>
              <h1 className="display-3 fw-bold">{slide.title}</h1>
              <p className="lead">{slide.subtitle}</p>
              <a href="/dashboard" className="btn btn-primary btn-lg px-5 py-3 rounded-pill mt-3">
                Get Started
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#studentSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#studentSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;