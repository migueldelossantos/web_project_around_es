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

initialCard.forEach(card => {
  console.log(card.name);
})

const editModal = document.querySelector("#edit-popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const formElement = document.querySelector("#edit-profile-form");

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

btnEditProfile.addEventListener("click",() => {
  handleOpenEditModal();
});
closeModal(editModal);

formElement.addEventListener("submit", handleProfileFormSubmit);