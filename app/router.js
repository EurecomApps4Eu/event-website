var View = require('./view');
var $ = require('../bower_components/jquery/dist/jquery.min.js');

var Router = {

  init: function(options) {
    this.$el = options.$el;
    this.eventId = options.eventId;

    // Need to watch location hash for changes
    window.onhashchange = function() {
      var newHash = location.hash.substring(1);
      if ( Router.prevHash !== newHash ) {
        Router.prevHash = newHash;
        Router.route(newHash);
      }
    }
  },

  setHash: function(hash) {
    // Prevent router from routing when manually setting the hash
    Router.prevHash = hash;
    location.hash = hash;
  },

  route: function(path, noHistory) {

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

        //  Add history entry for applications
        Router.setHash(matches[0]);

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

    applications: {
      pattern: /^applications\/(.+)/,
      fn: function(matches) {
        View.Application.init({
          $el: Router.$el,
          id: matches[1],
        });
      }
    },

  },

  initEventHandlers: function() {
    this.$el.on('click', 'a', function(e) {

      var $a = $(this);

      // TODO: move this to a smarter place
      if ( $a.is('#submitApp') ) {
        e.preventDefault();
        var popupHtml = require('./views/templates/popup.hbs')({
          title: 'Submit Application',
          body: '<iframe src="http://localhost:9000/#/apps/new?modal=true&connectedEvent='+Router.eventId+'"></iframe>'
        });
        var $overlay = $('<div id="apps4euOverlay"></div>').appendTo('body');
        var $popup = $(popupHtml);
        $popup.appendTo('body');
        $('body').addClass('apps4euModalActive');

        $popup.on('click', 'button.close', function(e) {
          window.closeApps4euModal();
        });
        window.closeApps4euModal = function() {
          e.preventDefault();
          $overlay.remove();
          $popup.remove();
          $('body').removeClass('apps4euModalActive');
        }

        return;
      }

      if ( $a.attr('href').substring(0,1) === '#' ) {
        e.preventDefault();
        Router.route($a.attr('href').substring(1));
      }

    });
  },

};

module.exports = Router;
