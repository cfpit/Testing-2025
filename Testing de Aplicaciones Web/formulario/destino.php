<?php 
    // capturo el contenido del campo de texto desde HTML
    $nombre = $_POST['nombre'];

    //muestro en la pagina web el saludo
    if($nombre == 'Juan'){
        echo 'Hola ', $nombre ,' !!';
    }
    else{
        echo 'No te conozco';
    }
    

?>