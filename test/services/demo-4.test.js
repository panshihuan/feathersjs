const assert = require('assert');
const app = require('../../src/app');

describe('\'demo4\' service', () => {
  it('registered the service', () => {
    const service = app.service('demo-4');

    assert.ok(service, 'Registered the service');
  });
});
