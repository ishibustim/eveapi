<?php

include '../sql_login.php';

if(isset($_POST['action']))
{
    $conn = mysql_connect($sql_hostname, $sql_username, $sql_password);

    if(!$conn)
    {
        die("Could not connect: " . mysql_error());
    }//end if

    $db_selected = mysql_select_db($sql_database_name, $conn)
        or die("Could not connect: " . mysql_error());

    if(!$db_selected)
    {
        die("Could not use database: " . mysql_error());
    }//end if

    switch($_POST['action'])
    {
        case "newUser":
            // new user code
            if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['verifyPassword']) && ($_POST['password'] == $_POST['verifyPassword']))
            {
                // verify username is not in use
                $sql = "SELECT * FROM Users WHERE UserID LIKE '" . mysql_real_escape_string($_POST['username']) . "'";
                $result = mysql_query($sql);
                if(mysql_num_rows($result) == 0)
                {
                    // create user

                    // salted & hashed password based on http://stackoverflow.com/questions/3273293/salting-my-hashes-with-php-and-mysql

                    // create salt as 4 random integers
                    $salt = str_pad((string) rand(1, 1000), 4, '0', STR_PAD_LEFT);
                    $userID = mysql_real_escape_string($_POST['username']);
                    $password = hash('sha512', mysql_real_escape_string($_POST['password']) . $salt) . $salt;
                    $sql = "INSERT INTO Users (UserID, Password) VALUES ('" . $userID . "', '" . $password . "')";

                    if(!mysql_query($sql))
                    {
                        die("Error: " . mysql_error());
                        break;
                    }//end if

                    echo '<xml><result>success</result></xml>';
                }//end if
                else
                {
                    echo '<xml><result>duplicate</result></xml>';
                }
            }//end if
            break;



        case "signIn":
            // sign in code
            if(isset($_POST['username']) && isset($_POST['password']))
            {
                // Simply have to return success or fail
                $sql = "SELECT UserID, Password FROM Users WHERE UserID LIKE '" . mysql_real_escape_string($_POST['username']) . "'";
                $result = mysql_query($sql);
                // cannot have duplicate UserIDs, so the first result (if any) is the correct one
                if(mysql_num_rows($result) > 0)
                {
                    $row = mysql_fetch_array($result);
                    $storedPassword = $row['Password'];
                    $password = $_POST['password'];

                    // matching salted & hashed password based on http://stackoverflow.com/questions/3273293/salting-my-hashes-with-php-and-mysql

                    // extract the salt (cut off last 4 characters)
                    $salt = substr($storedPassword, -4);
                    $hash = substr($storedPassword, 0, -4);

                    // verify
                    if(hash('sha512', mysql_real_escape_string($password) . $salt) == $hash)
                    {
                        echo '<xml><result>success</result></xml>';
                    }//end if
                    else
                    {
                        echo '<xml><result>fail</result></xml>';
                    }//end else
                }//end if
            }//end if
            break;



        case "changePassword":
            // change password code
            if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['newPassword']) && isset($_POST['verifyPassword']) && ($_POST['newPassword'] == $_POST['verifyPassword']))
            {
                $sql = "SELECT UserID, Password FROM Users WHERE UserID LIKE '" . mysql_real_escape_string($_POST['username']) . "'";
                $result = mysql_query($sql);
                // cannot have duplicate UserIDs, so the first result (if any) is the correct one
                if(mysql_num_rows($result) > 0)
                {
                    $row = mysql_fetch_array($result);
                    $storedPassword = $row['Password'];
                    $password = $_POST['password'];

                    // matching salted & hashed password based on http://stackoverflow.com/questions/3273293/salting-my-hashes-with-php-and-mysql

                    // extract the salt (cut off last 4 characters)
                    $salt = substr($storedPassword, -4);
                    $hash = substr($storedPassword, 0, -4);

                    // verify
                    if(hash('sha512', mysql_real_escape_string($password) . $salt) == $hash)
                    {
                        // Generate new 4 digit salt
                        $salt = str_pad((string) rand(1, 1000), 4, '0', STR_PAD_LEFT);
                        $userID = mysql_real_escape_string($_POST['username']);
                        $password = hash('sha512', mysql_real_escape_string($_POST['newPassword']) . $salt) . $salt;
                        $sql = "UPDATE Users SET Password='" . $password . "' WHERE UserID LIKE '" . $userID . "'";

                        if(!mysql_query($sql))
                        {
                            die("Error: " . mysql_error());
                            break;
                        }//end if

                        echo '<xml><result>success</result></xml>';
                    }//end if
                    else
                    {
                        echo '<xml><result>incorrect</result></xml>';
                    }//end else
                }//end if
                else
                {
                    echo '<xml><result>User does not exist</result></xml>';
                }//end else
            }//end if
            else
            {
                echo '<xml><result>Unknown Error</result></xml>';
            }//end else
            break;
    }//end switch
}//end if

?>