<?php

function splitDataForm($encodedData) {
	$datas = explode('||', $encodedData);
	return $datas;
}
$emailContent;
$emailSubject = $_POST['emailSubject'];
$emailSender = $_POST['emailSender'];


if ($emailSubject=="" OR $emailSender=="") {
	exit;
}

if (!filter_var($emailSender, FILTER_VALIDATE_EMAIL)) {
    echo "Not a valid email address.";
    exit;
}


foreach ($_POST as $key => $data) {
	$datas = splitDataForm($data);
	$label = $datas[0];
	$value = $datas[1];
	
	if ($label == "*er:") {
		$emailRecipient = $value;
		
	} else {
	
		if (count($value) > 0) {
			$emailContent .= '<p><strong>' . $label . '</strong> ' . stripslashes(nl2br($value)) . '</p>';
		}
	}

}

if (!filter_var($emailRecipient, FILTER_VALIDATE_EMAIL)) {
    echo "Not a valid email address.";
    exit;
}


$emailHeader = "Return-Path: " . $emailSender . "\n";
$emailHeader .= "From:" . $emailSender . "\n";
$emailHeader .= "X-Mailer: PHP " . phpversion() . "\n";
$emailHeader .= "Reply-To: " . $emailSender . "\n";
$emailHeader .= "X-Priority: 3 (Normal)\n";
$emailHeader .= "Mime-Version: 1.0\n";
$emailHeader .= "Content-type: text/html; charset=utf-8\n";

mail($emailRecipient, $emailSubject, $emailContent, $emailHeader) or die('error');
?>
