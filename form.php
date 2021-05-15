<?php

	header("Content-Type: text/html; charset=utf-8");
	
	//if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
	/*	if(!isset($_POST["name"]) || !isset($_POST["tel"])) {

			die();

		} */


		function send_form($message, $_FILES) {

			$boundary     = "--".md5(uniqid(time()));
			$EOL = "\r\n";
	
			$mail_to = "progprogect@gmail.com"; // Адрес, куда отправляем письма
			$subject = "Новая заявка"; // Тема письма
			$headers = "MIME-Version: 1.0;$EOL";
			$headers   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL"; 
			$multipart  = "--$boundary$EOL";   
        	$multipart .= "Content-Type: text/html; charset=utf-8$EOL";   
        	$multipart .= "Content-Transfer-Encoding: base64$EOL";   
        	$multipart .= $EOL; // раздел между заголовками и телом html-части 
        	$multipart .= chunk_split(base64_encode($message));  
			//  $header  = "Content-type: text/plain; charset=\"UTF-8\"";
			$from = "info@ommy.by";
			$headers = "From:" . $from;
			//$headers .= "From: Система уведомлений <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			foreach($_FILES["file"]["name"] as $key => $value){
				$filename = $_FILES["file"]["tmp_name"][$key];
				$file = fopen($filename, "rb");
				$data = fread($file,  filesize( $filename ) );
				fclose($file);
				$NameFile = $_FILES["file"]["name"][$key]; // в этой переменной надо сформировать имя файла (без всякого пути);
				$File = $data;
				$multipart .=  "$EOL--$boundary$EOL";   
				$multipart .= "Content-Type: application/octet-stream; name=\"$NameFile\"$EOL";   
				$multipart .= "Content-Transfer-Encoding: base64$EOL";   
				$multipart .= "Content-Disposition: attachment; filename=\"$NameFile\"$EOL";   
				$multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла 
				$multipart .= chunk_split(base64_encode($File));   
	
			}

			$multipart .= "$EOL--$boundary--$EOL";

			mail($mail_to, $subject, $multipart, $headers, );

		}

		$title = strip_tags($_POST["title"]);
		$name = strip_tags($_POST["name"]); // Имя
		$tel = strip_tags($_POST["tel"]); // tel
		$address = strip_tags($_POST["address"]);
		$description = strip_tags($_POST["description"]);
		$agreement = strip_tags($_POST["agreement"]);
		

		if($name == "") { 

			$name = "no name";

		}

		if($address == "") { 

			$address = "no adress";
		}

		

		$message = <<<HTML

			<b>Заявка на услугу:</b>: {$title}<br>
			<b>Описание</b>: {$description}<br>
			<b>Имя заказчика</b>: {$name}<br>
			<b>Адрес</b>: {$address}<br>
			<b>Телефон</b>: {$tel}<br>
			<b>Согласен на обработку персональных данных</b>: {$agreement}<br>


HTML;

		send_form($message); // Если ранее описанных ошибок нет - отправляем сообщение
		
		echo "Сообщение успешно отправлено!";

	//} 
	
	/*else {

		die();

	} */

?>