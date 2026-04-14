import { openModal, closeModal } from './utils.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

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

const editModal = document.querySelector("#edit-popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const formElement = document.querySelector("#edit-profile-form");
const cardContainer = document.querySelector(".cards__list");
const newCardModal = document.querySelector("#new-card-popup");
const btnNewCard = document.querySelector(".profile__add-button");
const formNewCard = document.querySelector("#new-card-form");
const imageModal = document.querySelector("#image-popup");
const btnCloseImageModal =  imageModal.querySelector(".popup__close");
const pageContent = document.querySelector(".page__content");


const configValidator = {
  inputSelector: '.popup__input',
  btnSubmitSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
const validatorEditProfile = new FormValidator(configValidator, '#edit-profile-form');
const validatorCardForm = new FormValidator(configValidator, '#new-card-form')

function fillProfileForm () {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const inputTitle = document.querySelector(".popup__input_type_name");
  const inputDescription = document.querySelector(".popup__input_type_description");

  inputTitle.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal () {
  fillProfileForm();
  openModal(editModal);
  validatorEditProfile.setEventListeners();
}

function handleNewCardModal() {
  openModal(newCardModal);
  validatorCardForm.setEventListeners();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector(".popup__input_type_name");
  const inputDescription = document.querySelector(".popup__input_type_description");

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = inputTitle.value
  profileDescription.textContent = inputDescription.value

  editModal.classList.remove("popup_is-opened");
}

function renderCard(name, link, container){
  const card = new Card(name, link, '#template-card');
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleCardFormSubmit(event) {
  event.preventDefault()

  const nameInput = newCardModal.querySelector(".popup__input_type_card-name");
  const urlInput = newCardModal.querySelector(".popup__input_type_url");

  renderCard(nameInput.value, urlInput.value, cardContainer);

  newCardModal.classList.remove("popup_is-opened");

  event.target.reset()
}

initialCard.forEach(card => {
  renderCard(card.name, card.link, cardContainer)
})

btnEditProfile.addEventListener("click",() => {
  handleOpenEditModal();
});
closeModal(editModal);

btnNewCard.addEventListener("click", () => {
  handleNewCardModal();
})
closeModal(newCardModal);

btnCloseImageModal.addEventListener("click", () => {
  closeModal(imageModal);
});
 
formElement.addEventListener("submit", handleProfileFormSubmit);
formNewCard.addEventListener("submit", handleCardFormSubmit)

pageContent.addEventListener('click', function (e) {
  if (e.target === editModal ||
    e.target === newCardModal || 
    e.target === imageModal
  ) {
    e.target.classList.remove("popup_is-opened");
  }
});

document.body.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_is-opened');
    if (popupOpened) {
      popupOpened.classList.remove("popup_is-opened");
    }
  }
});