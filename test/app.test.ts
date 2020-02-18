import request from "supertest";

import app from "../src/app";

var request = require('supertest');

describe('loading express app', function () {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
    process.env.INFURA_API_HOST = 'https://kovan.infura.io/';
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.env = OLD_ENV;
  });

  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});
