import Popup from "./Popup.js";

class PopupWithImage extends Popup {

    constructor ({ img, caption}, selectorPopup) {
        super(selectorPopup);
        this._img = img
        this._caption = caption
    }

    open () {
        super.open();

        const imageElement = this._popup.querySelector(".popup__image");
        const captionElement = this._popup.querySelector(".popup__caption");

        imageElement.src = this._img;
        captionElement.textContent = this._caption;
    }
}

export default PopupWithImage;