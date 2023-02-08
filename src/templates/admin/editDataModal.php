<dialog id="editDataModal" class="modal modal__editData">
    <div class="modal__container">
        <button id="closeModalEdit" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">EDIT</h2>
        <form class="modal__form modal__form--editFilm">
            <div>
                <label class="form__label" for="title">Title</label>
                <input class="form__input" name="title" id="title" type="text" required>
            </div>

            <div>
                <label class="form__label" for="language">Language</label>
                <input class="form__input" name="language" id="language" type="text" required>
            </div>

            <div>
                <label class="form__label" for="description">Description</label>
                <input class="form__input" name="description" id="description" type="text" required>
            </div>

            <div>
                <label class="form__label" for="posterPath">PosterPath</label>
                <input class="form__input" name="posterPath" id="posterPath" type="text" required>
            </div>

            <div>
                <label class="form__label" for="releaseDate">ReleaseDate</label>
                <input class="form__input" name="releaseDate" id="releaseDate" type="text" required>
            </div>

            <div>
                <label class="form__label" for="voteAverage">VoteAverage</label>
                <input class="form__input" name="voteAverage" id="voteAverage" type="text">
            </div>

            <button type="submit" class="modal__btn-submit modal__btn-submit--editFilm">Add film</button>
        </form>

    </div>
</dialog>