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

      <div id="userInfo">
        ishibustim
        <i class="fa fa-sign-out"></i>
      </div>

      <div id="newApiWindow">
        <div><div class="label">Key ID:</div><input type="textbox" /></div>
        <div><div class="label">Verification Code:</div><input type="textbox" /></div>
        <div class="buttons">
          <input type="submit" value="&#10007; Cancel" id="newApiWindow_cancel" />
          <input type="submit" value="&#10003; Submit" id="newApiWindow_submit" />
        </div>
      </div>
    </div>
  </body>
</html>
