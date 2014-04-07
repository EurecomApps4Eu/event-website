var config = require('./config.js');
var $ = require('./bower_components/jquery/dist/jquery.min.js');
var Router = require('./app/router');

function loadCSS(path) {
  $('<link rel="stylesheet" type="text/css" href="' + path + '">').appendTo('head');
}

var $script = $('#apps4europeScript');

var $root = $('<div id="apps4europeRoot" />');
// Insert our root element right after the script
$root.insertAfter($script);

var eventId = $script.attr('data-event-id');

// Add Bootstrap
loadCSS(config.uri + '/bootstrap/bootstrap.min.css');
loadCSS(config.uri + '/bootstrap/bootstrap-theme.min.css');


// Add font awesome
loadCSS(config.uri + '/font-awesome/css/font-awesome.min.css');

// App css
loadCSS(config.uri + '/app.css');

// TODO
Router.init({
  $el: $root,
  eventId: eventId
});

if (location.hash && location.hash.length > 1) {
  Router.route(location.hash.substring(1));
}
else {
  Router.route('events/' + eventId);
}

window.addEventListener("message", function(message) {
  // TODO: Important, check origin!
  var functions = {
    setModalHeight: function(height) {
      $('#apps4euModal .modal-body').height(height);
      $('#apps4euModal').addClass('loaded');
    },
    closeModal: function() {
      window.closeApps4euModal();
    }
  };

  var data = JSON.parse(message.data);

  if ( data.fn && functions[data.fn] ) {
    functions[data.fn](data.argument);
  }
}, false);
