import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui embed', function(hooks) {
  setupRenderingTest(hooks);

  test('it embeds youtube by id', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{ui-embed data-source="youtube" data-id="pfdu_gTry8E"}}
    `);

    assert.dom('.ui.embed .embed iframe').exists({ count: 1 });
    let src = find('.ui.embed .embed iframe').getAttribute('src');
    assert.ok(src.indexOf('youtube.com') >= 0);
  });

  test('it embeds through a url', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{ui-embed data-url="https://www.youtube.com/embed/pfdu_gTry8E"}}
    `);

    assert.dom('.ui.embed .embed iframe').exists({ count: 1 });
    let src = find('.ui.embed .embed iframe').getAttribute('src');
    assert.ok(src.indexOf('youtube.com') >= 0);
  });

  test('embeds works through parameters', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{ui-embed url="https://www.youtube.com/embed/pfdu_gTry8E"}}
    `);

    assert.dom('.ui.embed .embed iframe').exists({ count: 1 });
    let src = find('.ui.embed .embed iframe').getAttribute('src');
    assert.ok(src.indexOf('youtube.com') >= 0);
  });
});
