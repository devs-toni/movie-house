<dialog id="editDataModal" class="modal modal__editData">
    <div class="modal__container">
        <button id="closeModalEdit" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">EDIT</h2>
        <form class="modal__form modal__form--editFilm">
            <div>
                <label class="form__label" for="editTitle">Title</label>
                <input class="form__input" name="editTitle" id="editTitle" type="text" required>
            </div>

            <div>
                <label class="form__label" for="editLanguage">Language</label>
                <input class="form__input" name="editLanguage" id="editLanguage" type="text" required>
            </div>

            <div>
                <label class="form__label" for="editDescription">Description</label>
                <input class="form__input" name="editDescription" id="editDescription" type="text" required>
            </div>

            <div id="posterDiv">
                <label class="form__label" for="editPosterPath">PosterPath, upload an img file:</label>
                <input class="form__input" name="editPosterPath" id="editPosterPath" type="text">
                <input class="form__input" type="file" name="uploadPosterPath" id="uploadPosterPath">
            </div>

            <div>
                <label class="form__label" for="editReleaseDate">ReleaseDate</label>
                <input class="form__input" name="editReleaseDate" id="editReleaseDate" type="date" required>
            </div>

            <div>
                <label class="form__label" for="editVoteAverage">VoteAverage</label>
                <input class="form__input" name="editVoteAverage" id="editVoteAverage" type="text" required>
            </div>

            <button type="submit" class="modal__btn-submit modal__btn-submit--editFilm">Add film</button>
        </form>

    </div>
</dialog>