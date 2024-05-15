import { jest } from '@jest/globals';
module.exports = {
  Mr_Dafoe: jest.fn(() => ({
    className: 'mocked-mr-dafoe-font',
  })),
  Staatliches: jest.fn(() => ({
    className: 'mocked-staatliches-font',
  })),
  Mulish: jest.fn(() => ({
    className: 'mocked-mulish-font',
  })),
};
