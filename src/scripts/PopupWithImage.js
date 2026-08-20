import Popup from "./Popup.js";

class PopupWithImage extends Popup {

    constructor (selectorPopup) {
        super(selectorPopup);
    }

    open ({ image, caption }) {
        super.open();

        const imageElement = this._popup.querySelector(".popup__image");
        const captionElement = this._popup.querySelector(".popup__caption");

        imageElement.src = image;
        captionElement.textContent = caption;
    }
}

export default PopupWithImage;