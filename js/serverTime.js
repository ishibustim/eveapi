var time_h;
var time_m;
var time_s;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            var timeString = $('currentTime', data).text();
            var regex = /(\d{2}):(\d{2}):(\d{2})/;
            timeString = regex.exec(timeString);
            alert(timeString);
        }//end if
    });//end post
}//end serverTime_init