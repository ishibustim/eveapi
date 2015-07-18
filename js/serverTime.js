var time_h;
var time_m;
var time_s;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    // These are the indicies in the returned array from regex.exec containing the data we are looking for
    var hIndex = 1;
    var mIndex = 2;
    var sIndex = 3;

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            var rawTimeString = $('currentTime', data).text();
            var regex = /(\d{2})\:(\d{2})\:(\d{2})/;
            var timeString = regex.exec(rawTimeString);
            
            if (timeString != null) {
                time_h = timeString[hIndex];
                time_m = timeString[mIndex];
                time_s = timeString[sIndex];
            }//end if
        }//end if
    });//end post
}//end serverTime_init