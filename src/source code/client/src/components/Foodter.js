import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: 'brown',
        color: 'white',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 10px',
    };

    return (
        <footer className="main-footer overflow-hidden position-relative pt-5" style={footerStyle}>
            <div className="container border-top">
                <div className="align-items-center g-3 py-4 row">
                    <div className="col-lg-auto">
                        {/* start footer nav */}
                        {/* <ul className="list-unstyled list-separator mb-2 footer-nav d-flex">
                            <li className="list-inline-item">
                                <a href="/privacy" style={linkStyle}>Chính Sách Bảo Mật</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/sitemap" style={linkStyle}>Sơ Đồ Trang Web</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/cookies" style={linkStyle}>Chính Sách Cookie</a>
                            </li>
                        </ul> */}
                        {/* end /. footer nav */}
                    </div>
                    <div className="col-lg order-md-first">
                        <div className="align-items-center row">
                            {/* start footer logo */}
                            <a href="index.html" className="col-sm-auto footer-logo mb-2 mb-sm-0">
                                <img src="/assets/images/travellogo2.png" alt="Logo" style={{ maxWidth: '100px' }} />
                            </a>
                            {/* end /. footer logo */}
                            {/* start text */}
                            <div className="col-sm-auto copy"> Du Lịch Tây Nam Bộ - Khám Phá Miền Sông Nước</div>
                            {/* end /. text */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
