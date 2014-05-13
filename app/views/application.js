var template = require('./templates/application.hbs');
var Model = require('../model');
var $ = require('../../bower_components/jquery/dist/jquery.min.js');
var config = require('../../config.js');

var Application = {

  init: function(options) {
    this.$el = options.$el;

    // TODO: query API and render results
    Model.Application.get(options.id, {
      data: {
        populate:'connectedEvent'
      },
      success: function(data) {
        var data = $.extend({}, data, {
          rdfRootUrl: config.restURI
        });
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
