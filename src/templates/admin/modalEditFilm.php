<dialog id="editFilmModal" class="modal modal__edit">
    <div class="modal__container">
        <button id="editCloseBtn" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">EDIT</h2>

        <div>
            <?php require("src/templates/searchInput.php")?>
        </div>

        <div class="list-container">
            <table id="editList" class="list-container__table">
                <thead>
                    <tr>
                        <th class="film-ID">ID</th>
                        <th>Name</th>
                        <th class="film-actions">Actions</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr>
                        <th class="film-ID">1873</th>
                        <th>Wakanda</th>
                        <th class="film-actions"><i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash-can"></i></th>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</dialog>