import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | question-slug-from-title', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /question-slug-from-title redirects to login page', 
  async function(assert) {
    await visit('/question-slug-from-title/1');

    assert.dom('button.btn.btn-primary').hasText('Login');
  });
});
