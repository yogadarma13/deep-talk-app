/**
 * skenario test for isLoadingReducers
 *
 * - isLoadingReducers function
 *   - should return the initial state when given by unknown action
 *   - should return true when given by SET_LOADING action
 */

import { describe, expect, it } from 'vitest';
import isLoadingReducer from './reducer';
import { ActionType } from './action';

describe('isLoadingReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = false;
    const action = { type: 'UNKNOWN' };

    const nextState = isLoadingReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return true when given by SET_LOADING action', () => {
    const initialState = false;
    const action = {
      type: ActionType.SET_LOADING,
      payload: {
        isLoading: true
      },
    };

    const nextState = isLoadingReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isLoading);
  });
});
