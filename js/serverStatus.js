var serverStatus = serverStatus || {};// end serverStatus namespace

// these keep track of the values obtained from the serverStatus api
serverStatus.serverDateTime = undefined;
serverStatus.serverOnline = undefined;
serverStatus.serverPopulation = undefined;

// the next UTC time that the server status API is updated
serverStatus.nextUpdate = undefined;

// these store the active intervals so they can be cleared later
serverStatus.clockLoop = undefined;

// intialize the server status
// this involves polling the api, parsing it, initializing the UI, and setting up intervals
serverStatus.init = function() {
  serverStatus.update();

  // Activate HoverBox for the server time element
  $('#serverTime').attr({ hbtitle: '<i class="fa fa-server"></i>Server Status', hbbodyelem: '#serverTimeHoverTemplate' });
};//end init

serverStatus.update = function() {
  if(serverStatus.clockLoop !== undefined)
    clearTimeout(serverStatus.clockLoop);

  var apiBaseURL = 'https://api.eveonline.com';
  var statusURL = '/server/ServerStatus.xml.aspx';

  $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
    if (status == 'success') {
      serverStatus.parseAPI(data);

      // Initialize the server time and set up an event to keep it updated
      setTimeout(function () {
        serverStatus.updateServerTime();
        serverStatus.updateNextUpdateUI();

        // set recurring event every minute
        serverStatus.clockLoop = setInterval(function() {
          serverStatus.updateServerTime();
          serverStatus.updateNextUpdateUI();
        }, ((1 * 1000) * 60)); // (1 second * 1000 ms) * 60s
      }, (60 - serverStatus.serverDateTime.getSeconds()) * 1000); // get seconds until next minute change

      // Set up next update time
      setTimeout(function() {
        serverStatus.update();
      }, serverStatus.nextUpdate.getTime() - serverStatus.serverDateTime.getTime());

      // Initialize UI
      serverStatus.updateUI(true);
      serverStatus.updateNextUpdateUI();
    }//end if
  });//end post
}//end update

// parse the api
// the argument 'data' contains the entire result from the api call
serverStatus.parseAPI = function(data) {
  // Set server status
  serverStatus.serverOnline = $('serverOpen', data).text() === 'True';

  // Set server population
  serverStatus.serverPopulation = $('onlinePlayers', data).text();
  
  // Set server time
  var rawTimeString = $('currentTime', data).text();
  if (rawTimeString != null) {
    // Replace the space between the date and time with a capital T
    // While Chrome is not picky about this, FF and IE appear to be
    rawTimeString = rawTimeString.replace(' ', 'T');
    serverStatus.serverDateTime = new Date(rawTimeString);
  }//end if

  // Set next update time
  var rawUpdateTimeString = $('cachedUntil', data).text();
  if (rawUpdateTimeString != null) {
    // Replace the space between teh date and time with a capital T
    // While Chrome is not picky about this, FF and IE appear to be
    rawUpdateTimeString = rawUpdateTimeString.replace(' ', 'T');
    serverStatus.nextUpdate = new Date(rawUpdateTimeString);
  }//emd if
};//end parseAPI

// this is called every minute to update the stored server time
// this will also re-draw the server time UI
serverStatus.updateServerTime = function() {
  serverStatus.serverDateTime.setSeconds(0);
  serverStatus.serverDateTime.setMinutes(serverStatus.serverDateTime.getMinutes() + 1);

  var hour = serverStatus.formatServerTime(serverStatus.serverDateTime.getUTCHours());
  var minute = serverStatus.formatServerTime(serverStatus.serverDateTime.getMinutes());

  serverStatus.updateUI();
};//end updateServerTime

// update the UI
serverStatus.updateUI = function(updateHoverBox) {
  $('#serverTime').html(serverStatus.getFormattedTime());
  
  // set default value of updateHoverBox to false
  updateHoverBox = updateHoverBox || false;

  if(updateHoverBox) {
    $('#serverTimeHoverTemplate .TQServerStatus').html(serverStatus.getFormattedServerOnline());
    $('#serverTimeHoverTemplate .TQPlayerCount').html(serverStatus.getFormattedPopulation());
  }//end if
};//end updateUI

serverStatus.updateNextUpdateUI = function() {
  $('#serverTimeHoverTemplate .TimeUntilUpdate').html(serverStatus.getFormattedUpdateTime());
}//end updateNextUpdateUI

// returns the formatted server time
serverStatus.getFormattedTime = function() {
  if(serverStatus.serverDateTime !== undefined) {
    return serverStatus.formatServerTime(serverStatus.serverDateTime.getUTCHours()) +
    ':' +
    serverStatus.formatServerTime(serverStatus.serverDateTime.getMinutes());
  }//end if
  else {
    return '00:00';
  }//end else
};//end getFormattedTime

// simply prepends a '0' if the hour or minute provided is less than 10
serverStatus.formatServerTime = function(value) {
  return ((value < 10) ? '0' : '') + value;
};//end formatServerTime

// returns an HTML span to display the server status
serverStatus.getFormattedServerOnline = function() {
  var onlineColor = '#00FFAA';
  var onlineText = 'Online';
  var onlineMessage = 'The server is currently open and is accepting connections.';

  var offlineColor = 'red';
  var offlineText = 'Offline';
  var offlineMessage = 'The server is not accepting connections at this time.';

  var serverOnlineSpan = document.createElement('SPAN');
  serverOnlineSpan.style.color = (serverStatus.serverOnline ? onlineColor : offlineColor);
  var serverOnlineText = document.createTextNode((serverStatus.serverOnline ? onlineText : offlineText));
  serverOnlineSpan.appendChild(serverOnlineText);

  var returnSpan = document.createElement('SPAN');
  returnSpan.appendChild(serverOnlineSpan);
  returnSpan.appendChild(document.createTextNode(' - ' + (serverStatus.serverOnline ? onlineMessage : offlineMessage)));

  return returnSpan;
};//end getFormattedServerOnline


serverStatus.getFormattedPopulation = function() {
  return serverStatus.serverPopulation;
};//end getFormattedPopulation

serverStatus.getFormattedUpdateTime = function() {
  var milliDiff = serverStatus.nextUpdate.getTime() - serverStatus.serverDateTime.getTime();

  var hourConv = ((1000 * 60) * 60); // (1000ms * 60s) * 60m
  var minConv = (1000 * 60); // 1000ms * 60s
  var secConv = 1000; // 1000ms

  var hours = Math.floor(milliDiff / hourConv);
  milliDiff -= hours * hourConv;
  var minutes = Math.floor(milliDiff / minConv);
  milliDiff -= minutes * minConv;
  var seconds = Math.round(milliDiff / secConv);

  var retVal = '';

  if(hours > 0 || minutes > 0) {
    retVal = 'Update in ';
    if(hours > 0) {
      retVal += hours + 'h';
    }//end if

    retVal += minutes + 'm';
  }//end if
  else {
    retVal = '<i class="fa fa-spinner fa-pulse"></i> Updating';
  }//end else

  return retVal;
};//end getFormattedUpdateTime
