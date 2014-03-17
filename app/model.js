var $ = require('../bower_components/jquery/dist/jquery.min.js');
var config = require('../config');

var Model = {

  ajax: function(options) {
    options.dataType = options.dataType || 'json';
    options.type = options.type || 'GET';
    options.url = config.restURI + options.url;

    $.ajax(options);
  },

  Base: {
    // Each model must specify the path
    path: '',

    get: function(id, options) {
      options.url = this.path + '/' + id;
      Model.ajax(options);
    },
    post: function(data, options) {
      options.url = this.path;
      options.data = data;
      options.type = 'POST';
      Model.ajax(options);
    },
    put: function(id, data, options) {

    },
    delete: function(id, options) {

    }
  },
};

Model.Event = $.extend({}, Model.Base, {
  path: '/events',
});

Model.Application = $.extend({}, Model.Base, {
  path: '/applications',
});

module.exports = Model;
