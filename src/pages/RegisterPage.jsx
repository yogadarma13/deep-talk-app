import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <div className="register-page__main">
      <RegisterInput handleRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;
