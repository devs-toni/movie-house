<?php

require_once('../../config.php');
$type = $_REQUEST['type'];

switch ($type) {

  case 'api':
    echo json_encode(API);
    break;
  case 'img':
    echo json_encode(API_IMAGE_URL);
    break;
  case 'trend':
    echo json_encode(API_TRENDING);
    break;
  case 'genres':
    echo json_encode(API_GENRES);
    break;
}