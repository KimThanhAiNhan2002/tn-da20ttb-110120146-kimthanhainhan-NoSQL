import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './TouristSpotDetail.module.css';
// import FacebookComments from '../FacebookComments';
import DisqusComments from '../DisqusComments';

const TouristSpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/touristSpots/tourist-spots/${id}`);
        const data = await response.json();
        setSpot(data);
      } catch (error) {
        console.error('Error fetching the tourist spot details:', error);
      }
    };
    fetchSpot();
  }, [id]);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  if (!spot) {
    return <div>Loading...</div>;
  }

  const handleGoogleMapClick = () => {
    const coordinates = JSON.parse(spot.google_map);
    navigate(`/home_map?longitude=${coordinates[0]}&latitude=${coordinates[1]}`);
  };

  return (
    <div className="py-5 bg-light m-3 rounded-4">
      <div className="container py-4">
        <div className="row" style={{ justifyContent: 'space-evenly' }}>
          <div className="col-lg-4 sidebar">
            <img src={spot.image} style={{ borderTopRightRadius: '1em', borderTopLeftRadius: '1em' }} className="bg-cover border-0 bg-no-repeat js-bg-image overflow-hidden profile-card_bg--img start-0 top-0 w-100" />

            <div style={{ borderBottomRightRadius: '1em', borderBottomLeftRadius: '1em', background:'white' }} className="border-0 p-4 position-relative profile-card shadow-sm text-center">
              <h3 className="profile-card__name"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}> {spot.name}</h3>
              <div className="mb-5">
                <div className="border-bottom border-top py-3 fs-15">
                  <div className="align-items-center d-flex justify-content-between">
                    <span style={{ width: '30%' }} className="text-muted">Địa chỉ:</span>
                    <span style={{ width: '67%' }} className="fw-semibold">{spot.address}</span>
                  </div>
                </div>
                <div className="border-bottom py-3 fs-15">
                  <div className="align-items-center d-flex justify-content-between mb-2">
                    <span style={{ width: '30%' }} className="text-muted">Loại hình: </span>
                    <span style={{ width: '67%' }} className="fw-semibold">{spot.category}</span>
                  </div>
                </div>
                {/* <div className="border-bottom py-3 fs-15">
                  <div className="align-items-center d-flex justify-content-between mb-2">
                    <span className="text-muted">Google Map: </span>
                    <span className="fw-semibold"><a href="#" onClick={handleGoogleMapClick} rel="noopener noreferrer">Xem trên Google Maps</a></span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-8 ps-xxl-5">
            <div className="border-0 card listing-form p-4 rounded-4 shadow-sm">
              <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
                <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)', textAlign: 'center' }}
                >  Mô tả</h4>
              </div>
              <div className="align-items-sm-center rounded-3">
                <div style={{ maxWidth: '688px' }} dangerouslySetInnerHTML={{ __html: spot.description }} className="News__Detail__Content"></div>
              </div>
              <DisqusComments url={`http://localhost:3000/touristSpots/${spot._id}`} identifier={spot._id} />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="border-0 card listing-form mb-4 p-4 rounded-4 shadow-sm">
          <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
            <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>Khách sạn</h4>
            <div className="row g-4">
              {spot.accommodations.length > 0 ? (
                spot.accommodations.map((accommodation, index) => (
                  <div className="col-sm-6 d-flex" key={index}>
                    <div className="card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg">
                      <Link to={`/accommodations/${id}/${index}`}>
                        <div className="card-img-wrap card-image-hover overflow-hidden dark-overlay">
                          <img src={accommodation.image} alt={accommodation.name} style={{ height: '350px', width: '520px' }} />
                          <div className="bg-blur card-badge d-inline-block position-absolute start-0 text-white z-2"><i className="fa-solid fa-tag"></i>{accommodation.price}</div>
                        </div>
                      </Link>
                      <div className="d-flex flex-column h-100 position-relative p-3">
                        <h4 className={`${styles.title} fs-18 fw-semibold mb-0`}>{accommodation.name}</h4>
                        <div className="d-flex flex-wrap gap-3 mt-2 z-1">
                          <a href="tel:+4733378901" className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#9b9b9b" className="bi bi-telephone" viewBox="0 0 16 16">
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                            <span>Số điện thoại: {accommodation.phone_number}</span>
                          </a>
                          <a href="#" className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9b9b9b" className="bi bi-compass" viewBox="0 0 16 16">
                              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                            </svg>
                            <span>Địa chỉ: {accommodation.address}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Khách sạn của địa điểm đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Nhà hàng */}
      <div className="container py-4">
        <div className="border-0 card listing-form mb-4 p-4 rounded-4 shadow-sm">
          <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
            <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>Nhà hàng</h4>
            <div className="row g-4">
              {spot.restaurants.length > 0 ? (
                spot.restaurants.map((restaurant, index) => (
                  <div className="col-sm-6 d-flex" key={index}>
                    <div className="card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg">
                      <Link to={`/restaurants/${id}/${index}`}>
                        <div className="card-img-wrap card-image-hover overflow-hidden dark-overlay">
                          <img src={restaurant.image} alt={restaurant.name} style={{ height: '350px', width: '520px' }} />
                          <div className="bg-blur card-badge d-inline-block position-absolute start-0 text-white z-2"><i className="fa-solid fa-tag"></i>{restaurant.price}</div>
                        </div>
                      </Link>
                      <div className="d-flex flex-column h-100 position-relative p-3">
                        <h4 className={`${styles.title} fs-18 fw-semibold mb-0`}>{restaurant.name}</h4>
                        <div className="d-flex flex-wrap gap-3 mt-2 z-1">
                          <a href="tel:+4733378901" className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#9b9b9b" className="bi bi-telephone" viewBox="0 0 16 16">
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                            <span>Số điện thoại: {restaurant.phone_number}</span>
                          </a>
                          <a href="#" className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9b9b9b" className="bi bi-compass" viewBox="0 0 16 16">
                              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                            </svg>
                            <span>Địa chỉ: {restaurant.address}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nhà hàng của địa điểm đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Đặc sản */}
      <div className="container py-4">
        <div className="border-0 card listing-form mb-4 p-4 rounded-4 shadow-sm">
          <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
            <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>Đặc sản</h4>
            <div className="row g-4">
              {spot.specialties.length > 0 ? (
                spot.specialties.map((specialtie, index) => (
                  <div className="col-sm-6 d-flex" key={index}>
                    <div className="card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg">
                      <Link to={`/specialties/${id}/${index}`}>
                        <div className="card-img-wrap card-image-hover overflow-hidden dark-overlay">
                          <img src={specialtie.image} alt={specialtie.name} style={{ height: '350px', width: '520px' }} />
                          <div className="bg-blur card-badge d-inline-block position-absolute start-0 text-white z-2"><i className="fa-solid fa-tag"></i>{specialtie.price}</div>
                        </div>
                      </Link>
                      <div className="d-flex flex-column h-100 position-relative p-3">
                        <h4 className={`${styles.title} fs-18 fw-semibold mb-0`}>{specialtie.name}</h4>
                        <div className="d-flex flex-wrap gap-3 mt-2 z-1">
                          <a href="tel:+4733378901" className="d-flex gap-2 align-items-center fs-13 fw-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9b9b9b" className="bi bi-compass" viewBox="0 0 16 16">
                              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                            </svg>
                            <span>Xuất xứ: {specialtie.origin}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Đặc sản của địa điểm đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="border-0 card listing-form mb-4 p-4 rounded-4 shadow-sm">
          <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
            <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>Dịch vụ</h4>
            <div className="row g-4">
              {spot.services.length > 0 ? (
                spot.services.map((service, index) => (
                  <div className="col-sm-6 d-flex" key={index}>
                    <div className="card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg">
                      <Link to={`/services/${id}/${index}`}>
                        <div className="card-img-wrap card-image-hover overflow-hidden dark-overlay">
                          <img src={service.image} alt={service.name} style={{ height: '350px', width: '520px' }} />
                          <div className="bg-blur card-badge d-inline-block position-absolute start-0 text-white z-2"><i className="fa-solid fa-tag"></i>{service.price}</div>
                        </div>
                      </Link>
                      <div className="d-flex flex-column h-100 position-relative p-3">
                        <h4 className="fs-18 fw-semibold mb-0">{service.name}</h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Dịch vụ của địa điểm đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="border-0 card listing-form mb-4 p-4 rounded-4 shadow-sm">
          <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
            <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)'}}>Quà lưu niệm</h4>
            <div className="row g-4">
              {spot.souvenirs.length > 0 ? (
                spot.souvenirs.map((souvenir, index) => (
                  <div className="col-sm-6 d-flex" key={index}>
                    <div className="card card-hover flex-fill overflow-hidden rounded-3 shadow-sm w-100 card-hover-bg">
                      <Link to={`/souvenirs/${id}/${index}`}>
                        <div className="card-img-wrap card-image-hover overflow-hidden dark-overlay">
                          <img src={souvenir.image} alt={souvenir.name} style={{ height: '350px', width: '520px' }} />
                          <div className="bg-blur card-badge d-inline-block position-absolute start-0 text-white z-2"><i className="fa-solid fa-tag"></i>{souvenir.price}</div>
                        </div>
                      </Link>
                      <div className="d-flex flex-column h-100 position-relative p-3">
                        <h4 className="fs-18 fw-semibold mb-0">{souvenir.name}</h4>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Quà lưu niệm của địa điểm đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={`${styles.modal} ${styles.modalActive}`}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristSpotDetail;
