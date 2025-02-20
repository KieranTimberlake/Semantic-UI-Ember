import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as sub context', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <div class="component context">
        {{#ui-sidebar context=".component.context"}}
          <a class="item">1</a>
          <a class="item">2</a>
          <a class="item">3</a>
        {{/ui-sidebar}}
        <div class="pusher">
          Main Content here
        </div>
      </div>
    `);

    assert.dom('.ui.sidebar').exists({ count: 1 });
    assert.dom('.ui.sidebar a').exists({ count: 3 });
  });
});
