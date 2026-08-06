class Popup {

    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
    }

    open () {
        this._popup.classList.add("popup_is-opened");
    }

    close () {
        this._popup.classList.remove("popup_is-opened");
    }

    _handleEscClose () {
        document.body.addEventListener('keydown', function (e) {
            if (e.keyCode === 27) {
                const popupOpened = document.querySelector('.popup_is-opened');
                if (popupOpened) {
                    popupOpened.classList.remove("popup_is-opened");
                }
            }
        });
    }

    setEventListeners () {
        const btnClose = this._popup.querySelector(".popup__close")
        btnClose.addEventListener("click", () => {
            this._popup.classList.remove("popup_is-opened");
        })
        
        const pageContent = document.querySelector(".page__content");
        const modalOpened = this._popup;
        pageContent.addEventListener('click', function (e) {
            if (e.target === modalOpened) {
                e.target.classList.remove("popup_is-opened");
            }
        });

        this._handleEscClose();
    }
}

export default Popup;