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

// Add Bootstrap
loadCSS(config.uri + '/bootstrap/bootstrap.min.css');
loadCSS(config.uri + '/bootstrap/bootstrap-theme.min.css');

// Add font awesome
loadCSS(config.uri + '/font-awesome/css/font-awesome.min.css');

// TODO
Router.init({
  $el: $root,
});
Router.route('events/5327304205dcf7cd1a280554');
