import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const { isLoading } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password, navigate }));
  };

  return (
    <div className="register-page__main">
      <RegisterInput isLoading={isLoading} handleRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;
