var registering = false;

var usersPostURL = 'https://dev.ishibustim.homenet.org/passport/modules/webservice/users.php';

var global_username = '';
var global_password = '';

function users_init() {
  users_addEventListeners();

  if(sessionStorage.passport_username !== undefined
    && sessionStorage.passport_username != ''
    && sessionStorage.passport_password !== undefined
    && sessionStorage.passport_password != '') {
      if (!signIn(sessionStorage.passport_username, sessionStorage.passport_password)) {
        // clear session variables if sign in did not work
        sessionStorage.passport_username = '';
        sessionStorage.passport_password = '';
      }//end if
    }//end if
  }//end users_init

  function users_addEventListeners()
  {
    $('#signIn_register').click(beginRegister);
    $('#signIn_register_cancel').click(cancelRegister);
    $('#signIn_logIn').click(signIn);
    $('#logOut').click(signOut);
    $('#changePassword').click(changePassword);
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

      if (username.length < 4) {
        alert('Username must be at least 4 characters long');
      }//end if
      else if (password == verifyPassword && password.length >= 8) {
        // register with webservice
        $.post(usersPostURL, {
          action: 'newUser',
          username: username,
          password: password,
          verifyPassword: verifyPassword
        }, function (data, status, xhr) {
          if (status == 'success') {
            var result = $('result', data).text();
            if (result == 'success') {
              alert('Account Created');
              if (signIn()) {
                cancelRegister();
              }//end if
            }//end if
            else if (result == 'duplicate') {
              alert('Username already exists');
            }
            else {
              alert('Could not create account');
            }//end else
          }//end if
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

  function signIn(username, password)
  {
    if (username === undefined || username == '' || password === undefined || password == '') {
      username = $('input[name="username"]').val();
      password = $('input[name="password"]').val();
    }//end if

    if (password.length >= 8) {
      $.post(usersPostURL, {
        action: 'signIn',
        username: username,
        password: password
      }, function (data, status, xhr) {
        if (status == 'success') {
          var result = $('result', data).text();
          if (result == 'success') {
            // sign in and display homepage
            global_username = username;
            global_password = password;
            sessionStorage.passport_username = global_username;
            sessionStorage.passport_password = global_password;
            $('#username').html(global_username);
            $('#preSignIn').addClass('hidden');
            $('#postSignIn').removeClass('hidden');

            // clear sign in fields
            $('input[name="username"]', '#signIn').val('');
            $('input[name="password"]', '#signIn').val('');
            $('input[name="verifyPassword"]', '#signIn').val('');

            return true;
          }//end if
          else if (result == 'fail') {
            alert('Username and Password do not match');
          }//end else if
          else {
            alert(result);
          }//end else
        }//end if
        else {
          alert('Unable to sign in');
        }//end else
      });//end $.post
    }//end if
    else {
      alert('Password must be longer than 8 characters');
    }//end else

    return false;
  }//end signIn

  function signOut() {
    global_username = '';
    global_password = '';
    sessionStorage.passport_username = '';
    sessionStorage.passport_password = '';
    $('#postSignIn').addClass('hidden');
    $('#preSignIn').removeClass('hidden');
    $('#username').html('');
  }//end signOut

  function changePassword() {
    var username = global_username;
    var password = $('input[name="oldPassword"]', '#changePasswordForm').val();
    var newPassword = $('input[name="newPassword"]', '#changePasswordForm').val();
    var verifyPassword = $('input[name="verifyPassword"]', '#changePasswordForm').val();

    if (password.length >= 8 && newPassword.length >= 8) {
      if (newPassword == verifyPassword) {
        $.post(usersPostURL, {
          action: 'changePassword',
          username: username,
          password: password,
          newPassword: newPassword,
          verifyPassword: verifyPassword
        }, function (data, status, xhr) {
          if (status == 'success') {
            var result = $('result', data).text();
            if (result == 'success') {
              // store updated password for later calls
              global_password = newPassword;
              sessionStorage.passport_password = global_password;

              // clear password fields
              $('input[name="oldPassword"]', '#changePasswordForm').val('');
              $('input[name="newPassword"]', '#changePasswordForm').val('');
              $('input[name="verifyPassword"]', '#changePasswordForm').val('');

              alert('Password changed');
            }//end if
            else if (result == 'incorrect') {
              alert('Old password is incorrect');
            }//end else if
            else {
              alert(result);
            }//end else
          }//end if
          else {
            alert('Error connecting to web service');
          }//end else
        });//end post
      }//end if
      else {
        alert('Passwords must match');
      }//end else
    }//end if
    else {
      alert('Password must be longer than 8 characters');
    }//end else
  }//end changePassword
