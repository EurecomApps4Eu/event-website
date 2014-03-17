var template = require('./templates/event.hbs');
var Model = require('../model');

var Event = {

  init: function(options) {
    this.$el = options.$el;

    // TODO: query API and render results
    Model.Event.get(options.id, {
      success: function(data) {
        Event.render(data);
      }
    });
  },

  render: function(data) {

    var html = template(data);
    this.$el.html(html);

  },

};

module.exports = Event;
