import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/touristSpots/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const linkStyle = {
    fontWeight: 'bold',
    color: '' 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <a className="navbar-brand m-0 col-lg-2" href="/">
          <img className="logo-dark" src="/assets/images/travellogo.png" alt="Travel Logo" style={{ width: '100%', height: '100%' }} />
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home" style={linkStyle}>Giới thiệu</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" style={linkStyle}>Trang chủ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/home-map" style={linkStyle}>Bản đồ</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={linkStyle}>
                Danh mục
              </a>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category}>
                    <Link className="dropdown-item" to={`/category/${category}`} style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>{category}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          
          <div className="d-sm-none">
            <a href="signin.html" className="btn btn-primary d-flex gap-2 hstack justify-content-center rounded-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              <div className="vr d-none d-sm-inline-block"></div>
              <span>Add Listing</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
