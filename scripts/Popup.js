class Popup {

    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open () {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close () {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose)
    }

    _handleEscClose (e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners () {
        const btnClose = this._popup.querySelector(".popup__close")
        btnClose.addEventListener("click", () => {
            this.close();
        })
        
        const pageContent = document.querySelector(".page__content");
        const self = this
        pageContent.addEventListener('click', (e) => {
            if (e.target === self._popup) {
                self.close();
            }
        });
    }
}

export default Popup;