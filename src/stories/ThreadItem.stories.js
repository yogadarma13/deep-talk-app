import { fn } from 'storybook/test';
import ThreadItem from '../components/ThreadItem';

export default {
  title: 'ThreadItem',
  component: ThreadItem,
  args: {
    handleUpVote: fn(),
    handleDownVote: fn(),
  },
};

export const Default = {
  args: {
    userId: 'user-1',
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    user: {
      name: 'Yoga Darma',
      avatar: 'https://avatars.githubusercontent.com/u/37299231?v=4',
    },
  },
};
