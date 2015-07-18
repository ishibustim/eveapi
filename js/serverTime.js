var serverDateTime;

function serverTime_init() {
    var apiBaseURL = 'https://api.eveonline.com';
    var statusURL = '/server/ServerStatus.xml.aspx';

    $.post(apiBaseURL + statusURL, '', function (data, status, xhr) {
        if (status == 'success') {
            var rawTimeString = $('currentTime', data).text();            
            serverDateTime = new Date(rawTimeString);
            console.log(serverDateTime);

            if (rawTimeString != null) {
                // Initialize the server time and set up an event to keep it updated
                timeDiv = document.getElementById("serverTime");
                timeDiv.innerHTML = serverDateTime.getHours() + ":" + serverDateTime.getMinutes();
                setInterval(function () {
                    timeDiv.innerHTML = serverDateTime.getHours() + ":" + serverDateTime.getMinutes();

                    serverDateTime.setSeconds(serverDateTime.getSeconds() + 1);
                }, 1000);//end setInterval
            }//end if
        }//end if
    });//end post
}//end serverTime_init