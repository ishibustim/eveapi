// windows.js
//
// This handles displaying various windows in the #main div﻿

var windows = windows || {};

// This object is an enum for the index of the windowIDs array
windows.windowTypes = {
  settings: 0
};

// This array contains the IDs of each <div> that can be displayed as a window
windows.windowIDs = [
  '#settings'
];

// This is the id of the #main div
windows.mainID = '#main';

windows.init = function() {
  windows.addEventListeners();
};

// Add event listeners for all buttons which show a new window
// Also, add an event listener to the close button for the #main div
windows.addEventListeners = function() {
  $('#openSettings').click(windows.openSettings);
  $('#closeButton').click(windows.closeWindow);
};//end addEventListeners

// Shows a window based on the id
windows.showWindow = function(targetID) {
  for (var i = 0; i < windows.windowIDs.length; i++) {
    if (targetID != windows.windowIDs[i]) {
      $(windows.windowIDs[i]).addClass('hidden');
    }//end if
  }//end for

  $(targetID).removeClass('hidden');
  $(windows.mainID).removeClass('hidden');
};//end showWindow

// Closes any open window
windows.closeWindow = function() {
  $.each(windows.windowIDs, function (index, value) {
    if (!$(windows.windowIDs[index]).hasClass('hidden')) {
      $(windows.windowIDs[index]).addClass('hidden');
      windows.resetWindow(windows.windowIDs[index]);
    }//end if
  });//end each

  $(windows.mainID).addClass('hidden');
};//end closeWindow

// Reset the window based on id
// Each window will have an if block here for resetting the fields in that window
windows.resetWindow = function(targetID) {
  if (targetID == '#settings') {
    // reset Settings window
    $('input[name="oldPassword"]', targetID).val('');
    $('input[name="newPassword"]', targetID).val('');
    $('input[name="verifyPassword"]', targetID).val('');
  }//end if
}//end resetWindow

// Open the settings window
// This simply calls windows.showWindow() with the settings id
windows.openSettings = function() {
  windows.showWindow(windows.windowIDs[windows.windowTypes.settings]);
};//end openSettings
