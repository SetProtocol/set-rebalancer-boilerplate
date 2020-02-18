import request from "supertest";

import app from "../../src/app";
import { setProtocol } from "../../src/util/ethereum";

var request = require('supertest');

describe('rebalanceController', function () {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
    process.env.INFURA_API_HOST = 'https://kovan.infura.io/';
    process.env.INTERNAL_ACCESS_TOKEN = 'internal-access-token';
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.env = OLD_ENV;
  });

  describe('rebalance', function () {
    const setAddress = '0x3jk21lhjkl3d338198fe1c91e0e028b3bd0ba1bfd';
    const updateTransactionHash = '0x472309847132781324901273947239049';

    it('rebalances', function testRebalance(done) {
      setProtocol.socialTrading.updateAllocationAsync = jest.fn()
        .mockImplementationOnce((managerAddress, setAddress, allocation, liquidatorData) => Promise.resolve(updateTransactionHash))

      request(app)
        .post(`/rebalance/${setAddress}`)
        .send({ allocation: 50, id: "testset" })
        .set('Internal-Access-Token', 'internal-access-token')
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body['transaction_hash']).toBe(updateTransactionHash);

          if (err) return done(err);
          done();
        });
    });

    it('should return 400 with invalid addresses', function testInvalidUser(done) {
      setProtocol.socialTrading.updateAllocationAsync = jest.fn()
        .mockImplementationOnce((managerAddress, setAddress, allocation, liquidatorData) => Promise.reject('Invalid address.'))

      request(app)
        .post(`/rebalance/${setAddress}`)
        .send({ allocation: 50, id: "testset" })
        .set('Internal-Access-Token', 'internal-access-token')
        .end((err, res) => {
          expect(res.status).toBe(400);
          expect(res.body.error.type).toBe('InvalidRequest');
          expect(res.body.error.message).toBe('Invalid address.');

          if (err) return done(err);
          done();
        });
    });

    it('should return 401 with invalid access', function testInvalidAccess(done) {
      setProtocol.socialTrading.updateAllocationAsync = jest.fn()
        .mockImplementationOnce((managerAddress, setAddress, allocation, liquidatorData) => Promise.reject('Invalid address.'))

      request(app)
        .post(`/rebalance/${setAddress}`)
        .end((err, res) => {
          expect(res.status).toBe(401);
          expect(res.body.error.type).toBe('InvalidAccess');
          expect(res.body.error.message).toBe('You are not authorized to call this API.');

          if (err) return done(err);
          done();
        });
    });
  });
});
