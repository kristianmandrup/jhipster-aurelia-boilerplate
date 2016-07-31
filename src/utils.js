import filterFilter from './utils/filter';
import forEach from './utils/filter';
import timeout from './utils/timeout';

export default {
  filter: (expr) => {
    return filterFilter;
  },
  forEach: forEach,
  timeout: timeout,
  element: (selectors) => {
    return document.querySelector(selectors)[0];
  },
  isUndefined: function(value) { return typeof value === 'undefined'; }
}