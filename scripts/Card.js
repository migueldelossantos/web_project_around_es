import { openModal } from './utils.js'

class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector
  }

  _getTemplate() {
    return document.querySelector(`${this._selector}`)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleImageModal() {
    const imageModal = document.querySelector("#image-popup");
    openModal(imageModal);

    const imageElement = imageModal.querySelector(".popup__image")
    const captionElement = imageModal.querySelector(".popup__caption")

    imageElement.src = this._link
    captionElement.textContent = this._name
  }

  _handleBtnLike(btn) {
    btn.target.classList.toggle("card__like-button_is-active");
  }

  _setEventListeners() {
    const imageElement = this._element.querySelector(".card__image");
    imageElement.addEventListener("click", () => {
      this._handleImageModal()
    })

    const btnLike = this._element.querySelector(".card__like-button");
    btnLike.addEventListener("click", this._handleBtnLike)

    const btnDelete = this._element.querySelector(".card__delete-button");
    btnDelete.addEventListener("click", () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.tag = this._name;

    const titleElement = this._element.querySelector(".card__title");
    titleElement.textContent = this._name;

    return this._element;
  }
}

export default Card;