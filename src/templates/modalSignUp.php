<dialog class="modal-sign-up modal">
    <div class="modal__container">
        <button id="closeSignUp" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">SIGN UP</h2>
        <form id="registerForm" method="POST" class="modal__form">
            <div>
                <label class="form__label" for="usernameSignUp">Username</label>
                <input class="form__input" type="text" name="username" id="usernameSignUp" required>
            </div>
            <div>
                <label class="form__label" for="emailSignUp">Email</label>
                <input class="form__input" type="text" name="email" id="emailSignUp" required>
            </div>
            <div>
                <label class="form__label" for="passwordSignUp">Password</label>
                <input class="form__input" type="password" name="password" id="passwordSignUp" required>
            </div>
            <div>
                <label class="form__label" for="rPasswordSignUp">Repeat Password</label>
                <input class="form__input" type="password" name="rPassword" id="rPasswordSignUp" required>
            </div>
            <button type="submit" class="modal__btn-submit modal__btn-submit--signUp">Sign Up</button>
        </form>
        <p class="modal__p">Already a user? <span id="redirectLogin">LOGIN</span></p>
    </div>
</dialog>