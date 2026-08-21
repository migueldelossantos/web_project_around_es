class Card {
  constructor(item, userInfo, selector, handleCardClick, handleBtnLike, handleDeleteCard) {
    this._id = item._id;
    this._name = item.name;
    this._link = item.link;
    this._owner = item.owner;
    this._isLiked = item.isLiked;
    this._selector = selector;
    this._userInfo = userInfo;
    this._handleCardClick = handleCardClick;
    this._handleBtnLike = handleBtnLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    return document.querySelector(`${this._selector}`)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    const imageElement = this._element.querySelector(".card__image");
    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    })

    const btnLike = this._element.querySelector(".card__like-button");
    btnLike.addEventListener("click", (e) => {
      this._handleBtnLike(this._id, this._isLiked, e);
    })

    const btnDelete = this._element.querySelector(".card__delete-button");
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        this._handleDeleteCard(this._id, this._element);
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate()

    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;

    const titleElement = this._element.querySelector(".card__title");
    titleElement.textContent = this._name;

    const btnLike = this._element.querySelector(".card__like-button");
    if (this._isLiked) {
      btnLike.classList.add("card__like-button_is-active");
    }

    const btnDelete = this._element.querySelector(".card__delete-button");
    if (this._owner !== this._userInfo._id) {
      btnDelete.remove();
    }

    this._setEventListeners()

    return this._element;
  }

  changeIsLiked() {
    this._isLiked = !this._isLiked;
  }
}

export default Card;