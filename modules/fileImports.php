<?php
$indent = "    ";
$linkCSSBase = "<link rel='stylesheet' type='text/css' href='";
$linkCSSSuffix = "' />\n";
$linkCSSDir = "style/";
echo "\n";

// FontAwesome
echo $indent . "<link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>\n";

// stylesheets
echo $indent . $linkCSSBase . $linkCSSDir . "global.css" . $linkCSSSuffix;
echo $indent . $linkCSSBase . $linkCSSDir . "userInfo.css" . $linkCSSSuffix;
echo $indent . $linkCSSBase . $linkCSSDir . "navbar.css" . $linkCSSSuffix;
echo $indent . $linkCSSBase . $linkCSSDir . "newApiWindow.css" . $linkCSSSuffix;
echo $indent . $linkCSSBase . $linkCSSDir . "signIn.css" . $linkCSSSuffix;
echo $indent . $linkCSSBase . $linkCSSDir . "settings.css" . $linkCSSSuffix;



// JQuery
echo $indent . "<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>\n";

// javascript
echo $indent . "<script src='js/global.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/eveApiUI.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/serverStatus.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/users.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/windows.js' type='text/javascript' defer></script>\n";

// HoverBox
echo $indent . $linkCSSBase . "HoverBox/HoverBox.css" . $linkCSSSuffix;
echo $indent . "<script src='HoverBox/HoverBox.js' type='text/javascript' defer></script>\n";
echo "\n";

?>

<script type="text/javascript">
window.onload = function () {
  users_init();
  windows.init();
  eveApiUI.init();

  // Run the server time process last so (hopefully) nothing will delay the results
  // (which would cause an incorrect time)
  serverStatus.init();
};
</script>
