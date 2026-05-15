import React from 'react';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncLoginUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const onLogin = ({ email, password }) => {
    dispatch(asyncLoginUser({ email, password }));
  };

  return (
    <div className="login-page__main">
      <LoginInput handleLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
