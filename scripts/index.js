import Card from './Card.js'
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const initialCard = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
]

const btnEditProfile = document.querySelector(".profile__edit-button");
const cardContainer = document.querySelector(".cards__list");
const btnNewCard = document.querySelector(".profile__add-button");

const userInfo = new UserInfo({ selectorName: ".profile__title", selectorDescription: ".profile__description" });

function handleProfileFormSubmit(event, inputs) {
  event.preventDefault();

  userInfo.setUserInfo(inputs);

  editModal.close();
}

const editModal = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");
editModal.setEventListeners();

function handleCardClick (img, caption) {
  const imageModal = new PopupWithImage({ img, caption }, "#image-popup");
  imageModal.open();
  imageModal.setEventListeners();
}

function renderCard(name, link, container){
  const card = new Card(name, link, '#template-card', handleCardClick);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleCardFormSubmit(event, inputs) {
  event.preventDefault();
  
  renderCard(inputs['place-name'], inputs.link, cardContainer);

  newCardModal.close()
}

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
  newCardModal.open()
  validatorCardForm.setEventListeners();
}

initialCard.forEach(card => {
  renderCard(card.name, card.link, cardContainer)
})

btnEditProfile.addEventListener("click",() => {
  handleOpenEditModal();
});

btnNewCard.addEventListener("click", () => {
  handleNewCardModal();
})
