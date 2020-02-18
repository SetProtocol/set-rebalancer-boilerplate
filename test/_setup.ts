// Mock console to avoid a bunch of printouts when running tests
(global as any).console = {
  log: jest.fn(),
  error: jest.fn(),
};
