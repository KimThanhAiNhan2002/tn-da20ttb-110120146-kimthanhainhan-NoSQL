import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Category.module.css';

const Category = () => {
  const { category } = useParams();
  const [spots, setSpots] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/touristSpots/tourist-spots/category/${category}`);
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        console.error('Error fetching tourist spots:', error);
        setMessage('Đã xảy ra lỗi khi lấy dữ liệu, vui lòng thử lại sau');
      }
    };

    fetchSpots();
  }, [category]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroHeader}>
        <div className={styles.content}>
          <h1>Danh sách địa điểm thuộc danh mục: {category}</h1>
          {message && <p>{message}</p>}
        </div>
      </div>
      {spots.length > 0 && (
        <div className={styles.resultsContainer}>
          <div className={styles.resultsGrid}>
            {spots.map((spot) => (
              <Link to={`/touristSpots/${spot._id}`} key={spot._id} className={styles.resultItem}>
                <img src={spot.image} alt={spot.name} className={styles.resultImage} />
                <h3>{spot.name}</h3>
                <p>{spot.address}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Category;
