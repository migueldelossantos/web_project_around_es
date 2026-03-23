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
const cardTemplate = document.querySelector("#template-card").content.querySelector(".card")
const newCardModal = document.querySelector("#new-card-popup");
const btnNewCard = document.querySelector(".profile__add-button");
const formNewCard = document.querySelector("#new-card-form");
const imageModal = document.querySelector("#image-popup");
const btnCloseImageModal =  imageModal.querySelector(".popup__close");
const pageContent = document.querySelector(".page__content");

function openModal(element){
  element.classList.add("popup_is-opened");
}

function closeModal(element){
  const btnClose = element.querySelector(".popup__close")
  btnClose.addEventListener("click", () => {
    element.classList.remove("popup_is-opened");
  })
}

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
  enableValidation(editModal);
}

function handleNewCardModal() {
  openModal(newCardModal);
  enableValidation(newCardModal);
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

function handleBtnLike(element) {
  element.target.classList.toggle("card__like-button_is-active");
}

function handleImageModal(name, link) {
  openModal(imageModal);

  const imageElement = imageModal.querySelector(".popup__image")
  const captionElement = imageModal.querySelector(".popup__caption")

  imageElement.src = link
  captionElement.textContent = name
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = link;
  imageElement.tag = name;
  imageElement.addEventListener("click", function () {
    handleImageModal(name, link)
  });

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = name;

  const btnLike = cardElement.querySelector(".card__like-button");
  btnLike.addEventListener("click", handleBtnLike)

  const btnDelete = cardElement.querySelector(".card__delete-button");
  btnDelete.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(name, link, container){
  const cardElement = getCardElement(name, link);
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

function showInputError(form, element, errorMessage) {
  const errorElement = form.querySelector(`.${element.name}-input-error`);
  element.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

function hideInputError(form, element) {
  const errorElement = form.querySelector(`.${element.name}-input-error`);
  element.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

function toggleButtonState(inputs, btnSubmit) {
  const allValid = Array.from(inputs).every(input => input.validity.valid);
  btnSubmit.disabled = !allValid;
}

function enableValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const btbSubmit = form.querySelector(".popup__button");

  toggleButtonState(inputs, btbSubmit);

  inputs.forEach(input => {
    input.addEventListener("input", function() {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
      toggleButtonState(inputs, btbSubmit);
    });
  });
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