import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

global.URL.createObjectURL = jest.fn(() => {
  return 'blob:'
})
