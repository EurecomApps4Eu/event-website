var template = require('./templates/eventForm.hbs');
var Model = require('../model');
var $ = require('../../bower_components/jquery/dist/jquery.min.js');

var EventForm = {

  init: function(options) {
    this.$el = options.$el;
    this.Router = options.Router;
    this.initEventHandlers();
    this.render();
  },

  initEventHandlers: function() {
    this.$el.on('submit', 'form', function(e) {
      e.preventDefault();
      EventForm.submit();
    });
  },

  submit: function() {

    var serializedArray = this.$el.find('form').serializeArray();
    var data = {};

    $.each(serializedArray, function(i, input) {
      data[input.name] = input.value;
    });

    Model.Event.post(data, {

      success: function(data) {
        EventForm.Router.route('events/' + data._id);
      }

    });
  },

  render: function() {
    var html = template();
    this.$el.html(html);
  },

};

module.exports = EventForm;
