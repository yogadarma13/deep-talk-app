/**
 * skenario test for usersReducers
 *
 * - usersReducers function
 *   - should return the initial state when given by unknown action
 *   - should return all users when given by RECEIVE_USERS action
 */

import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return all users when given by RECEIVE_USERS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
