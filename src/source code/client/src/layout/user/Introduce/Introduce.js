import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Introduce.css'; // Đảm bảo bạn đã nhập đúng đường dẫn tới file CSS

const Introduce = () => {
  return (
    <div className="py-5 overflow-hidden position-relative">
      <Carousel interval={2000}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="assets/images/blog/img1.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="caption-title">Khám phá vẻ đẹp của Tây Nam Bộ</h3>
            <p className="caption-text">Khám phá những cảnh quan tuyệt đẹp và văn hóa phong phú.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="assets/images/blog/img2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="caption-title">Trải nghiệm Ẩm thực Địa phương</h3>
            <p className="caption-text">Thưởng thức những hương vị độc đáo của vùng miền.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="assets/images/blog/img3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="caption-title">Chờ đón những cuộc phiêu lưu</h3>
            <p className="caption-text">Khơi dậy tinh thần phiêu lưu với những hoạt động thú vị.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container py-4">
        <div className="row">
          <div className="col-xl-4 sidebar">
            <div className="section-header mb-5" data-aos="fade-down">
              <div className="d-inline-block font-caveat fs-1 fw-medium section-header__subtitle text-capitalize text-primary">Bài Viết Mới Nhất</div>
              <h2 className="display-5 fw-semibold mb-3 section-header__title text-capitalize">Khám Phá Tin Tức Và Bài Viết Mới Nhất</h2>
              <div className="sub-title fs-16">Đọc các bài viết blog của chúng tôi để cập nhật xu hướng mới nhất, ứng dụng công nghệ, sản phẩm, và tin tức. Các bài viết sẽ cung cấp cho bạn những mẹo và hiểu biết hữu ích khi đi du lịch.</div>
              
              <svg className="text-primary mt-4 d-none d-xl-block" width="200" height="211" viewBox="0 0 200 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <div className="col-xl-8 content ps-xxl-5 d-flex flex-column">
            <div className="bg-light blog-list-card d-md-flex mb-3 p-4 rounded-4">
              <div className="flex-grow-1 p-post me-md-5">
                <h2 className="fw-semibold news-title overflow-hidden text-capitalize"><a href="#">Du Lịch Văn Hóa</a></h2>
                <p className="mb-0">Khám phá những di sản văn hóa, kiến trúc độc đáo và các lễ hội truyền thống đặc sắc của địa phương.</p>
              </div>
              <div className="flex-shrink-0 img-wrapper mt-4 mt-md-0">
                <a href="#" className="thumb position-relative d-block overflow-hidden position-relative rounded-4"><img src="assets/images/blog/vanhoa3.jpg" alt="" height="300" width="300" className="image-zoom-hover object-fit-cover w-100"/></a>
              </div>
            </div>
            <div className="bg-light blog-list-card d-md-flex mb-3 p-4 rounded-4">
              <div className="flex-grow-1 p-post me-md-5">
                <h2 className="fw-semibold news-title overflow-hidden text-capitalize"><a href="#">Du Lịch Tôn Giáo</a></h2>
                <p>Tham quan các đền chùa, nhà thờ và những địa điểm tôn giáo linh thiêng, tôn vinh giá trị tâm linh.</p>
              </div>
              <div className="flex-shrink-0 img-wrapper mt-4 mt-md-0">
                <a href="#" className="thumb position-relative d-block overflow-hidden position-relative rounded-4"><img src="assets/images/blog/tamlinh.jpg" alt="" height="300" width="300" className="image-zoom-hover object-fit-cover w-100"/></a>
              </div>
            </div>
            <div className="bg-light blog-list-card d-md-flex mb-3 p-4 rounded-4">
              <div className="flex-grow-1 p-post me-md-5">
                <h2 className="fw-semibold news-title overflow-hidden text-capitalize"><a href="#">Du Lịch Sinh Thái</a></h2>
                <p>Trải nghiệm thiên nhiên hoang dã, tham gia các hoạt động ngoài trời và tận hưởng không khí trong lành.</p>
              </div>
              <div className="flex-shrink-0 img-wrapper mt-4 mt-md-0">
                <a href="#" className="thumb position-relative d-block overflow-hidden position-relative rounded-4"><img src="assets/images/blog/sinhthai.jpg" alt="" height="300" width="300" className="image-zoom-hover object-fit-cover w-100"/></a>
              </div>
            </div>
            <div className="bg-light blog-list-card d-md-flex mb-3 p-4 rounded-4">
              <div className="flex-grow-1 p-post me-md-5">
                <h2 className="fw-semibold news-title overflow-hidden text-capitalize"><a href="#">Làng Nghề</a></h2>
                <p>Khám phá các làng nghề truyền thống, tìm hiểu quá trình sản xuất và thưởng thức các sản phẩm độc đáo.</p>
              </div>
              <div className="flex-shrink-0 img-wrapper mt-4 mt-md-0">
                <a href="#" className="thumb position-relative d-block overflow-hidden position-relative rounded-4"><img src="assets/images/blog/langnghe.jpg" alt="" height="300" width="300" className="image-zoom-hover object-fit-cover w-100"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
