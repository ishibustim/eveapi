var timeDiv;
function eveApi_load()
{
  // Set up default event listeners on the page
  eveApi_initEventListeners();
};//end window.onload

function eveApi_initEventListeners()
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
