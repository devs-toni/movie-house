<dialog class="modal-sign-up modal">
    <div class="modal__container">
        <button id="closeSignUp" class="modal__btn-close">🗙</button>
        <h2 class="modal__title">SIGN UP</h2>
        <form action="src/controllers/Register.php" method="POST" class="modal__form">
            <div>
                <label class="form__label" id="username-sign-up">Username</label>
                <input class="form__input" type="text" name="username" id="username-sign-up" required>
            </div>
            <div>
                <label class="form__label" id="email-sign-up">Email</label>
                <input class="form__input" type="text" name="email" id="email-sign-up" required>
            </div>
            <div>
                <label class="form__label" id="password-sign-up">Password</label>
                <input class="form__input" type="password" name="password" id="password-sign-up" required>
            </div>
            <button type="submit" class="modal__btn-submit">Sign Up</button>
        </form>
        <p class="modal__p">Already a user? <span id="redirectLogin">LOGIN</span></p>
    </div>
</dialog>