import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui sticky', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`
      {{#ui-sticky}}
        <p>Some text</p>
      {{/ui-sticky}}
    `);

    assert.dom('.ui.sticky').exists({ count: 1 });
    assert.ok(this.$('.ui.sticky').css('width') !== undefined);
    assert.ok(this.$('.ui.sticky').css('height') !== undefined);
  });
});
