import { api } from "../src/api.js"
import { auth } from "../src/auth.js"
import { header } from "../src/header.js"
import { post } from "../src/post.js"

const md = window.markdownit();

const getPostId = () => {
  if(window.location.href.split("?").length < 2) {
    window.location.href = "http://localhost:3000/feed"
  }

  return window.location.href.split("=")[1]
}

const getPostInfo = async () => {
  const postId = getPostId()

  const postInfo = await api.getUniquePost(postId)

  if(!postInfo)
    window.location.href = "http://localhost:3000/feed"

  return postInfo
}

var createCommentModal = (refreshPage) => {
  let elements = {
    root: document.querySelector("main"),
    openBtn: document.querySelector(".createCommentBtn"),
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
          <button class="modalSubmitBtn">Comentar</button> 
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

  let postContent = async () => {
    const result = md.render(state.simpleMde.value())

    const userId = auth.state.user.id;
    const postId = parseInt(getPostId())

    const body = {
      content: result,
      userId,
      postId,
    }

    const accessToken = localStorage.getItem("accessToken")

    await api.createComment(accessToken, body)

    state.simpleMde.value("")
    toggleModal()
    await refreshPage()
  }

  let render = () => {
    if (!auth.state.user) return;

    // adiciona botao de criar post na tela
    elements.openBtn.classList.add("openModalBtn");
    elements.openBtn.addEventListener("click", toggleModal)

    createModal();
 };

  return {
    render,
    toggleModal,
  };
};



var commentList = () => {
  let elements = {
    root: document.querySelector(".content")
  }

  let state = {
    postInfo: null,
  }

  let setPostInfo = (postInfo) => {
    state.postInfo = postInfo
    render()
  }
  
  let render = async () => {
    while(elements.root.firstChild)
      elements.root.removeChild(elements.root.firstChild)

    let postInfo = await getPostInfo()

    state.postInfo = postInfo

    const postContent = post(postInfo, postInfo.user)
    elements.root.appendChild(postContent)

    const deleteWholePostBtn = document.getElementById(`delete${postInfo.id}`)
    deleteWholePostBtn.addEventListener("click", async () => {
      const accessToken = localStorage.getItem("accessToken")

      await api.deletePost(accessToken, postInfo.id)
    
      window.location.href = "/feed"
    })

    let comments = state.postInfo.comments

    for(let i = comments.length - 1; i >= 0; i--) {
      let comment = post(comments[i], comments[i].user, true)

      elements.root.appendChild(comment)

      const deleteCommentBtn = document.getElementById("deleteComment" + comments[i].id)
      deleteCommentBtn.addEventListener("click", async () => {
        const accessToken = localStorage.getItem("accessToken")

        await api.deleteComment(accessToken, comments[i].id)
        window.location.href = window.location.href
      })
    }
  }

  return {
    render,
    setPostInfo
  }
}

let commentsPage = () => {
  const components = {
    modal: createCommentModal(async () => await render()),
    commentList: commentList(),
    header: header(),
  }

  var render = async () => {
    components.header.render()
    components.modal.render()
    await components.commentList.render()
  }

  return {
    render
  }
}

await commentsPage().render()
