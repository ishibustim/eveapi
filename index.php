<html>
  <head>
    <?php
        include 'modules/fileImports.php';
    ?>
  </head>
  <body>
    <?php
        // Include backend modules
        include 'modules/apiModules/apiImports.php';

        // Draw navbar
        include 'modules/uiModules/navbar.php';

    ?>

    <div id="main">

        <div id="preSignIn">
            <div id="signIn">
                <div><div class="label">Username:</div><input name="username" type="text" /></div>
                <div><div class="label">Password:</div><input name="password" type="password" /></div>
                <div class="hidden"><div class="label">Verify Password:</div><input name="verifyPassword" type="password" /></div>
                <div class="buttons">
                    <input type="submit" value="Log In" id="signIn_logIn" />
                    <input class="hidden" type="submit" value="Cancel" id="signIn_register_cancel" />
                    <input type="submit" value="Register" id="signIn_register" />
                </div>
            </div>
        </div>

        <div id="postSignIn" class="hidden">
            <div id="userInfo">
                <span id="username"></span>
                <i id="openSettings" class="fa fa-cog"></i>
                <i id="logOut" class="fa fa-sign-out"></i>
            </div>

            <div id="newApiWindow">
                <div><div class="label">Key ID:</div><input type="text" /></div>
                <div><div class="label">Verification Code:</div><input type="text" /></div>
                <div class="buttons">
                    <input type="submit" value="&#10007; Cancel" id="newApiWindow_cancel" />
                    <input type="submit" value="&#10003; Submit" id="newApiWindow_submit" />
                </div>
            </div>
        </div>

    </div>
    </body>
</html>
