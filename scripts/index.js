import Card from './Card.js'
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js'
import PopupWithConfirmation from './PopupWithConfirmation.js'
import Api from './Api.js'

const  api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'f2bbbaa7-5fee-4901-9486-b4868c55fd99',
    'Content-Type': 'application/json'
  }
});

const initialCard = await api.getInitialCards()
  .then((res) => {
    return res;
  })

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnEditAvatar = document.querySelector(".profile__avatar-container");

const userInfo = new UserInfo({ selectorName: ".profile__title", selectorDescription: ".profile__description" });

function handleProfileFormSubmit(event, inputs) {
  event.preventDefault();
  editModal.loading(true);

  api.updateProfileInfo(inputs)
    .then((res) => {
      const { name, about } = res;
      userInfo.setUserInfo({ name, description: about });
    })
    .finally(() => {
      editModal.loading(false);
      editModal.close();
    });
}

await api.getProfileInfo()
  .then((res) => {
    const { name, about, avatar } = res;
    userInfo.setUserInfo({ name, description: about });
    document.querySelector(".profile__image").src = avatar;
  });

function handleDeleteCard (cardId, container, evt) {
  deleteModal.loading(true);
  api.deleteCard(cardId)
    .then((res) => {
      container.remove();
    })
    .finally(() => {
      deleteModal.loading(false);
      deleteModal.close();
    });
}

function handleAvatarFormSubmit(event, inputs) {
  event.preventDefault();
  editAvatarModal.loading(true);

  api.updateProfileAvatar(inputs)
    .then((res) => {
      const { avatar } = res;
      document.querySelector(".profile__image").src = avatar;
    })
    .finally(() => {
      editAvatarModal.loading(false);
      editAvatarModal.close();
    });
}

const editModal = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");
editModal.setEventListeners();
const imageModal = new PopupWithImage("#image-popup");
const deleteModal = new PopupWithConfirmation("#delete-popup", handleDeleteCard);
deleteModal.setEventListeners();
const editAvatarModal = new PopupWithForm(handleAvatarFormSubmit, "#edit-avatar-popup");
editAvatarModal.setEventListeners();

function handleCardClick (image, caption) {
  imageModal.open({ image, caption });
  imageModal.setEventListeners();
}

function  hanleBtnLike (cardId, isLiked, evt) {
  api.changeLike(cardId, isLiked)
    .then((res) => {
      this.changeIsLiked();
      if (res.isLiked) {
        evt.target.classList.add("card__like-button_is-active");
      } else {
        evt.target.classList.remove("card__like-button_is-active");
      }
    })
}

function hanldeConfirmationModal (cardId, element) {
  deleteModal.open(cardId,  element);
}

function createCard(item) {
  const card = new Card(item, '#template-card', handleCardClick, hanleBtnLike, hanldeConfirmationModal);
  return card.generateCard();
}

const cardSection = new Section({
  items: initialCard,
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, ".cards__list");

function handleCardFormSubmit(event, inputs) {
  event.preventDefault();
  newCardModal.loading(true);
  
  api.addNewCard(inputs)
      .then((res) => {
        cardSection.addItem(createCard(res));
    })
    .finally(() => {
      newCardModal.loading(false);
      newCardModal.close();
    });
}

cardSection.renderer();

const newCardModal = new PopupWithForm(handleCardFormSubmit, "#new-card-popup");
newCardModal.setEventListeners();

const configValidator = {
  inputSelector: '.popup__input',
  btnSubmitSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
const validatorEditProfile = new FormValidator(configValidator, '#edit-profile-form');
const validatorCardForm = new FormValidator(configValidator, '#new-card-form')
const validatorEditAvatar = new FormValidator(configValidator, '#edit-avatar-form')

function fillProfileForm () {
  const { name, description } = userInfo.getUserInfo();

  const inputTitle = document.querySelector(".popup__input_type_name");
  const inputDescription = document.querySelector(".popup__input_type_description");

  inputTitle.value = name;
  inputDescription.value = description
}

function handleOpenEditModal () {
  fillProfileForm();
  editModal.open();
  validatorEditProfile.setEventListeners();
}

function handleNewCardModal() {
  newCardModal.open();
  validatorCardForm.setEventListeners();
}

btnEditProfile.addEventListener("click",() => {
  handleOpenEditModal();
});

btnNewCard.addEventListener("click", () => {
  handleNewCardModal();
})

btnEditAvatar.addEventListener("click", () => {
  editAvatarModal.open();
  validatorEditAvatar.setEventListeners();
})
