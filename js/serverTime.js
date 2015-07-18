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

    // Initialize the server time and set up an event to keep it updated
    // (NOTE: time_h, time_m, and time_s are declared on the page
    //        and are echo'd by index.php)
    timeDiv = document.getElementById("serverTime");
    timeDiv.innerHTML = time_h + ":" + time_m;
    setInterval(function () {
        timeDiv.innerHTML = time_h + ":" + time_m;

        time_s++;
        if (time_s > 59) {
            time_s = 0;
            time_m++;
            if (time_m > 59) {
                time_m = 0;
                time_h++;
                if (time_h > 23) {
                    time_h = 0;
                }//end if
            }//end if
        }//end if
    }, 1000);//end setInterval
}//end serverTime_init