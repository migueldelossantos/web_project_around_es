class Card {
  constructor(name, link, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(`${this._selector}`)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleBtnLike(btn) {
    btn.target.classList.toggle("card__like-button_is-active");
  }

  _setEventListeners() {
    const imageElement = this._element.querySelector(".card__image");
    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    })

    const btnLike = this._element.querySelector(".card__like-button");
    btnLike.addEventListener("click", (e) => {
      this._handleBtnLike(e)
    })

    const btnDelete = this._element.querySelector(".card__delete-button");
    btnDelete.addEventListener("click", () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate()

    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.tag = this._name;

    const titleElement = this._element.querySelector(".card__title");
    titleElement.textContent = this._name;

    this._setEventListeners()

    return this._element;
  }
}

export default Card;