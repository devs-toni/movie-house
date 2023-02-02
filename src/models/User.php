<?php

class User
{
  private $username;
  private $email;
  private $rol = 'U';
  private $password;

  public function __construct($username, $email, $password)
  {
    $this->username = $username;
    $this->email = $email;
    $this->password = password_hash($password, PASSWORD_DEFAULT);
  }

  function getUsername(): string
  {
    return $this->username;
  }

  function getPassword(): string
  {
    return $this->password;
  }

  function getEmail(): string
  {
    return $this->email;
  }

  function getRol(): string
  {
    return $this->rol;
  }

  function setRol(string $rol): void
  {
    $this->rol = $rol;
  }
}