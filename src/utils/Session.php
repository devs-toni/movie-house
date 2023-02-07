<?php

class Session
{
  private static $SESSION_LIFETIME = 3600;

  public static function checkSessionExpiration()
  {
    if (($_SESSION['lastActivity'] + self::$SESSION_LIFETIME) < time()) {
      self::destroySession("index.php?expire");
    } else {
      $_SESSION['lastActivity'] = time();
    }
  }

  public static function destroySession($path)
  {
    session_destroy();
    unset($_SESSION);
    $_SESSION = [];
    header("Location: $path");
  }
}