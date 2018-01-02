const assert = require('assert');
const app = require('../../src/app');

describe('\'importtags\' service', () => {
  it('registered the service', () => {
    const service = app.service('importtags');

    assert.ok(service, 'Registered the service');
  });
});
