import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  addNewThreadActionCreator,
  asyncAddNewThread,
  asyncDownVoteThread,
  asyncUpVoteThread,
  clearVoteThreadActionCreator,
  downVoteThreadActionCreator,
  upVoteThreadActionCreator,
} from './action';
import { hideLoading, showLoading } from '../loading/action';

const fakeAddThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const stateVoteUserNotExistData = {
  authUser: {
    id: 'users-1',
  },
  threads: [
    {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Ini thread 1',
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const stateUpVoteUserExistData = {
  authUser: {
    id: 'users-1',
  },
  threads: [
    {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Ini thread 1',
      upVotesBy: ['users-1'],
      downVotesBy: [],
    },
  ],
};

const stateDownVoteUserExistData = {
  authUser: {
    id: 'users-1',
  },
  threads: [
    {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Ini thread 1',
      upVotesBy: [],
      downVotesBy: ['users-1'],
    },
  ],
};

const fakeErrorResponse = new Error('Failed');

describe('asyncAddNewThread thunk', () => {
  beforeEach(() => {
    api._addNewThread = api.addNewThread;
  });

  afterEach(() => {
    api.addNewThread = api._addNewThread;

    delete api._addNewThread;
  });

  it('should dispatch action correctly when add new thread success', async () => {
    api.addNewThread = () => Promise.resolve(fakeAddThreadResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncAddNewThread({ ...fakeAddThreadResponse })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addNewThreadActionCreator(fakeAddThreadResponse),
    );
    expect(window.alert).toHaveBeenCalledWith('Thread added successfully');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when add new thread failed', async () => {
    api.addNewThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncAddNewThread({ ...fakeAddThreadResponse })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpVoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._clearVoteThread = api.clearVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.clearVoteThread = api._clearVoteThread;

    delete api._upVoteThread;
    delete api._clearVoteThread;
  });

  it('should dispatch action correctly when up vote thread success and userId is not exists', async () => {
    api.upVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );
  });

  it('should dispatch action correctly when up vote thread success and userId is exists', async () => {
    api.clearVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );
  });

  it('should dispatch action correctly when up vote thread error and userId is not exists', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when up vote thread error and userId is exists', async () => {
    api.clearVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when up vote thread error and userId is exists on downVotesBy', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncDownVoteThread thunk', () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
    api._clearVoteThread = api.clearVoteThread;
  });

  afterEach(() => {
    api.downVoteThread = api._downVoteThread;
    api.clearVoteThread = api._clearVoteThread;

    delete api._downVoteThread;
    delete api._clearVoteThread;
  });

  it('should dispatch action correctly when down vote thread success and userId is not exists', async () => {
    api.downVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );
  });

  it('should dispatch action correctly when down vote thread success and userId is exists', async () => {
    api.clearVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );
  });

  it('should dispatch action correctly when down vote thread error and userId is not exists', async () => {
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateVoteUserNotExistData.authUser.id,
        stateVoteUserNotExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when down vote thread error and userId is exists', async () => {
    api.clearVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when down vote thread error and userId is exists on upVotesBy', async () => {
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(
        stateUpVoteUserExistData.authUser.id,
        stateUpVoteUserExistData.threads[0].id,
      ),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});