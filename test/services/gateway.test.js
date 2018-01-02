const assert = require('assert');
const app = require('../../src/app');

describe('\'gateway\' service', () => {
  it('registered the service', () => {
    const service = app.service('gateway');

    assert.ok(service, 'Registered the service');
  });
});
