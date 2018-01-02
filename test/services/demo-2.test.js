const assert = require('assert');
const app = require('../../src/app');

describe('\'demo2\' service', () => {
  it('registered the service', () => {
    const service = app.service('demo-2');

    assert.ok(service, 'Registered the service');
  });
});
