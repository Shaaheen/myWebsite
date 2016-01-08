<?php
/**
 * Created by PhpStorm.
 * User: Shaaheen
 * Date: 7/3/2015
 * Time: 11:51 PM
 *
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");
 */

define('DB_NAME','bdfcmjcz_contactDB');
define('DB_USER','bdfcmjcz_admin');
define('DB_PASSWORD','PasswordHere!');
define('DB_HOST','localhost');

//connect to host database server
$link2 = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);

if (!$link2){
    die('Could not connect...');
}
else{
    //echo("\r\n Connected");
}

//select database
$db_selected = mysql_select_db(DB_NAME, $link2);

if (!$db_selected){
    die("Can't use Database");
}

//Get data from form
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

//Insert data into database
$sql = "INSERT INTO Contact (Name,Email,Message) VALUES ('$name','$email','$message')";

//echo("\r\n Inserted");

if (!mysql_query($sql)){
    die("Error" . mysql_error());
}

mysql_close();


//email details
$my_email = 'SCRSHA001@myuct.ac.za';
$subject = "Website Message from :" . $name;


$headers = array("From: iam@shaaheen.me",
    "Reply-To: " . $email,
    "X-Mailer: PHP/" . PHP_VERSION
);
$headers = implode("\r\n", $headers);

//send email to me
if(mail("SCRSHA001@myuct.ac.za",$subject,$message)){
    //echo("Sent");
}
else{
    echo "Failed to Send";
}

//Redirect to Contact page
header( 'Location: http://shaaheen.me/contact/contact.html' ) ;

exit();
//action="contact.php" method="post"
