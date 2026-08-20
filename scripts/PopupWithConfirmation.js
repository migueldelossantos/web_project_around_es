import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
    
    constructor (selectorPopup, handleDeleteCard) {
        super(selectorPopup);
        this._handleDeleteCard = handleDeleteCard;
    }

    open (cardId,  element) {
        super.open();
        this._cardId = cardId;
        this._element = element;
    }

    setEventListeners () {
        super.setEventListeners();

        this._popup.querySelector(".popup__button")
            .addEventListener("click", (e) => {
                this._handleDeleteCard(this._cardId, this._element, e);
            });
    }

}

export default PopupWithConfirmation;