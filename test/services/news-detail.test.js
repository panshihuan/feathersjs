const assert = require('assert');
const app = require('../../src/app');

describe('\'news-detail\' service', () => {
  it('registered the service', () => {
    const service = app.service('news-detail');

    assert.ok(service, 'Registered the service');
  });
});
