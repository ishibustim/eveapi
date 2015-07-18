var registering = false;

var usersPostURL = 'https://dev.ishibustim.homenet.org/passport/modules/webservice/users.php';

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
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var verifyPassword = $('input[name="verifyPassword"]').val();

        if (password == verifyPassword && password.length >= 8) {
            // register with webservice
            $.post(usersPostURL, {
                action: 'newUser',
                username: username,
                password: password,
                verifyPassword: verifyPassword
            }, function (data, status, xhr) {
                if (status == 'success')
                    alert('Account Created');
                else
                    alert('Could not create account');
            });//end $.post
        }//end if
        else if(password != verifyPassword) {
            alert('Passwords must match');
        }//end else if password match
        else if (password.length < 8) {
            alert('Password must be longer than 8 characters');
        }//end else if password length
    }//end else (submit newUser request)
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