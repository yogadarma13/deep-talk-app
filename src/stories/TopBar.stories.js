import { fn } from 'storybook/test';
import TopBar from '../components/TopBar';

export default {
  title: 'TopBar',
  component: TopBar,
  tags: ['autodocs'],
  args: {
    onLogout: fn(),
  },
};

export const Default = {
  args: {
    pathname: '',
  },
};

export const WithoutAddThreadButton = {
  args: {
    pathname: '/addThread',
  },
};
