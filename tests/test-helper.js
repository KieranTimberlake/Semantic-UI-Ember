import jQuery from 'jquery';
import resolver from './helpers/resolver';
import { setResolver } from '@ember/test-helpers';
import { start } from 'ember-cli-qunit';

setResolver(resolver);

jQuery.fn.modal.settings.context = "#ember-testing";

start();
