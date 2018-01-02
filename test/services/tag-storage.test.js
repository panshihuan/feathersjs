const assert = require('assert');
const app = require('../../src/app');

describe('\'tagStorage\' service', () => {
  it('registered the service', () => {
    const service = app.service('tag-storage');

    assert.ok(service, 'Registered the service');
  });
});
