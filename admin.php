<?php
require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Administrator', [], ['admin']);

?> 
<!-- <nav class="navbar">
  <input class="navbar__input" type="text" placeholder="Search">
</nav>  -->
<body class="containerAdmin">
  <button id="goBack"><img src="assets/images/back.png">.<br>back</button><br>
  <h1 class="containerAdmin__title">ADMIN</h1>
<div class="containerAdmin__btns">
<button id="addFilm" class="addFilms"><img src="assets/images/add.png">.<br>Add Film</button>
<button id="loadDatabase" class="loadDB"><img src="assets/images/refresh.png">.<br>Restart Database</button>
<button id="deleteFilm" class="dltFilms"><img src="assets/images/dlt.png">.<br>Delete Film</button>
</div>
</body>

<?php
include(DIR_TEMPLATES . 'admin/modalAddFilm.php');
Templates::addFooter();