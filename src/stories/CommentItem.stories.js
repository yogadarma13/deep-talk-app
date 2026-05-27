import { fn } from 'storybook/test';
import CommentItem from '../components/CommentItem';

export default {
  title: 'CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  args: {
    handleUpVote: fn(),
    handleDownVote: fn(),
  },
};

export const Default = {
  args: {
    userId: 'users-1',
    name: 'Yoga Darma',
    avatar: 'https://avatars.githubusercontent.com/u/37299231?v=4',
    content: 'Ini adalah comment pertama',
    createdAt: '2021-06-21T07:00:00.000Z',
    upVotesBy: [],
    downVotesBy: []
  },
};
