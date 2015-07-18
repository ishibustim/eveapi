var windowIDs = [
    '#settings'
];

function windows_addEventListeners() {
    $('#openSettings').click(openSettings);
}//end addEventListeners

function showWindow(targetID) {
    for (var i = 0; i < windowIDs.length; i++) {
        if (targetID != windowIDs[i]) {
            $(windowIDs[i]).addClass('hidden');
        }//end if
    }//end for

    $(targetID).removeClass('hidden');
}//end showWindow

function openSettings() {
    showWindow('#settings');
}//end openSettings