var serverDateTime;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            var rawTimeString = $('currentTime', data).text();            
            serverDateTime = new Date(rawTimeString);

            if (rawTimeString != null) {
                // Set inital time
                $('#serverTime').html(formatServerTime(serverDateTime.getHours()) +
                    ':' +
                    formatServerTime(serverDateTime.getMinutes()));

                // Initialize the server time and set up an event to keep it updated
                setTimeout(function () {
                    updateServerTime();

                    // set recurring event every minute
                    setInterval(updateServerTime, ((1 * 1000) * 60)); // (1 second * 1000 ms) * 60s
                }, 60 - serverDateTime.getSeconds()); // get seconds until next minute change
            }//end if
        }//end if
    });//end post
}//end serverTime_init

function updateServerTime() {
    serverDateTime.setSeconds(0);
    serverDateTime.setMinutes(serverDateTime.getMinutes() + 1);

    var hour = formatServerTime(serverDateTime.getHours());
    var minute = formatServerTime(serverDateTime.getMinutes());

    var timeDiv = $('#serverTime').html(hour + ':' + minute);
}//end updateServerTime

function formatServerTime(value) {
    return ((value < 10) ? '0' : '') + value;
}//end formatServerTime