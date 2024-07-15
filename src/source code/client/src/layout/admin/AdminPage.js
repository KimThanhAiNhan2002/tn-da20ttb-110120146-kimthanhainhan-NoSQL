import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TouristSpotList from './TouristSpot/TouristSpotList';
import AddTouristSpot from './TouristSpot/AddTouristSpot';
import EditTouristSpot from './TouristSpot/EditTouristSpot';
import AccommodationList from './Accommodation/AccommodationList';
import AddAccommodation from './Accommodation/AddAccommodation';
import EditAccommodation from './Accommodation/EditAccommodation';
import RestaurantList from './Restaurant/RestaurantList';
import AddRestaurant from './Restaurant/AddRestaurant';
import EditRestaurant from './Restaurant/EditRestaurant';
import SpecialtyList from './Specialty/SpecialtyList';
import AddSpecialty from './Specialty/AddSpecialty';
import EditSpecialty from './Specialty/EditSpecialty';
import ServiceList from './Service/ServiceList';
import AddService from './Service/AddService';
import EditService from './Service/EditService';
import SouvenirList from './Souvenir/SouvenirList';
import AddSouvenir from './Souvenir/AddSouvenir';
import EditSouvenir from './Souvenir/EditSouvenir';

const AdminPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState('list'); // State để quản lý hiển thị các phần
  const [editId, setEditId] = useState(null); // State để lưu ID của đối tượng cần chỉnh sửa
  const [touristSpotId, setTouristSpotId] = useState(null); // State để lưu ID của TouristSpot

  useEffect(() => {
    const scripts = [
      "/assets_admin/plugins/jQuery/jquery.min.js",
      "/assets_admin/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "/assets_admin/plugins/metisMenu/metisMenu.min.js",
      "/assets_admin/plugins/perfect-scrollbar/perfect-scrollbar.min.js",
      "/assets_admin/plugins/toastr/toastr.min.js",
      "/assets_admin/plugins/datatables/jquery.dataTables.min.js",
      "/assets_admin/plugins/datatables/dataTables.bootstrap5.min.js",
      "/assets_admin/plugins/apexcharts/apexcharts.min.js",
      "/assets_admin/plugins/jquery.counterup/jquery.waypoints.min.js",
      "/assets_admin/plugins/jquery.counterup/jquery.counterup.min.js",
      "/assets_admin/dist/js/app.min.js",
      "/assets_admin/dist/js/dashboard.js"
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; 
  }

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <TouristSpotList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add':
        return <AddTouristSpot setCurrentView={setCurrentView} />;
      case 'edit':
        return <EditTouristSpot setCurrentView={setCurrentView} editId={editId} />;
      case 'list-accommodation':
        return <AccommodationList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-accommodation':
        return <AddAccommodation setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-accommodation':
        return <EditAccommodation setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-restaurant':
        return <RestaurantList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-restaurant':
        return <AddRestaurant setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-restaurant':
        return <EditRestaurant setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-specialty':
        return <SpecialtyList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-specialty':
        return <AddSpecialty setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-specialty':
        return <EditSpecialty setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-service':
        return <ServiceList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-service':
        return <AddService setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-service':
        return <EditService setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-souvenir':
        return <SouvenirList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-souvenir':
        return <AddSouvenir setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-souvenir':
        return <EditSouvenir setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      default:
        return <TouristSpotList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
    }
  };

  return (
    <div>
      <div className="wrapper">
        <nav className="sidebar">
          <div className="sidebar-header">
            <button style={{background:'none', border:'none'}} className="sidebar-brand">
              <img className="sidebar-brand_icon" src="/assets/dist/img/mini-logo.png" alt="" />
              <span className="sidebar-brand_text">Admin</span>
            </button>
          </div>
          <div className="sidebar-body">
            <nav className="sidebar-nav">
              <ul className="metismenu">
                <li className="mm-active">
                  <button className="btn btn-link" onClick={() => setCurrentView('list')}>
                    <i className="fa-solid fa-map-location-dot"></i>
                    <span className="ms-2">Địa Điểm Du Lịch</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-link" onClick={() => setCurrentView('list-accommodation')}>
                    <i className="fa-solid fa-bed"></i>
                    <span className="ms-2">Nơi Lưu Trú</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-link" onClick={() => setCurrentView('list-restaurant')}>
                    <i className="fa-solid fa-utensils"></i>
                    <span className="ms-2">Nhà Hàng</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-link" onClick={() => setCurrentView('list-specialty')}>
                    <i className="fa-solid fa-box"></i>
                    <span className="ms-2">Đặc Sản</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-link" onClick={() => setCurrentView('list-service')}>
                    <i className="fa-solid fa-headset"></i>
                    <span className="ms-2">Dịch Vụ</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-link" onClick={() => setCurrentView('list-souvenir')}>
                    <i className="fa-solid fa-gift"></i>
                    <span className="ms-2">Quà Lưu Niệm</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
        <div className="content-wrapper">
          <div className="main-content">
          <nav class="navbar-custom-menu navbar navbar-expand-xl m-0 navbar-transfarent">
                    
                    <div class="navbar-icon d-flex">
                        <ul class="navbar-nav flex-row align-items-center">
                            <li class="nav-item">
                                <a class="nav-link" href="#" id="btnFullscreen">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link dark-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                    </svg>
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link light-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                </button>
                            </li>
                            <li class="nav-item dropdown user-menu user-menu-custom">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div class="profile-element d-flex align-items-center flex-shrink-0 p-0 text-start">
                                        <div >
                                        <i class="fa-solid fa-user-tie"></i>
                                        </div>
                                        <div class="profile-text">
                                            <h6 class="m-0 fw-medium fs-14">Admin</h6>
                                        </div>
                                    </div>
                                </a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-header d-sm-none">
                                        <a href="#" class="header-arrow"><i class="icon ion-md-arrow-back"></i></a>
                                    </div>
                                    <div class="user-header">
                                        <div class="img-user">
                                            <img src="assets/dist/img/avatar/01.jpg" alt=""/>
                                        </div>
                                        <h6>Naeem Khan</h6>
                                        <span>example@gmail.com</span>
                                    </div>
                                    <a href="profile.html" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                        </svg>
                                        My Profile</a>
                                    <a href="/login" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                        </svg>
                                        Sign Out</a>
                                </div>
                               
                            </li>
                        </ul>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars fs-18"></i>
                    </button>
                </nav>
            {currentView === 'outlet' ? <Outlet /> : renderView()}
            <footer className="footer-content">
              <div className="align-items-center d-flex footer-text gap-3 justify-content-between">
                <div className="copy"> Admin - Du lịch Tây Nam Bộ </div>
                <div className="credit"> <a href="/">Admin</a> 🌺💚</div>
              </div>
            </footer>
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
