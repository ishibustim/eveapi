function signIn_addEventListeners()
{
    $('#signIn input[value="Register"]').click(beginRegister);
}//end addEventListeners

function beginRegister()
{
    $('#signIn input[name="verifyPassword"]').parent().removeClass('hidden');
    $('#signIn_logIn').addClass('hidden');
    $('#signIn_register').addClass('expand');
}//end beginRegister