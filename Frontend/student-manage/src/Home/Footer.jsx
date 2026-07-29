import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">
              <i className="bi bi-mortarboard-fill me-2"></i>StudentHub
            </h5>
            <p className="text-light text-opacity-75 small">
              Smart Student Management System for modern educational institutions.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-light text-opacity-50 hover-opacity-100">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light text-opacity-50 hover-opacity-100">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="text-light text-opacity-50 hover-opacity-100">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-light text-opacity-50 hover-opacity-100">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-light">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Dashboard</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Students</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Courses</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Reports</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-light">Support</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">FAQs</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-light text-opacity-75 text-decoration-none">Privacy</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold text-light">Stay Updated</h6>
            <p className="text-light text-opacity-75 small">
              Subscribe for updates on new features.
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-sm bg-dark border-light border-opacity-25 text-light"
                placeholder="Your email"
              />
              <button className="btn btn-primary btn-sm" type="button">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-light border-opacity-25 my-4" />
        <div className="d-flex flex-wrap justify-content-between align-items-center small text-light text-opacity-50">
          <span>© {currentYear} StudentHub. All rights reserved.</span>
          <span>
            <i className="bi bi-code-slash me-1"></i> Built with React + Bootstrap
          </span>
        </div>
      </div>

      <style jsx>{`
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
        .hover-opacity-100 {
          transition: opacity 0.2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;