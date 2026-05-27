import { fn } from 'storybook/test';
import DetailItem from '../components/DetailItem';

export default {
  title: 'DetailItem',
  component: DetailItem,
  tags: ['autodocs'],
  args: {
    handleUpVote: fn(),
    handleDownVote: fn(),
  },
};

export const Default = {
  args: {
    userId: 'users-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerName: 'Yoga Darma',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/37299231?v=4',
    upVotesBy: [],
    downVotesBy: [],
    comments: [],
  },
};
