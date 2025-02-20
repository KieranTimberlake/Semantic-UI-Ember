import Component from '@ember/component';
import Base from '../mixins/base';
import layout from '../templates/components/ui-rating';

export default Component.extend(Base, {
  layout,
  module: 'rating',
  classNames: ['ui', 'rating'],
  ignorableAttrs: ['rating'],

  willInitSemantic(settings) {
    this._super(...arguments);
    if (settings.initialRating == null && this.get('rating')) {
      settings.initialRating = this.get('rating');
    }
  }
});
