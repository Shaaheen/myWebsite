<?php
require ("/home/u899385406//public_html/PHPMailer-master/PHPMailerAutoload.php");

/**
 * Created by PhpStorm.
 * User: Shaaheen
 * Date: 7/3/2015
 * Time: 11:51 PM
 */

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

define('DB_NAME',"u899385406_main");
define('DB_USER','u899385406_scr');
define('DB_PASSWORD','Gigabyte1!');
define('DB_HOST',"mysql.freehostingnoads.net");

//connect to host database server
$link2 = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);

if (!$link2){
    die('Could not connect...');
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

if (!mysql_query($sql)){
    die("Error" . mysql_error());
}

mysql_close();

//email details
$my_email = 'SCRSHA001@myuct.ac.za';
$subject = "Website Message from :" . $name;

echo $my_email;
echo "$subject";
echo $message;
$headers = array("From: iam@shaaheen.me",
    "Reply-To: " . $email,
    "X-Mailer: PHP/" . PHP_VERSION
);
$headers = implode("\r\n", $headers);

//send email to me
if(mail('iam@shaaheen.me',"First","Test Msg",$headers)){
    mail("sacoorshaheen@gmail.com","Sub","Message Here");
    mail("SCRSHA001@myuct.ac.za","bdcd","vnkj");
    echo "Sent";
    echo "\r\n";
    echo $headers;
}
else{
    echo "Failed to Send";
}
if (imap_mail('iam@shaaheen.me',$subject,$message)){
    echo "Imap Success";
}
else{
    echo "Imap Failed";
}
/*
$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mx1.freehostingnoads.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'iam@shaaheen.me';                 // SMTP username
$mail->Password = 'Gigabyte1!';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->From = 'iam@shaaheen.me';
$mail->FromName = 'Shaaheen Sacoor';
//$mail->addAddress('sacoorshaheen@gmail.com');     // Add a recipient
//$mail->addAddress('SCRSHA001@myuct.ac.za');               // Name is optional
$mail->addAddress('iam@shaaheen.me');               // Name is optional
//$mail->addReplyTo('GHSOGA@gmail.com', 'Information');

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
*/
//Redirect to Contact page
header( 'Location: http://shaaheen.me/contact/contact.html' ) ;

exit();


//action="contact.php" method="post"
