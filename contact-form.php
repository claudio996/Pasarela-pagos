<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>Formulario fetch-submit</title>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h1>Ingrese los datos al formulario fetch-php</h1>
                <form class="contact-form">
                    <input type="text" name="name" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" placeholder="Escribe tu nombre" required title="El nombre solo acepta letras y espacios en blanco." required>
                    <input type="email" name="email" placeholder="Escribe tu email" title="Email Incorrecto" pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required>
                    <input type="text" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido">
                    <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios" title="Tu comentario no debe ecceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>

                    <input type="submit" value="Enviar">
                    <div class="contact-form-loader none">
                        <img src="img/circles.svg" alt="loading">
                    </div>

                    <div class="contact-form-response">
                        <p>Los datos han sido actualizados correctamente</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/main2.js"></script>
</body>

</html>