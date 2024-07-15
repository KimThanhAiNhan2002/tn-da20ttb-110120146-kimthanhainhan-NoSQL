import React, { useState, useEffect } from 'react';
//import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import styles from './Home.module.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from 'react-owl-carousel';
import Autosuggest from 'react-autosuggest';

const Home = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allSpots, setAllSpots] = useState([]);
  const [searchBy, setSearchBy] = useState('name');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchAllSpots = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/touristSpots/tourist-spots');
        const data = await response.json();
        setAllSpots(data);
      } catch (error) {
        console.error('Error fetching all tourist spots:', error);
        setMessage('Đã xảy ra lỗi khi lấy dữ liệu, vui lòng thử lại sau');
      }
    };

    fetchAllSpots();
  }, []);

  useEffect(() => {
    const fetchSpotsByCategory = async () => {
      if (category) {
        try {
          const response = await fetch(`http://localhost:5000/api/touristSpots/category/${category}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching spots by category:', error);
          setMessage('Đã xảy ra lỗi khi lấy dữ liệu, vui lòng thử lại sau');
        }
      }
    };

    fetchSpotsByCategory();
  }, [category]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    const filteredSpots = allSpots.filter(spot =>
      (searchBy === 'name' ? spot.name : spot.address).toLowerCase().includes(inputValue)
    );

    const uniqueSpots = [];
    const seenSpots = new Set();

    filteredSpots.forEach(spot => {
      const identifier = searchBy === 'name' ? spot.name.toLowerCase() : spot.address.toLowerCase();
      if (!seenSpots.has(identifier)) {
        seenSpots.add(identifier);
        uniqueSpots.push(spot);
      }
    });

    return uniqueSpots;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSearchTerm(suggestion[searchBy]);
  };

  const renderSuggestion = suggestion => (
    <div>
      {suggestion[searchBy]}
    </div>
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setMessage('Hãy nhập địa điểm bạn muốn tìm kiếm');
      setSearchResults([]);
      return;
    }
    setMessage('');
    try {
      const endpoint = searchBy === 'name' ? 'search' : 'searchByAddress';
      const response = await fetch(`http://localhost:5000/api/touristSpots/${endpoint}?query=${searchTerm}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.length === 0) {
        setMessage('Địa điểm bạn tìm kiếm đang được cập nhật');
      } else {
        setMessage('');
      }
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching tourist spots:', error);
      setMessage('Đã xảy ra lỗi khi tìm kiếm, vui lòng thử lại sau');
    }
  };

  const renderRegionCard = (spot) => (
    <div className="region-card rounded-4 overflow-hidden position-relative text-white" key={spot._id}>
      <div className="region-card-image">
        <img src={spot.image} alt={spot.name} style={{ height: '340px' }} className="object-fit-cover w-100" />
      </div>
      <div className="region-card-content d-flex flex-column h-100 position-absolute start-0 top-0 w-100">
        <div className="region-card-info">
        </div>
        <Link to={`/touristSpots/${spot._id}`} className="align-items-center d-flex fw-semibold justify-content-between mt-auto region-card-link">
          <div style={{ width: '72%' }} className="fs-12 region-card-link-text text-uppercase text-white">{spot.name}</div>
          <div className="align-items-center bg-blur text-white btn-icon-md d-flex end-0 justify-content-center rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroHeader}>
        <video className={styles.video} src='assets/beachVid.mp4' autoPlay loop muted />
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <form onSubmit={handleSearch} className="border-0 card d-flex flex-md-row position-relative search-wrapper">
            <div className="align-items-center d-flex search-field w-100">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <div style={{ position: 'relative', width: '300px' }}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={suggestion => suggestion[searchBy]}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                    placeholder: `Tìm kiếm địa điểm theo ${searchBy === 'name' ? 'tên' : 'địa chỉ'}`,
                    value: searchTerm,
                    onChange: (e, { newValue }) => setSearchTerm(newValue),
                  }}
                  theme={{
                    input: 'form-control search-input',
                    suggestionsContainer: styles.suggestionsContainer,
                    suggestion: styles.suggestionItem,
                    suggestionHighlighted: styles.suggestionItemHighlighted
                  }}
                />
              </div>
            </div>
            <div className="vertical-divider"></div>
            <div className="align-items-center d-flex search-field w-100">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                style={{ width: '250px' }} className="form-select search-select-field"
              >
                <option value="name">Tìm kiếm theo tên địa điểm</option>
                <option value="address">Tìm kiếm theo địa chỉ</option>
              </select>
            </div>
            <input
              type="submit"
              value="Tìm kiếm"
              className="btn btn-primary rounded-5 mt-3 mt-md-0"
            />
            
          </form>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className={styles.resultsContainer}>
          <div className={styles.resultsGrid}>
            {searchResults.map((spot) => (
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
      <div className="py-5 bg-primary position-relative overflow-hidden text-white bg-primary bg-size-contain home-about js-bg-image" data-image-src="assets/images/lines.svg">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="row justify-content-center">
              <div className="col-sm-10 col-md-10 col-lg-8 col-xl-7">
                <div className="section-header text-center mb-5" data-aos="fade-down">
                  <h2 className="display-5 fw-semibold mb-3 section-header__title text-capitalize">Tất cả địa điểm du lịch</h2>
                </div>
              </div>
            </div>
          </div>
          {allSpots.length > 0 ? (
            <div style={{ height: '450px' }}> 
              <OwlCarousel className="owl-carousel owl-theme place-carousel owl-nav-center" items={5} margin={20} nav>
                {allSpots.map((spot) => renderRegionCard(spot))}
              </OwlCarousel>
            </div>
          ) : (
            <p>Không có địa điểm nào để hiển thị.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
