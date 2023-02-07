</div>
<dialog class="modal modal__login">
    <div class="modal__container">
        <button class="modal__btn-close">🗙</button>
        <h2 class="modal__title">LOGIN</h2>
        <form id="loginForm" method="POST" class="modal__form modal__form--login">
            <div class>
                <label class="form__label" for="email">Email</label>
                <input class="form__input" name="email" id="email" type="text" required>
            </div>

            <div>
                <label class="form__label" for="password">Password</label>
                <input class="form__input" name="password" id="password" type="password" required>
            </div>

            <button type="submit" class="modal__btn-submit modal__btn-submit--login">Login</button>
        </form>

        <p class="modal__p modal__p--login">Need an account? <span id="redirectRegister">SIGN UP</span></p>

    </div>
</dialog>