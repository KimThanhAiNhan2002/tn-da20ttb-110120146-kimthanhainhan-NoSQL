import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Foodter';
import Home from './layout/user/Home/Home';
import Map from './layout/user/Map/Map';
import AdminPage from './layout/admin/AdminPage';
import AddTouristSpot from './layout/admin/TouristSpot/AddTouristSpot';
import EditTouristSpot from './layout/admin/TouristSpot/EditTouristSpot';
import TouristSpotList from './layout/admin/TouristSpot/TouristSpotList';
import AccommodationList from './layout/admin/Accommodation/AccommodationList';
import AddAccommodation from './layout/admin/Accommodation/AddAccommodation';
import EditAccommodation from './layout/admin/Accommodation/EditAccommodation';
import TouristSpotDetail from './layout/user/Detail/TouristSpotDetail/TouristSpotDetail';
import AccommodationDetail from './layout/user/Detail/AccommodationDetail/AccommodationDetail';
import RestaurantDetail from './layout/user/Detail/RestaurantDetail/RestaurantDetail';
import SpecialtyDetail from './layout/user/Detail/SpecialtyDetail/SpecialtyDetail';
import ServiceDetail from './layout/user/Detail/ServiceDetail/ServiceDetail';
import SouvenirDetail from './layout/user/Detail/SouvenirDetail/SouvenirDetail';
import Login from './login/login';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Introduce from './layout/user/Introduce/Introduce';
import Category from './layout/user/Category/Category';

const App = () => {
  const isNotAdminPage = window.location.pathname !== '/admin' && !window.location.pathname.startsWith('/admin/');
  const isNotLoginPage = window.location.pathname !== '/login';

  return (
    <Router>
      <AuthProvider>
        {isNotAdminPage && isNotLoginPage && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Introduce/>}/>
          <Route path="/category/:category" element={<Category/>} />
          <Route path="/home-map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/admin/add-tourist-spot" element={<AddTouristSpot />} />
            <Route path="/admin/edit-tourist-spot/:id" element={<EditTouristSpot />} />
            <Route path="/admin/tourist-spot-list" element={<TouristSpotList />} />
            <Route path="/admin/add-accommodation" element={<AddAccommodation />} />
            <Route path="/admin/edit-accommodation/:touristSpotId/:id" element={<EditAccommodation />} />
            <Route path="/admin/accommodation-list/:touristSpotId" element={<AccommodationList />} />
          </Route>
          <Route path="/touristSpots/:id" element={<TouristSpotDetail />} />
          <Route path="/accommodations/:id/:index" element={<AccommodationDetail />} />
          <Route path="/restaurants/:id/:index" element={<RestaurantDetail />} />
          <Route path="/specialties/:id/:index" element={<SpecialtyDetail />} />
          <Route path="/services/:id/:index" element={<ServiceDetail />} />
          <Route path="/souvenirs/:id/:index" element={<SouvenirDetail />} />
        </Routes>
        {isNotAdminPage && isNotLoginPage && <Footer />}
      </AuthProvider>
    </Router>
  );
};

export default App;
