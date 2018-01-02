const assert = require('assert');
const app = require('../../src/app');

describe('\'groupConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('group-config');

    assert.ok(service, 'Registered the service');
  });
});
