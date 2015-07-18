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
    $.each(windowIDs, function (index, value) {
        if (!$(windowIDs[index]).hasClass('hidden')) {
            $(windowIDs[index]).addClass('hidden');
            resetWindow(windowIDs[index]);
        }//end if
    });//end each

    $(mainID).addClass('hidden');
}//end closeWindow

function resetWindow(targetID) {
    if (targetID == '#settings') {
        // reset Settings window
        $('input[name="oldPassword"]', targetID).val('');
        $('input[name="newPassword"]', targetID).val('');
        $('input[name="verifyPassword"]', targetID).val('');
    }//end if
}//end resetWindow

function openSettings() {
    showWindow('#settings');
}//end openSettings