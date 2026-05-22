import { describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncPreloadProcess thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    //   arrange
    api.getOwnProfile = () => Promise.resolve(fakeProfileResponse);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeProfileResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    //   arrange
    api.getOwnProfile = () => Promise.reject();
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });
});
