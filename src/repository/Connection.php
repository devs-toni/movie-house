<?php
// require_once($_SERVER['DOCUMENT_ROOT'] . '/' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/config.php');
require_once('dbConfig.php');

class Connection
{

  protected $con;

  public function connect()
  {
    $this->con = mysqli_connect(DB, USER, PASS, DB_NAME);
  }
}
