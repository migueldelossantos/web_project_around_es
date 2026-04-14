class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._btnSubmitSelector = config.btnSubmitSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;
  }

  _getForm () {
    this._form = document.querySelector(this._formSelector)
  }

  _getInputs () {
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  _getBtnSubmit () {
    this._btnSubmit = this._form.querySelector(this._btnSubmitSelector);
  }

  _showInputError(element, errorMessage) {
    const errorElement = this._form.querySelector(`.${element.name}-input-error`);
    element.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(element) {
    const errorElement = this._form.querySelector(`.${element.name}-input-error`);
    element.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _toggleButtonState() {
    const allValid = Array.from(this._inputs).every(input => input.validity.valid);
    this._btnSubmit.disabled = !allValid;
  }

  setEventListeners () {
    this._getForm();
    this._getInputs();
    this._getBtnSubmit()

    this._inputs.forEach(input => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }
        this._toggleButtonState();
      })
    })
  }
}

export default FormValidator;