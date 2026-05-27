import { fn } from 'storybook/test';
import LoginInput from '../components/LoginInput';

export default {
  title: 'LoginInput',
  component: LoginInput,
  args: {
    handleLogin: fn(),
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
