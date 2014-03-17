var config = require('./config.js');
var $ = require('./bower_components/jquery/dist/jquery.min.js');
var Views = require('./views');

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

// TODO
Views.Event.init({
  $el: $root,
  event: $script.attr('data-event'),
});
