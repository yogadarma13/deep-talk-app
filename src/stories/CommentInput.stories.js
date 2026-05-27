import { fn } from 'storybook/test';
import CommentInput from '../components/CommentInput';

export default {
  title: 'CommentInput',
  component: CommentInput,
  args: {
    handleAddComment: fn(),
  },
};

export const Default = {
  args: {},
};

export const Loading = {
  args: {
    isLoading: true
  },
};
