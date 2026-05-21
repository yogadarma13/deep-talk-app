import { describe, expect, it } from 'vitest';
import isLoadingReducer from './reducer';
import { ActionType } from './action';

describe('isLoadingReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = false;
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = isLoadingReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return true when given by SET_LOADING action', () => {
    // arrange
    const initialState = false;
    const action = {
      type: ActionType.SET_LOADING,
      payload: {
        isLoading: true
      },
    };
    // action
    const nextState = isLoadingReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.isLoading);
  });
});
