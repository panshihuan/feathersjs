const assert = require('assert');
const app = require('../../src/app');

describe('\'forums\' service', () => {
  it('registered the service', () => {
    const service = app.service('forums');

    assert.ok(service, 'Registered the service');
  });
});
