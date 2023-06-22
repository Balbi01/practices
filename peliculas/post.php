<?php

//Recibir los datos enviados mediante POST

$title = $_POST['mtitle'];
$year = $_POST['myear'];
$rated = $_POST['mrated'];
$released = $_POST['mreleased'];
$genre = $_POST['mgenre'];
$writer = $_POST['mwriter'];
$actors = $_POST['mactors'];
$plot = $_POST['mplot'];
$languaje = $_POST['mlanguaje']??null;
$awards = $_POST['mawards'];



$dbhost = 'localhost'; // Reemplaza con el nombre de tu host
$dbname = 'pruebapelis'; // Reemplaza con el nombre de tu base de datos
$dbuser = 'root1'; // Reemplaza con tu nombre de usuario de la base de datos
$dbpass = ' '; // Reemplaza con tu contraseña de la base de datos

try {
    $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar: " . $e->getMessage());
}
//Preparar la consulta.


$sql = "INSERT INTO moviedata (title, year, rated, released, genre, writer, actors, plot, languaje, awards)
        VALUES (:title, :year, :rated, :released, :genre, :writer, :actors, :plot, :languaje, :awards)";
$stmt = $pdo->prepare($sql);

// Asignar los valores a los parámetros de la consulta
$stmt->bindParam(':title', $title);
$stmt->bindParam(':year', $year);
$stmt->bindParam(':rated', $rated);
$stmt->bindParam(':released', $released);
$stmt->bindParam(':genre', $genre);
$stmt->bindParam(':writer', $writer);
$stmt->bindParam(':actors', $actors);
$stmt->bindParam(':plot', $plot);
$stmt->bindParam(':languaje', $languaje);
$stmt->bindParam(':awards', $awards);

// Ejecutar la consulta
try {
    $stmt->execute();
    echo "Datos guardados correctamente";
} catch (PDOException $e) {
    echo "Error al guardar los datos de la petición: " . $e->getMessage();
}

?>