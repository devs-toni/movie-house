<?php
require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Administrator', [], ['admin']);

?> 
<nav class="navbar">
  <input class="navbar__input" type="text" placeholder="Search">
</nav> 
<button id="addFilm">Add Film</button><br>
<button id="loadDatabase">Restart Database</button><br>
<button id="goBack">Back</button><br>

<?php
include(DIR_TEMPLATES . 'admin/modalAddFilm.php');
Templates::addFooter();