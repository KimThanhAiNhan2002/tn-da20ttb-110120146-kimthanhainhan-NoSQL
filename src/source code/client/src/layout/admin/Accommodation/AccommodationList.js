import React, { useState, useEffect } from 'react';
import { getAllAccommodations, deleteAccommodation } from '../../../api/accommodationsApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi';
import "./Accommodation.css";

const AccommodationList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [touristSpots, setTouristSpots] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAllAccommodations();
        setAccommodations(data);

        const spotPromises = data.map(accommodation => getTouristSpotById(accommodation.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleDelete = async (touristSpotId, accommodationId) => {
    try {
      await deleteAccommodation(touristSpotId, accommodationId);
      setAccommodations(accommodations.filter(acc => acc._id !== accommodationId));
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  };

  const handleEdit = (touristSpotId, accommodationId) => {
    setTouristSpotId(touristSpotId);
    setEditId(accommodationId);
    setCurrentView('edit-accommodation');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accommodations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(accommodations.length / itemsPerPage);

  return (
    <div className="body-content">
      <div className="decoration blur-2"></div>
      <div className="decoration blur-3"></div>
      <div className="container-xxl">
        <div className="align-items-end row g-4 mb-4" data-aos="fade-down">
          <div className="col">
            <div className="section-header">
              <h2 className="fw-semibold mb-0 section-header__title text-capitalize text-center text-xl-start h3">
                Nơi Lưu Trú
              </h2>
            </div>
          </div>
          <div className="col-12 col-xl-auto">
            <button onClick={() => setCurrentView('add-accommodation')} className="btn btn-primary-soft">
              <i className="fa fa-plus me-2"></i> Thêm Nơi Lưu Trú
            </button>
          </div>
        </div>
        {currentItems.map((accommodation) => (
          <div
            key={accommodation._id}
            className="border-0 card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg mb-3"
          >
            <a className="stretched-link"></a>
            <div className="card-body p-0">
              <div className="g-0 h-100 row">
                <div className="col-lg-3 col-md-5 col-sm-4 col-xxl-2 position-relative">
                  <div className="card-image-hover dark-overlay h-100 overflow-hidden position-relative">
                    <img style={{width:'223px', height:'239px'}}  src={accommodation.image} alt={accommodation.name} className="image-tour" />
                  </div>
                </div>
                <div className="col-lg-9 col-md-7 col-sm-8 col-xxl-10 p-3 p-lg-4 p-md-3 p-sm-4">
                  <div className="d-flex flex-column h-100">
                    <div className="d-flex end-0 gap-2 me-3 mt-3 position-absolute top-0 z-1">
                      <button
                        style={{ border: 'none', background: 'none' }}
                        onClick={() => handleEdit(accommodation.touristSpotId, accommodation._id)}
                        className="align-items-center bg-light btn-icon d-flex justify-content-center rounded-circle text-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </button>
                      <button
                        style={{ border: 'none', background: 'none' }}
                        onClick={() => handleDelete(accommodation.touristSpotId, accommodation._id)}
                        className="align-items-center bg-light btn-icon d-flex justify-content-center rounded-circle text-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="fs-18 fw-semibold mb-0">
                      <span>{accommodation.name}</span>
                    </h4>
                    <p className="mt-1 fs-14 text-muted description" dangerouslySetInnerHTML={{ __html: accommodation.description }}></p>

                    <div className="d-flex flex-column gap-3 gap-lg-2 gap-xl-3 mt-auto z-1">
                      <a href={`tel:${accommodation.phone_number}`} className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Địa chỉ: {accommodation.address}</span>
                      </a>
                      <a className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                      <i class="fa-solid fa-dollar-sign"></i>                        
                        <span>Giá: {accommodation.price}</span>
                      </a>
                      {touristSpots[accommodation.touristSpotId] && (
                        <a className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                          <i class="fa-solid fa-map-location-dot"></i>
                          <span>Địa điểm du lịch: {touristSpots[accommodation.touristSpotId].name}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <nav className="justify-content-center mt-4 pagination align-items-center">
          <a
            className={`prev page-numbers ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            trước
          </a>
          {Array.from({ length: totalPages }, (_, index) => (
            <a
              key={index + 1}
              className={`page-numbers ${currentPage === index + 1 ? 'current' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          ))}
          <a
            className={`next page-numbers ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          >
            sau
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default AccommodationList;
