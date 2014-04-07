var template = require('./templates/application.hbs');
var Model = require('../model');

var Application = {

  init: function(options) {
    this.$el = options.$el;

    // TODO: query API and render results
    Model.Application.get(options.id, {
      data: {
        populate:'connectedEvent'
      },
      success: function(data) {
        Application.render(data);
      }
    });
  },

  render: function(data) {

    var html = template(data);
    this.$el.html(html);

  },

};

module.exports = Application;
