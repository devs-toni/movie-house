<?php
require_once('Connection.php');

class UserRepository extends Connection
{
  function addUser(User $user): void
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO users (rol, username, email, password) VALUES (?,?,?,?)');

    $userRol = $user->getRol();
    $userName = $user->getUserName();
    $userEmail = $user->getEmail();
    $userPass = $user->getPassword();

    $pre->bind_param('ssss', $userRol, $userName, $userEmail, $userPass);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

  function isAdult($id)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT rol FROM users WHERE id=?');
    $pre->bind_param('i', $id);
    $pre->execute();
    $result = $pre->get_result();
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        if ($row['rol'] === 'P') {
          $pre->close();
          $this->con->close();
          return true;
        }
      }
    }
    $pre->close();
    $this->con->close();
    return false;
  }

  function isAdmin($id)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT rol FROM users WHERE id=?');
    $pre->bind_param('i', $id);
    $pre->execute();
    $result = $pre->get_result();

    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        if ($row['rol'] === 'A') {
          $pre->close();
          $this->con->close();
          return true;
        }
      }
    }
    $pre->close();
    $this->con->close();
    return false;
  }

  function getUserById($id)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT email, username, rol FROM users WHERE id=?');
    $pre->bind_param('i', $id);
    $pre->execute();
    $result = $pre->get_result();

    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $res['email'] = $row['email'];
        $res['rol'] = $row['rol'];
        $res['username'] = $row['username'];
      }
    } else {
      $res = [];
    }
    $pre->close();
    $this->con->close();
    return $res;
  }

  function getUserByEmail($mail)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT id, password FROM users WHERE email=?');
    $pre->bind_param('s', $mail);
    $pre->execute();
    $result = $pre->get_result();

    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $res['pass'] = $row['password'];
        $res['id'] = $row['id'];
      }
    } else {
      $res = [];
    }
    $pre->close();
    $this->con->close();
    return $res;
  }

  function updateUserField($username, $email, $password, $id)
  {
    if ($username) {
      $field = $username;
      $val = 'username';
    }
    if ($email) {
      $field = $email;
      $val = 'email';
    }
    if ($password) {
      $field = password_hash($password, PASSWORD_DEFAULT);
      $val = 'password';
    }
    $this->connect();
    $pre = mysqli_prepare($this->con, "UPDATE users SET $val=? WHERE id=?");
    $pre->bind_param('si', $field, $id);
    $pre->execute();
    $result = $pre->get_result();
    $pre->close();
    $this->con->close();
    return $result;
  }
}