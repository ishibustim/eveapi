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
    ?>

    <div id="preSignIn">
        <div id="signIn" class="UI_Window">
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
        <!-- Navbar -->
        <div id="navbar" class="UI_Window">
            <div id="chars">
                <div class="charItem" id="startNew"><div class="charNew">+</div>Add New Character API</div>
            </div>
            <div id="serverTime">00:00</div>
        </div>;

        <!-- User Info Panel -->
        <div id="userInfo" class="UI_Window">
            <span id="username"></span>
            <i id="openSettings" class="fa fa-cog"></i>
            <i id="logOut" class="fa fa-sign-out"></i>
        </div>

        <!-- Add API Window -->
        <div id="newApiWindow" class="UI_Window">
            <div><div class="label">Key ID:</div><input type="text" /></div>
            <div><div class="label">Verification Code:</div><input type="text" /></div>
            <div class="buttons">
                <input type="submit" value="&#10007; Cancel" id="newApiWindow_cancel" />
                <input type="submit" value="&#10003; Submit" id="newApiWindow_submit" />
            </div>
        </div>

        <!-- Main Content -->
        <div id="main">

            <div id="settings" class="UI_Window">

                <h1>Change Password</h1>
                <div><div class="label">Old Password:</div><input type="password" /></div>
                <div><div class="label">New Password:</div><input type="password" /></div>
                <div><div class="label">Verify Password:</div><input tpye="password" /></div>
                <div class="buttons">
                    <input type="submit" value ="Submit" id="changePassword" />
                </div>

            </div>

        </div>
    </div>
</body>
</html>
