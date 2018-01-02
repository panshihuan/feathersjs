const assert = require('assert');
const app = require('../../src/app');

describe('\'itemConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('item-config');

    assert.ok(service, 'Registered the service');
  });
});
