import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import isLoadingReducer from './loading/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    isLoading: isLoadingReducer
  },
});

export default store;
