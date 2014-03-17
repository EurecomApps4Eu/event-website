var View = require('./view');
var $ = require('../bower_components/jquery/dist/jquery.min.js');

var Router = {

  init: function(options) {
    this.$el = options.$el;
  },

  route: function(path) {

    var matches;
    var routeFound = false;

    for ( var key in this.routes ) {

      var val = this.routes[key];

      if ( matches = path.match(val.pattern) ) {

        routeFound = true;

        // Remove previous event handlers (if the views have added listeners etc.)
        this.$el.off();

        // Init event handlers for links etc.
        this.initEventHandlers();

        // Ececute the matching route
        val.fn(matches);

        break;
      }

    }

    if ( routeFound === false ) {
      console.log('Route not found: ' + path);
    }

  },

  routes: {

    events: {
      pattern: /^events\/(.+)/,
      fn: function(matches) {
        View.Event.init({
          $el: Router.$el,
          id: matches[1],
        });
      }
    },

    postEvent: {
      pattern: 'addEvent',
      fn: function() {
        View.EventForm.init({
          $el: Router.$el,
          Router: Router,
        });
      },
    },

    applications: {
      pattern: /^applications\/(.+)/,
      fn: function(matches) {
        View.Application.init({
          $el: Router.$el,
          id: matches[1],
        });
      }
    },

    addApplication: {
      pattern: 'addApplication',
      fn: function() {
        View.ApplicationForm.init({
          $el: Router.$el,
          Router: Router,
        });
      },
    },

  },

  initEventHandlers: function() {
    this.$el.on('click', 'a', function(e) {

      var $a = $(this);

      if ( $a.attr('href').substring(0,1) === '#' ) {
        e.preventDefault();
        Router.route($a.attr('href').substring(1));
      }

    });
  },

};

module.exports = Router;
