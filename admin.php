<?php

// INIT
session_start();
require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');
require_once(DIR_SESSION . 'Session.php');

// TEMPLATES
Templates::addHeader('Administrator', [], ['admin']);
?> 
<body class="containerAdmin">
  <button id="goBack"><img src="assets/images/back.png"><br>back</button><br>
  <h1 class="containerAdmin__title">ADMIN</h1>
<div class="containerAdmin__btns">
<button id="addFilm" class="addFilms"><img src="assets/images/add.png"><br><br>Add Film</button>
<button id="loadDatabase" class="loadDB"><img src="assets/images/refresh.png"><br><br>Restart Database</button>
<button id="editFilm" class="editFilms"><i class="admin-icons fa-solid fa-pencil"></i><br><br>Edit Film</button>
</div>
</body>
<?php
include(DIR_TEMPLATES . 'admin/modalAddFilm.php');
include(DIR_TEMPLATES . 'admin/modalEditFilm.php');
include(DIR_TEMPLATES . 'admin/editDataModal.php');
Templates::addFooter(['alerts']);