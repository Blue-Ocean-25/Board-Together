import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

global.URL = (() => {
  return {
    createObjectURL: () => {
      return 'test.png'
    }
  };
});