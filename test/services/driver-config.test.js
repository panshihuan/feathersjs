const assert = require('assert');
const app = require('../../src/app');

describe('\'driverConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('driver-config');

    assert.ok(service, 'Registered the service');
  });
});
