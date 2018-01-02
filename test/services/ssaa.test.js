const assert = require('assert');
const app = require('../../src/app');

describe('\'ssaa\' service', () => {
  it('registered the service', () => {
    const service = app.service('ssaa');

    assert.ok(service, 'Registered the service');
  });
});
