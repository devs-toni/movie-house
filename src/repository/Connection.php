<?php

require_once('dbConfig.php');

class Connection
{

  protected $con;

  public function connect()
  {
    $this->con = mysqli_connect(DB, USER, PASS, DB_NAME);
  }
}
