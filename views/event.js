var template = require('./templates/event.hbs');


var Event = {

  init: function(options) {
    this.$el = options.$el;

    // TODO: query API and render results
  },

  render: function() {

    var html = template();
    this.$el.html(html);

  },

};

module.exports = Event;
