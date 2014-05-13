var template = require('./templates/event.hbs');
var Model = require('../model');
var $ = require('../../bower_components/jquery/dist/jquery.min.js');
var config = require('../../config.js');

function formatDate(dateString) {
  return dateString.substring(0, 10);
}

var eventData = {};
var apps = {};
function populateWinnerApps() {
  if ( $.isEmptyObject(apps) ) {
    return;
  }

  if ( eventData.firstPrizeWinners ) {
    $.each(eventData.firstPrizeWinners, function(i, appId) {
      eventData.firstPrizeWinners[i] = apps[appId];
    });
  }

  if ( eventData.secondPrizeWinners ) {
    $.each(eventData.secondPrizeWinners, function(i, appId) {
      eventData.secondPrizeWinners[i] = apps[appId];
    });
  }

  if ( eventData.thirdPrizeWinners ) {
    $.each(eventData.thirdPrizeWinners, function(i, appId) {
      eventData.thirdPrizeWinners[i] = apps[appId];
    });
  }
}

var Event = {

  init: function(options) {
    this.$el = options.$el;

    Model.Event.get(options.id, {
      success: function(data) {

        data.startDate = formatDate(data.startDate);
        data.endDate = formatDate(data.endDate);

        $.extend(eventData, data, {
          rdfRootUrl: config.restURI
        });
        populateWinnerApps();
        Event.render(eventData);
      }
    });

    // Fetch applications connected to this event
    Model.Application.get({
      data: {
        connectedEvent: options.id,
        published: true
      },
      success: function(data) {

        $.each(data, function(i, app) {
          apps[app._id] = app;
        })

        populateWinnerApps();

        $.extend(eventData, {
          applications: data
        });
        Event.render(eventData);
      }
    });
  },

  render: function(data) {

    var html = template(data);
    this.$el.html(html);

  },

};

module.exports = Event;
