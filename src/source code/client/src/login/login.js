import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <div style={{ background: 'white' }} className="p-3 p-sm-5 justify-content-center">
      <div className="row g-4 g-xl-5 justify-content-center">
        <div className="col-xl-5 d-flex justify-content-center">
          <div className="authentication-wrap overflow-hidden position-relative text-center text-sm-start my-5">
            <div className="mb-5">
              <h2 className="display-6 fw-semibold mb-3"> Vui lòng <span className="font-caveat text-primary">Đăng nhập</span> để vào bảng điều khiển.</h2>
              <p className="mb-0">Truy cập vào bảng điều khiển quản trị để quản lý nội dung địa điểm du lịch và các dịch vụ liên quan.</p>
            </div>
            <form onSubmit={handleLogin} className="register-form">
              <div className="form-group mb-4">
                <label className="required">Tên Tài Khoản</label>
                <input style={{ background: 'white' }} type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control " />
                <div className="invalid-feedback text-start">Nhập tên tài khoản hợp lệ</div>
              </div>
              <div className="form-group mb-4 position-relative">
                <label className="required">Mật Khẩu</label>
                <input style={{ background: 'white' }} id="password" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control password" autoComplete="off" />
                <i onClick={() => setShowPassword(!showPassword)} className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">Đăng Nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
