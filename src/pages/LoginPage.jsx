import React from 'react';
import LoginInput from '../components/LoginInput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoginUser } from '../states/authUser/action';

function LoginPage() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncLoginUser({ email, password }));
  };

  return (
    <div className="login-page__main">
      <LoginInput isLoading={isLoading} handleLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
