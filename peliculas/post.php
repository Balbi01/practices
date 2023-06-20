<?php
require 'conection.php';

//Recibir los datos enviados mediante POST

$title = $_POST['title'];
$year = $_POST['year'];
$rated = $_POST['rated'];
$released = $_POST['released'];
$genre = $_POST['genre'];
$writer = $_POST['writer'];
$actors = $_POST['actors'];
$plot = $_POST['plot'];
$languaje = $_POST['languaje'];
$awards = $_POST['awards'];

//Preparar la consulta insertando los datos en una tabla llamada movies.

$insert = "INSERT INTO moviedata VALUES ('$title', '$year', '$rated', '$released', '$genre', '$writer', '$actors', '$plot', '$languaje', '$awards');

$query = mysqli_query($conectar, $insert);
