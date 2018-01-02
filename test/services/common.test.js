const assert = require('assert');
const app = require('../../src/app');

describe('\'common\' service', () => {
  it('registered the service', () => {
    const service = app.service('common');

    assert.ok(service, 'Registered the service');
  });
});
