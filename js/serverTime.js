var serverDateTime;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            var rawTimeString = $('currentTime', data).text();            
            serverDateTime = new Date(rawTimeString);

            if (rawTimeString != null) {
                // Initialize the server time and set up an event to keep it updated
                setInterval(updateServerTime(), 1000); // 1000 = 1 second
                // Immediately update the server time rather than wait the first second
                updateServerTime();
            }//end if
        }//end if
    });//end post
}//end serverTime_init

function updateServerTime() {
    serverDateTime.setSeconds(serverDateTime.getSeconds() + 1);

    var hour = formatServerTime(serverDateTime.getHours());
    var minute = formatServerTime(serverDateTime.getMinutes());

    var timeDiv = $('#serverTime').html(hour + ':' + minute);
}//end updateServerTime

function formatServerTime(value) {
    return ((value < 10) ? '0' : '') + value;
}//end formatServerTime