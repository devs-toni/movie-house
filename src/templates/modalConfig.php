</div>
    <dialog class="modalc modal__config">
      <div class="modalc__container">
        <button class="modalc__btn-close close-conf">🗙</button>
        <h2 class="modalc__title">Configuration</h2>
        <button class="modalc__btn-back back-conf hidden"><i class="fa-solid fa-arrow-left-long"></i></button>
          <div class="hidden" id="modifyUsername">
         <form onsubmit="changeUsername(event)" method="POST" class="modalc__form modal__form--config">
            <div>
              <label class="form__label" for="usernameConfig">Username</label>
              <input class="form__input" type="text" name="name" id="usernameConfig" required>
            </div>
            <button type="submit" class="modal__btn-submit modal__btn-submit--signUp">Edit</button>
          </form>
          </div>
          <div class="hidden" id="modifyEmail">
                   <form onsubmit="changeEmail(event)" method="POST" class="modalc__form modal__form--config">
            <div>
              <label class="form__label" for="emailConfig">Email</label>
              <input class="form__input" type="email" name="mail" id="emailConfig" required>
            </div>
            <button type="submit" class="modal__btn-submit modal__btn-submit--signUp">Edit</button>
                      </form>
          </div>
          <div class="hidden" id="modifyPassword">
                   <form onsubmit="changePassword(event)" method="POST" class="modalc__form modal__form--config">
            <div>
              <label class="form__label" for="passwordConfig">Password</label>
              <input class="form__input" type="password" name="pass" id="passwordConfig" required>
              <label class="form__label" for="rPasswordConfig">Repeat Password</label>
              <input class="form__input" type="password" name="rPass" id="rPasswordConfig" required>
            </div>
            <button type="submit" class="modal__btn-submit modal__btn-submit--signUp">Edit</button>
                      </form>
          </div>

          <div class="modalc__main">
            <div>
              <button onclick="openUsernameConfig()"><i class="fa-solid fa-user-gear"></i></button>
              <p>Edit Username</p>
            </div>
            <div>
              <button onclick="openEmailConfig()"><i class="fa-solid fa-at"></i></button> 
              <p>Edit Email</p>
            </div>
            <div>
              <button onclick="openPasswordConfig()"><i class="fa-solid fa-lock-open"></i></button>
              <p>Edit Password</p>
            </div>
          </div>
      </div>
    </dialog>