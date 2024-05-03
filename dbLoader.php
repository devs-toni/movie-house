<?php
function ejecutarScriptsSQL($scriptsDirectorio) {
    // Conexión a la base de datos
    $servername = "database";
    $username = "root";
    $password = PASS;
    $dbname = DB_NAME;
    echo "<p>Abriendo conexión con base de datos ...</p>";
    $conn = new mysqli($servername, $username, $password, $dbname);
    echo "<p>Conexión establecida</p>";
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }
    // Leer todos los archivos SQL en el directorio especificado
    $scripts = glob($scriptsDirectorio . '/*.sql');
    echo "<p>Cargando directorio de scripts sql ...</p>";
    echo "<p>Archivos SQL encontrados</p>";
    foreach ($scripts as $script) {
        echo $script . "<br>";
    }

    // Ejecutar cada script SQL
    foreach ($scripts as $script) {
        $sql = file_get_contents($script);
        echo "<p>Cargando script ...</p>";

        if ($conn->multi_query($sql) === TRUE) {
            echo "Script SQL ejecutado correctamente: " . basename($script) . "<br>";
        } else {
            echo "Error al ejecutar el script SQL: " . basename($script) . "<br>";
        }

        // Esperar un poco entre cada script para evitar sobrecargar el servidor de la base de datos
        sleep(1);
    }

    // Cerrar la conexión
    $conn->close();
}

// Llamar a la función y pasarle el directorio donde están los scripts SQL
ejecutarScriptsSQL(__DIR__ . "/assets/database");