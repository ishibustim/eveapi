<html>
<head>
  <?php
  if($_SERVER["HTTPS"] != "on") {
    // Redirect to HTTPS if accessed via HTTP
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
  }//end if

  // Include header defined in fileImports.php
  include 'modules/fileImports.php';
  ?>
  <title>EVE Passport</title>
</head>
<body>
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
    </div><!-- #signIn -->
  </div><!-- #preSignIn -->

  <div id="postSignIn" class="hidden">
    <!-- Navbar -->
    <div id="navbar" class="UI_Window">
      <div id="chars">
        <div class="charItem" id="startNew"><div class="charNew">+</div>Add New Character API</div>
      </div>
      <div id="serverTime" class="HBHasHoverBox" >00:00</div>
      <div id="serverTimeHoverTemplate" class="HBTemplate">
        <strong>Tranquility:</strong> <span class="TQPlayerCount"></span> players
        <hr />
        <span class="TQServerStatus"></span>
        <br />
        <br />
        <span class="TimeUntilUpdate"></span>
      </div>
    </div><!-- #navbar -->

    <!-- User Info Panel -->
    <div id="userInfo" class="UI_Window">
      <span id="username"></span>
      <i id="openSettings" class="fa fa-cog"></i>
      <i id="logOut" class="fa fa-sign-out"></i>
    </div><!-- #userInfo -->

    <!-- Add API Window -->
    <div id="newApiWindow" class="UI_Window">
      <div><div class="label">Key ID:</div><input type="text" /></div>
      <div><div class="label">Verification Code:</div><input type="text" /></div>
      <div class="buttons">
        <input type="submit" value="&#10007; Cancel" id="newApiWindow_cancel" />
        <input type="submit" value="&#10003; Submit" id="newApiWindow_submit" />
      </div>
    </div><!-- #newApiWindow -->

    <!-- Main Content -->
    <div id="main" class="hidden">
      <div id="closeButton">
        <div class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-1x"></i>
          <i class="fa fa-times-circle fa-inverse fa-stack-1x"></i>
        </div>
      </div>
      <div id="settings" class="UI_Window hidden">
        <div id="changePasswordForm">
          <h1>Change Password</h1>
          <div><div class="label">Old Password:</div><input type="password" name="oldPassword" /></div>
          <div><div class="label">New Password:</div><input type="password" name="newPassword"/></div>
          <div><div class="label">Verify Password:</div><input type="password" name ="verifyPassword"/></div>
          <div class="buttons">
            <input type="submit" value ="Submit" id="changePassword" />
          </div>
        </div>
      </div><!-- #settings -->
    </div><!-- #main -->
  </div><!-- #postSignIn -->
</body>
</html>
