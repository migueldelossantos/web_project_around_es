import Popup from "./Popup.js";

class PopupWithForm extends Popup {

    _form = this._popup.querySelector(".popup__form");

    constructor(handleFormSubmit, selectorPopup) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues () {
        this._inputList = this._form.querySelectorAll(".popup__input");

        this._formValues = {}

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    }

    setEventListeners () {
        super.setEventListeners();

        this._form.addEventListener("submit", (e) => { this._handleFormSubmit(e, this._getInputValues()) });
    }

    close () {
        this._form.reset();
        super.close();
    }
}

export default PopupWithForm;