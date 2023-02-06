<?php
session_start();
session_destroy();
$_SESSION = [];
header('Location: /' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/index.php');
