const ActionType = {
  SET_LOADING: 'SET_LOADING',
};

function showLoading() {
  return {
    type: ActionType.SET_LOADING,
    payload: {
      isLoading: true,
    },
  };
}

function hideLoading() {
  return {
    type: ActionType.SET_LOADING,
    payload: {
      isLoading: false,
    },
  };
}

export { ActionType, showLoading, hideLoading };