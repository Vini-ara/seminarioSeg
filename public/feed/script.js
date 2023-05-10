import { auth } from "../src/auth.js";
import { header } from "../src/header.js";

const head = header();

var createPostModal = () => {
  let elements = {
    root: document.querySelector("main"),
    openBtn: document.createElement("button"),
    feed: document.querySelector(".feed"),
    modalOverlay: document.createElement("section"),
  };

  let state = {
    simpleMde: null,
  };

  let toggleModal = () => {
    const overlay = elements.modalOverlay;
    if (overlay.classList.contains("active")) {
      overlay.classList.remove("active");
    } else {
      overlay.classList.add("active");
    }
  };

  let createModal = () => {
    const overlay = elements.modalOverlay;
    overlay.classList.add("modalOverlay");
    overlay.innerHTML = `
      <div class="modal">
        <textarea name="simpleMde" id="simpleMde" cols="30" rows="10"></textarea>
        <div class="modalActions">
          <button>Cancelar</button> 
          <button class="modalSubmitBtn">Publicar</button> 
        </div>
      </div>
    `;

    elements.root.appendChild(elements.modalOverlay);

    const closeModalBtn =
      document.querySelector(".modalActions").firstElementChild;
    closeModalBtn.addEventListener("click", toggleModal);
  };

  let render = () => {
    if (!auth.state.user) return;

    // adiciona botao de criar post na tela
    elements.openBtn.classList.add("openModalBtn");
    elements.openBtn.innerText = "Criar Publicação";
    elements.feed.insertBefore(elements.openBtn, elements.feed.firstChild);

    createModal();

    state.simpleMde = new SimpleMDE({
      element: document.getElementById("simpleMde"),
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "link",
        "image",
        "preview",
        "guide",
      ],
    });
  };

  return {
    render,
    toggleModal,
  };
};

head.render();

const Modal = createPostModal();
Modal.render();
