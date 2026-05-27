import { fn } from 'storybook/test';
import FieldInput from '../components/FieldInput';

export default {
  title: 'FieldInput',
  component: FieldInput,
  tags: ['autodocs'],
  args: {
    handleInput: fn(),
  },
};

export const Default = {
  args: {
    label: 'Label',
    type: 'text',
    value: '',
  },
};

export const Email = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'tes@gmail.com',
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    value: '123456',
  },
};
