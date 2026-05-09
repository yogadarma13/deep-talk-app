import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER'
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  };
}

function asyncRegisterUser({ name, email, password, navigate }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      alert('Berhasil membuat akun');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      alert(`Selamat datang, ${authUser.name}`);
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, asyncRegisterUser, asyncLoginUser };
