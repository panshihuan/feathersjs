const assert = require('assert');
const app = require('../../src/app');

describe('\'getClass\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-class');

    assert.ok(service, 'Registered the service');
  });
});
