/**
 * Setup a mock hammer.js object, for unit testing.
 *
 * Inspiration: https://github.com/uber/deck.gl/pull/658
 *
 * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
 */
function hammerMock() {
  const noop = () => {}

  return {
    on: noop,
    off: noop,
    destroy: noop,
    emit: noop,

    //eslint-disable-next-line no-unused-vars
    get: function(m) {
      return {
        set: noop
      }
    }
  }
}

if (typeof window !== 'undefined') {
  var propagating = require('propagating-hammerjs')
  var Hammer = window['Hammer'] || require('hammerjs')
  module.exports = propagating(Hammer, {
    preventDefault: 'mouse'
  })
} else {
  module.exports = function() {
    // hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
    return hammerMock()
  }
}
