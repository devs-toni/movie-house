<?php
require_once(str_replace('\\' , '/',__DIR__) . '/../../config.php');

class Connection
{

  protected $con;

  public function connect()
  {
    $this->con = mysqli_connect(DB, USER, PASS, DB_NAME);
  }
}
