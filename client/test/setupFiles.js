import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

global.URL.createObjectURL = jest.fn(() => {
  return 'blob:http://localhost:3000/8d8bf970-4845-401b-8d6a-820a1798c2af'
})
