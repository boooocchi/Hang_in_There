import { jest } from '@jest/globals';
module.exports = {
  Staatliches: jest.fn(() => ({
    className: 'mocked-staatliches-font',
  })),
  Mulish: jest.fn(() => ({
    className: 'mocked-mulish-font',
  })),
};
