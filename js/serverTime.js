var serverDateTime;
var serverStatus;
var serverPopulation;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            // Set server status
            serverStatus = $('serverOpen', data).text();
            if (serverStatus === 'True') {
                $('#serverTimeHoverTemplate .TQServerStatus').html('Online').css({ color: 'green' });
            }//end if
            else {
                $('#serverTimeHoverTemplate .TQServerStatus').html('Offline').css({ color: 'red' });
            }

            // Set server population
            serverPopulation = $('onlinePlayers', data).text();
            $('#serverTimeHoverTemplate .TQPlayerCount').html(serverPopulation);

            // Activate HoverBox for the server time element
            $('#serverTime').attr({ HBTitle: 'Server Status', HBBodyElem: '#serverTimeHoverTemplate' });

            // Set server time
            var rawTimeString = $('currentTime', data).text();
            if (rawTimeString != null) {
                // Replace the space between the date and time with a capital T
                // While Chrome is not picky about this, FF and IE appear to be
                rawTimeString = rawTimeString.replace(' ', 'T');
                serverDateTime = new Date(rawTimeString);

                // Set inital time
                $('#serverTime').html(formatServerTime(serverDateTime.getUTCHours()) +
                    ':' +
                    formatServerTime(serverDateTime.getMinutes()));

                // Initialize the server time and set up an event to keep it updated
                setTimeout(function () {
                    updateServerTime();

                    // set recurring event every minute
                    setInterval(updateServerTime, ((1 * 1000) * 60)); // (1 second * 1000 ms) * 60s
                }, (60 - serverDateTime.getSeconds()) * 1000); // get seconds until next minute change
            }//end if
        }//end if
    });//end post
}//end serverTime_init

function updateServerTime() {
    serverDateTime.setSeconds(0);
    serverDateTime.setMinutes(serverDateTime.getMinutes() + 1);

    var hour = formatServerTime(serverDateTime.getUTCHours());
    var minute = formatServerTime(serverDateTime.getMinutes());

    var timeDiv = $('#serverTime').html(hour + ':' + minute);
}//end updateServerTime

function formatServerTime(value) {
    return ((value < 10) ? '0' : '') + value;
}//end formatServerTime