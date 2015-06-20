var timeDiv;
window.onload = function()
{
  // Initialize the server time and set up an event to keep it updated
  // (NOTE: time_h, time_m, and time_s are declared on the page
  //        and are echo'd by index.php)
  timeDiv = document.getElementById("serverTime");
  timeDiv.innerHTML = ((time_h < 10) ? "0" : "") + time_h + ":" +
    ((time_m < 10) ? "0" : "") + time_m;
  setInterval(function()
              {
                timeDiv.innerHTML = ((time_h < 10) ? "0" : "") + time_h + ":" +
                  ((time_m < 10) ? "0" : "") + time_m;

                time_s++;
                if(time_s > 59)
                {
                  time_s = 0;
                  time_m++;
                  if(time_m > 59)
                  {
                    time_m = 0;
                    time_h++;
                    if(time_h > 23)
                    {
                      time_h = 0;
                    }//end if
                  }//end if
                }//end if
              }, 1000);//end setInterval

  // Set up default event listeners on the page
  initEventListeners();
};//end window.onload

var initEventListeners = function()
{
  // Event listener for entering new API keys
  // This is called by clicking the Add Api option in the character select menu
  // As a small UI feature, the character selection div will attempt to
  // hide itself temporarily when the New API button is clicked
  document.getElementById('startNew').addEventListener('click', function()
  {
    document.getElementById('newApiWindow').classList.toggle('show', true);
    document.getElementById('chars').classList.toggle('hide', true);
    document.getElementById('chars').scrollTop = 0;

    setTimeout(function()
    {
      document.getElementById('chars').classList.toggle('hide', false);
    }, 100);//end setTimeout
    
  });//end addEventListener

  // Event listener for the cancel button on the New API window
  document.getElementById('newApiWindow_cancel').addEventListener('click', function()
  {
    document.getElementById('newApiWindow').classList.toggle('show', false);
  });//end addEventListener

};//end initEventListeners
