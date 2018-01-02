const assert = require('assert');
const app = require('../../src/app');

describe('\'forums-detai\' service', () => {
  it('registered the service', () => {
    const service = app.service('forums-detai');

    assert.ok(service, 'Registered the service');
  });
});
