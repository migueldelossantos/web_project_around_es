class UserInfo {

    constructor ({ selectorName, selectorDescription, selectorAvatar }) {
        this._name = document.querySelector(selectorName);
        this._description = document.querySelector(selectorDescription);
        this._avatar = document.querySelector(selectorAvatar)
    }

    getUserInfo () {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }

    setUserInfo ({ name, about, avatar }) {
        this._name.textContent = name;
        this._description.textContent = about;
        this._avatar.src = avatar;
    }
}

export default UserInfo;