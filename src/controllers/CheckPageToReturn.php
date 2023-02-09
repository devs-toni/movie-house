<?php

session_start();


if (isset($_SESSION['lastPage'])) {
    $data = $_SESSION['lastPage'];
    unset($_SESSION['lastPage']);
    echo json_encode($data);
} else {
    echo json_encode("noData");
}
