import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  addNewCommentActionCreator,
  asyncAddNewComment,
  asyncDownVoteComment,
  asyncDownVoteThread,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThread,
  clearThreadDetailActionCreator,
  clearVoteCommentActionCreator,
  clearVoteThreadActionCreator,
  downVoteCommentActionCreator,
  downVoteThreadActionCreator,
  receiveThreadDetailActionCreator,
  upVoteCommentActionCreator,
  upVoteThreadActionCreator,
} from './action';
import { hideLoading, showLoading } from '../loading/action';

const fakeResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeAddCommentResponse = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
  },
};

const threadDetailState = {
  threadDetail: fakeResponse,
};

const stateVoteUserNotExistData = {
  authUser: {
    id: 'users-1',
  },
  threadDetail: {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'Ini thread 1',
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  },
};

const stateUpVoteUserExistData = {
  authUser: {
    id: 'users-1',
  },
  threadDetail: {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'Ini thread 1',
    upVotesBy: ['users-1'],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ],
  },
};

const stateDownVoteUserExistData = {
  authUser: {
    id: 'users-1',
  },
  threadDetail: {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'Ini thread 1',
    upVotesBy: [],
    downVotesBy: ['users-1'],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ],
  },
};

const fakeErrorResponse = new Error('Failed');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    delete api._getThreadDetail;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getThreadDetail = () => Promise.resolve(fakeResponse);

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail(fakeResponse.id)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveThreadDetail(fakeResponse.id)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncAddNewComment thunk', () => {
  beforeEach(() => {
    api._addNewComment = api.addNewComment;
  });

  afterEach(() => {
    api.addNewComment = api._addNewComment;

    delete api._addNewComment;
  });

  it('should dispatch action correctly when add new comment success', async () => {
    api.addNewComment = () => Promise.resolve(fakeAddCommentResponse);

    const dispatch = vi.fn();
    const getState = () => threadDetailState;

    await asyncAddNewComment(fakeAddCommentResponse.content)(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addNewCommentActionCreator(fakeAddCommentResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when add new comment failed', async () => {
    api.addNewComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => threadDetailState;

    await asyncAddNewComment(fakeAddCommentResponse.content)(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
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
      upVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
    );
  });

  it('should dispatch action correctly when up vote thread success and userId is exists', async () => {
    api.clearVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );
  });

  it('should dispatch action correctly when up vote thread error and userId is not exists', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
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
      clearVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
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
      upVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
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
      downVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
    );
  });

  it('should dispatch action correctly when down vote thread success and userId is exists', async () => {
    api.clearVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );
  });

  it('should dispatch action correctly when down vote thread error and userId is not exists', async () => {
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteThreadActionCreator(stateVoteUserNotExistData.authUser.id),
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
      clearVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
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
      downVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator(stateUpVoteUserExistData.authUser.id),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpCommentThread thunk', () => {
  beforeEach(() => {
    api._upVoteComment = api.upVoteComment;
    api._clearVoteComment = api.clearVoteComment;
  });

  afterEach(() => {
    api.upVoteComment = api._upVoteComment;
    api.clearVoteComment = api._clearVoteComment;

    delete api._upVoteComment;
    delete api._clearVoteComment;
  });

  it('should dispatch action correctly when up vote comment success and userId is not exists', async () => {
    api.upVoteComment = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncUpVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );
  });

  it('should dispatch action correctly when up vote comment success and userId is exists', async () => {
    api.clearVoteComment = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncUpVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );
  });

  it('should dispatch action correctly when up vote comment error and userId is not exists', async () => {
    api.upVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncUpVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when up vote comment error and userId is exists', async () => {
    api.clearVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncUpVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when up vote comment error and userId is exists on downVotesBy', async () => {
    api.upVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncUpVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncDownVoteComment thunk', () => {
  beforeEach(() => {
    api._downVoteComment = api.downVoteComment;
    api._clearVoteComment = api.clearVoteComment;
  });

  afterEach(() => {
    api.downVoteComment = api._downVoteComment;
    api.clearVoteComment = api._clearVoteComment;

    delete api._downVoteComment;
    delete api._clearVoteComment;
  });

  it('should dispatch action correctly when down vote comment success and userId is not exists', async () => {
    api.downVoteComment = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncDownVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );
  });

  it('should dispatch action correctly when down vote comment success and userId is exists', async () => {
    api.clearVoteComment = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncDownVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );
  });

  it('should dispatch action correctly when down vote comment error and userId is not exists', async () => {
    api.downVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateVoteUserNotExistData;

    await asyncDownVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateVoteUserNotExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when down vote comment error and userId is exists', async () => {
    api.clearVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateDownVoteUserExistData;

    await asyncDownVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      clearVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when down vote comment error and userId is exists on upVotesBy', async () => {
    api.downVoteComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => stateUpVoteUserExistData;

    await asyncDownVoteComment('comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(stateUpVoteUserExistData.authUser.id, 'comment-1'),
    );

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});