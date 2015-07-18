var windowIDs = [
    '#settings'
];

var mainID = '#main';

function windows_addEventListeners() {
    $('#openSettings').click(openSettings);
    $('#closeButton').click(closeWindow);
}//end addEventListeners

function showWindow(targetID) {
    for (var i = 0; i < windowIDs.length; i++) {
        if (targetID != windowIDs[i]) {
            $(windowIDs[i]).addClass('hidden');
        }//end if
    }//end for

    $(targetID).removeClass('hidden');
    $(mainID).removeClass('hidden');
}//end showWindow

function closeWindow() {
    $.each(windowIDs, function () {
        if (!$(this).hasClass('hidden')) {
            $(this).addClass('hidden');
        }//end if
    });//end each

    $(mainID).addClass('hidden');
}//end closeWindow

function openSettings() {
    showWindow('#settings');
}//end openSettings