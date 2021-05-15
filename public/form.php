<?php

	header("Content-Type: text/html; charset=utf-8");
	
	//if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest") {
	
	/*	if(!isset($_POST["name"]) || !isset($_POST["tel"])) {

			die();

		} */

		
	
		function send_form($message) {
	
			$mail_to = "fpm.schelko@gmail.com"; // Адрес, куда отправляем письма
			$subject = "Новая заявка"; // Тема письма
			$headers = "MIME-Version: 1.0\r\n";
			 $header  = "Content-type: text/plain; charset=\"UTF-8\"";
			$from = "info@ommy.by";
			$headers = "From:" . $from;
			//$headers .= "From: Система уведомлений <no-reply@".$_SERVER['HTTP_HOST'].">\r\n";

			mail($mail_to, $subject, $message, $headers);
		
		}

		$title = strip_tags($_POST["title"]);
		$name = strip_tags($_POST["name"]); // Имя
		$tel = strip_tags($_POST["tel"]); // tel
		$address = strip_tags($_POST["address"]);
		$description = strip_tags($_POST["description"]);
		$min_price = strip_tags($_POST["min_price"]);
		$max_price = strip_tags($_POST["max_price"]);
		$date = strip_tags($_POST["date"]);
		$time = strip_tags($_POST["time"]);
		$agreement = strip_tags($_POST["agreement"]);

		

		if($name == "") { 

			$name = "Не указано";

		}
		
		if($tel == "") { 

			$tel = "Не указано";

		}

		if($title == "") { 

			$title = "Не указано";

		}

		if($address == "") { 

			$address = "Не указано";

		}

		if($description == "") { 

			$description = "Не указано";

		}
		if($min_price == "") { 

			$min_price = "Не указано";

		}
		if($max_price == "") { 

			$max_price = "Не указано";

		}
		if($date == "") { 

			$date = "Не указано";

		}
		if($time == "") { 

			$time = "Не указано";

		}

		

		$message = <<<HTML

			<b>Заявка на услугу:</b>: {$title}<br>
			<b>Описание</b>: {$description}<br>
			<b>Минимальный бюджет</b>: {$min_price}<br>
			<b>Максимальный бюджет</b>: {$max_price}<br>
			<b>Удобная дата</b>: {$date}<br>
			<b>Удобное время</b>: {$time}<br>
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