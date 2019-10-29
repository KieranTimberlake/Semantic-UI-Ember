import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui accordion', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#ui-accordion class="styled"}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two
        </div>
      {{/ui-accordion}}
    `);

    // Test default state
    assert.dom('.ui.accordion').exists({ count: 1 });
    assert.dom('.ui.accordion .active').doesNotExist();
  });

  test('clicking activates title', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#ui-accordion class="styled"}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two
        </div>
      {{/ui-accordion}}
    `);

    // Test clicking activates accordion
    await click('.ui.accordion [data-id=title-2]');
    assert.dom('.ui.accordion [data-id=title-2].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 1 });
  });

  test('dynamically added content is clickable', async function(assert) {
    assert.expect(7);

    this.set('panes', A([]));

    await render(hbs`
      {{#ui-accordion class="styled"}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two
        </div>
        {{#each panes as |pane|}}
        <div class="title" data-id="extra-title-{{pane}}">
          Extra Section {{pane}}
        </div>
        <div class="content" data-id="extra-content-{{pane}}">
          Extra Content {{pane}}
        </div>
        {{/each}}
      {{/ui-accordion}}
    `);

    assert.dom('.ui.accordion').exists({ count: 1 });
    assert.dom('.ui.accordion .title').exists({ count: 2 });
    assert.dom('.ui.accordion .content').exists({ count: 2 });

    run(() => {
      this.get('panes').pushObjects([1,2]);
    });

    assert.dom('.ui.accordion .title').exists({ count: 4 });
    assert.dom('.ui.accordion .content').exists({ count: 4 });

    // Test clicking activates accordion
    await click('.ui.accordion [data-id=extra-title-1]');
    assert.dom('.ui.accordion [data-id=extra-title-1].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 1 });
  });

  test('exclusive false allows more than one active title', async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{#ui-accordion class="styled" exclusive=false}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two
        </div>
      {{/ui-accordion}}
    `);

    // Test clicking activates accordion
    await click('.ui.accordion [data-id=title-2]');
    assert.dom('.ui.accordion [data-id=title-2].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 1 });

    await click('.ui.accordion [data-id=title-1]');
    assert.dom('.ui.accordion [data-id=title-1].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 2 });
  });

  test('collapsible false allows doesnt allow active to close', async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{#ui-accordion class="styled" collapsible=false}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two
        </div>
      {{/ui-accordion}}
    `);

    assert.dom('.ui.accordion .active').doesNotExist();
    // Test clicking activates accordion
    await click('.ui.accordion [data-id=title-2]');
    assert.dom('.ui.accordion [data-id=title-2].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 1 });

    await click('.ui.accordion [data-id=title-2]');
    assert.dom('.ui.accordion .active').exists({ count: 1 });
  });

  test('composable action closes open tab', async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{#ui-accordion class="styled" collapsible=false as |execute|}}
        <div class="title" data-id="title-1">
          Semantic UI
        </div>
        <div class="content" data-id="content-1">
          Accordion Component
        </div>
        <div class="title" data-id="title-2">
          Section Two
        </div>
        <div class="content" data-id="content-2">
          Content Two

          <div class="ui button" data-id="content-2-button" {{action execute "close" 1}}>Close</div>
        </div>
      {{/ui-accordion}}
    `);

    assert.dom('.ui.accordion .active').doesNotExist();
    // Test clicking activates accordion
    await click('.ui.accordion [data-id=title-2]');
    assert.dom('.ui.accordion [data-id=title-2].active').exists({ count: 1 });
    assert.dom('.ui.accordion .active').exists({ count: 1 });

    await click('.ui.accordion [data-id=content-2-button]');

    let done = assert.async();

    setTimeout(() => {
      assert.dom('.ui.accordion .active').doesNotExist();
      done();
    }, 500);
  });
});