<?php
require_once("../utils/Session.php");

session_start();
Session::destroySession('../../index.php');
