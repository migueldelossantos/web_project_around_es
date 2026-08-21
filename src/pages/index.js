import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import Api from '../components/Api.js'

const  api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'f2bbbaa7-5fee-4901-9486-b4868c55fd99',
    'Content-Type': 'application/json'
  }
});

const [initialProfile, initialCard] = await api.getInitialData()
  .catch((err) => {
    console.log(err);
  })

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnEditAvatar = document.querySelector(".profile__avatar-container");

const userInfo = new UserInfo({
  selectorName: ".profile__title",
  selectorDescription: ".profile__description",
  selectorAvatar: ".profile__image"
});
userInfo.setUserInfo(initialProfile)

function handleProfileFormSubmit(event, inputs) {
  event.preventDefault();
  editModal.loading(true);

  api.updateProfileInfo(inputs)
    .then((res) => {
      const { name, about } = res;
      userInfo.setUserInfo({ name, description: about });
    })
    .catch((err) => {
      console.log("Error: ", err)
    })
    .finally(() => {
      editModal.loading(false);
      editModal.close();
    });
}

function handleDeleteCard (cardId, container, evt) {
  deleteModal.loading(true);
  api.deleteCard(cardId)
    .then((res) => {
      container.remove();
    })
    .catch((err) => {
      console.log("Error: ", err)
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
    .catch((err) => {
      console.log("Error: ", err);
    })
    .finally(() => {
      editAvatarModal.loading(false);
      editAvatarModal.close();
    });
}

const editModal = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");
editModal.setEventListeners();
const imageModal = new PopupWithImage("#image-popup");
imageModal.setEventListeners();
const deleteModal = new PopupWithConfirmation("#delete-popup", handleDeleteCard);
deleteModal.setEventListeners();
const editAvatarModal = new PopupWithForm(handleAvatarFormSubmit, "#edit-avatar-popup");
editAvatarModal.setEventListeners();

function handleCardClick (image, caption) {
  imageModal.open({ image, caption });
}

function  handleBtnLike (cardId, isLiked, evt) {
  api.changeLike(cardId, isLiked)
    .then((res) => {
      this.changeIsLiked();
      if (res.isLiked) {
        evt.target.classList.add("card__like-button_is-active");
      } else {
        evt.target.classList.remove("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.log("Error: ", err)
    })
}

function handleConfirmationModal (cardId, element) {
  deleteModal.open(cardId,  element);
}

function createCard(item) {
  const card = new Card(item, initialProfile, '#template-card', handleCardClick, handleBtnLike, handleConfirmationModal);
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
    .catch((err) => {
      console.log("Error: ", err);
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
validatorEditProfile.setEventListeners();
const validatorCardForm = new FormValidator(configValidator, '#new-card-form')
validatorCardForm.setEventListeners();
const validatorEditAvatar = new FormValidator(configValidator, '#edit-avatar-form')
validatorEditAvatar.setEventListeners();

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
}

function handleNewCardModal() {
  newCardModal.open();
}

btnEditProfile.addEventListener("click",() => {
  handleOpenEditModal();
  validatorEditProfile.validateFormData();
});

btnNewCard.addEventListener("click", () => {
  handleNewCardModal();
  validatorCardForm.validateFormData();
})

btnEditAvatar.addEventListener("click", () => {
  editAvatarModal.open();
  validatorEditAvatar.validateFormData();
})
