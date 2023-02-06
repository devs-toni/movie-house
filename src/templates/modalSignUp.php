<dialog class="modal-sign-up modal">
    <div class="modal__container">
        <button id="closeSignUp" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">SIGN UP</h2>
        <form method="dialog" class="modal__form">
            <div>
                <label class="form__label" id="username-sign-up">Username</label>
                <input class="form__input" type="text" name="username-sign-up" id="username-sign-up">
            </div>
            <div>
                <label class="form__label" id="email-sign-up">Email</label>
                <input class="form__input" type="text" name="email-sign-up" id="email-sign-up">
            </div>
            <div>
                <label class="form__label" id="password-sign-up">Password</label>
                <input class="form__input" type="password" name="password-sign-up" id="password-sign-up">
            </div>
            <button class="modal__btn-submit modal__btn-submit--signUp">Sign Up</button>
        </form>
        <p class="modal__p">Already a user? <span id="redirectLogin">LOGIN</span></p>
    </div>
</dialog>