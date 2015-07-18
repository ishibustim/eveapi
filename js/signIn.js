var registering = false;

function signIn_addEventListeners()
{
    $('#signIn_register').click(beginRegister);
    $('#signIn_register_cancel').click(cancelRegister);
}//end addEventListeners

function beginRegister()
{
    if (!registering) {
        registering = true;
        $('#signIn input[name="verifyPassword"]').parent().removeClass('hidden');
        $('#signIn_logIn').addClass('hidden');
        $('#signIn_register_cancel').removeClass('hidden');
    }//end if
    else {
        // register with webservice
    }
}//end beginRegister

function cancelRegister()
{
    if (registering) {
        registering = false;
        $('#signIn input[name="verifyPassword"]').parent().addClass('hidden');
        $('#signIn_logIn').removeClass('hidden');
        $('#signIn_register_cancel').addClass('hidden');
    }//end if
}//end cancelRegister