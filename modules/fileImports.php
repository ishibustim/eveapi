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

// JQuery
echo $indent . "<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>\n";

// javascript
echo $indent . "<script src='js/eveApi.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/users.js' type='text/javascript' defer></script>\n";
echo $indent . "<script src='js/windows.js' type='text/javascript' defer></script>\n";
echo "\n";

?>

<script type="text/javascript">
    window.onload = function () {
        users_addEventListeners();
        windows_addEventListeners();
        eveApi_load();
    };
</script>
