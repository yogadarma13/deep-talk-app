import React from 'react';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncLoginUser } from '../states/authUser/action';
import { Link } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const onLogin = ({ email, password }) => {
    dispatch(asyncLoginUser({ email, password }));
  };

  return (
    <div className="login-page__main">
      <LoginInput handleLogin={onLogin} />
      <p>
          Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
}

export default LoginPage;
