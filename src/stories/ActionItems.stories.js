import { fn } from 'storybook/test';
import ActionItems from '../components/ActionItems';

export default {
  title: 'ActionItems',
  component: ActionItems,
  tags: ['autodocs'],
  args: {
    upVoteHandler: fn(),
    downVoteHandler: fn(),
  },
};

export const Default = {
  args: {
    userId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
};

export const UpVotesActive = {
  args: {
    userId: 'user-1',
    totalComments: 0,
    upVotesBy: ['user-1'],
    downVotesBy: [],
  },
};

export const DownVotesActive = {
  args: {
    userId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: ['user-1'],
  },
};
