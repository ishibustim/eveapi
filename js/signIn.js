function signIn_addEventListeners()
{
    $('input[value="Register"]').click(beginRegister());
}//end addEventListeners

function beginRegister()
{
    $('input[name="verifyPassword"]').removeClass('hidden');
    $('#signIn_logIn').addClass('hidden');
}//end beginRegister