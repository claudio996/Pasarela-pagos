<?php
if (isset($_POST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $comments = $_POST['conments'];
    $domain = $_SERVER['HTTP_HOST'];

    $to = "desdarrollopas2@gmail.com";
    $subject = "Contacto desde el formulario del sitio $domain: $subject";
    $message = "
    <p>
    Datos enviados desde el formulario <b>$domain</b>
    </p>

    <ul>
    <li>Nombre<b> $name</b></li>
    <li>Email: <b>  $email</b></li>
    <li>Asunto:$subject</li>
    <li>Comentarios:   $subject </li>
    </ul>
    ";

    $header = "MIME-Version: 1.0\r\n"."Content-Type:text/html;
     charset=utf-8\r\n"."From:Envio automatico no responder <no-reply@$domain>";


    $dendMail = mail($to, $subject, $message, $header);

    if ($sendMail) {
        $res = [
            'err' => false,
            'msg' => "Tus datos han sido enviados"
        ];
    } else {
        $res = [
            'err' => true,
            'msg' => "Ha ocurrido un error intenta nuevamente"
        ];
    }

    header('Content-type:aplication/json');
    echo json_encode($res);
    exit;
}
