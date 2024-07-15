import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import styles from './AccommodationDetail.module.css';

const AccommodationDetail = () => {
  const { id, index } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/touristSpots/tourist-spots/${id}`);
        const data = await response.json();
        setAccommodation(data.accommodations[index]);
      } catch (error) {
        console.error('Error fetching the accommodation:', error);
      }
    };
    fetchAccommodation();
  }, [id, index]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4">
      <div className="row" style={{ justifyContent: 'space-evenly' }}>
        <div className="col-lg-4 sidebar">
          <img src={accommodation.image} style={{ borderTopRightRadius: '1em', borderTopLeftRadius: '1em' }} className="bg-cover border-0 bg-no-repeat js-bg-image overflow-hidden profile-card_bg--img start-0 top-0 w-100" />

          <div style={{ borderBottomRightRadius: '1em', borderBottomLeftRadius: '1em' }} className="border-0 p-4 position-relative profile-card shadow-sm text-center">
            <h3 className="profile-card__name"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)' }}>{accommodation.name}</h3>
            <div className="mb-5">
              <div className="border-bottom border-top py-3 fs-15">
                <div className="align-items-center d-flex justify-content-between">
                  <span style={{ width: '30%' }} className="text-muted">Địa chỉ:</span>
                  <span style={{ width: '67%' }} className="fw-semibold">{accommodation.address}</span>
                </div>
              </div>
              <div className="border-bottom py-3 fs-15">
                <div className="align-items-center d-flex justify-content-between mb-2">
                  <span style={{ width: '30%' }} className="text-muted">Giá: </span>
                  <span style={{ width: '67%' }} className="fw-semibold">{accommodation.price}</span>
                </div>
              </div>
              <div className="border-bottom py-3 fs-15">
                <div className="align-items-center d-flex justify-content-between mb-2">
                  <span className="text-muted">Số điện thoại: </span>
                  <span className="fw-semibold">{accommodation.phone_number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 ps-xxl-5">
          <div className="border-0 card listing-form p-4 rounded-4 shadow-sm">
            <div className="align-items-sm-center bg-light mb-4 p-4 rounded-3">
              <h4 className="fw-semibold fs-2"style={{ fontWeight: 'bold', color: 'rgb(248 69 37)', textAlign: 'center' }}
              >Mô tả</h4>
            </div>
            <div className="align-items-sm-center rounded-3">
              <div style={{ maxWidth: '688px' }} dangerouslySetInnerHTML={{ __html: accommodation.description }} className="News__Detail__Content "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
