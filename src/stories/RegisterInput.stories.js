import { fn } from 'storybook/test';
import RegisterInput from '../components/RegisterInput';

export default {
  title: 'RegisterInput',
  component: RegisterInput,
  tags: ['autodocs'],
  args: {
    handleRegister: fn(),
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
