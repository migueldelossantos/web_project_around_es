export function openModal(element){
  element.classList.add("popup_is-opened");
}

export function closeModal(element){
  const btnClose = element.querySelector(".popup__close")
  btnClose.addEventListener("click", () => {
    element.classList.remove("popup_is-opened");
  })
}