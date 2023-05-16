import { api } from "../src/api.js";
import { auth } from "../src/auth.js";
import { feed } from "../src/feed.js";
import { header } from "../src/header.js";

const md = window.markdownit();

var createPostModal = (refreshPage) => {
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

    const postBtn = document.querySelector(".modalSubmitBtn")
    postBtn.addEventListener("click", postContent)

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
      placeholder: "O que voce tem para dizer...",
      spellChecker: false
    });
  };

  let render = () => {
    if (!auth.state.user) return;

    // adiciona botao de criar post na tela
    elements.openBtn.classList.add("openModalBtn");
    elements.openBtn.innerText = "Criar Publicação";
    elements.openBtn.addEventListener("click", toggleModal)
    elements.feed.insertBefore(elements.openBtn, elements.feed.firstChild);

    createModal();
 };

  let postContent = async () => {
    const result = md.render(state.simpleMde.value())

    const userId = auth.state.user.id; 

    const body = {
      userId,
      content: result
    }

    await api.createPost(body)

    state.simpleMde.value("")
    toggleModal()
    await refreshPage()
  }

  return {
    render,
    toggleModal,
  };
};

const feedPage = () => {
  const components = {
    header: header(),
    modal: createPostModal(render),
    feed: feed()
  }

  var render = async () => {
    const posts = await api.getAllPosts()

    components.feed.setPosts(posts)
    components.header.render()
    components.modal.render()
  }

  return {
    render 
  }
}

await feedPage().render()
