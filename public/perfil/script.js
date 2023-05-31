import { header } from "../src/header.js";
import { api } from "../src/api.js";
import { auth } from "../src/auth.js";
import { post } from "../src/post.js";

const getUserInfo = async () => {
  if (window.location.href.split("?").length < 2) {
    window.location.href = "http://localhost:3000/";
  }

  const id = window.location.href.split("=")[1];

  const userInfo = await api.findUser(id);

  if (!userInfo) window.location.href = "http://localhost:3000/";

  return userInfo;
};

const userPostsList = () => {
  const elements = {
    root: document.querySelector(".userPosts"),
  };

  const state = {
    userInfo: null,
  };

  let setUserInfo = (userInfo) => {
    state.userInfo = userInfo;
    render();
  };

  let render = () => {
    for (let i = state.userInfo.posts.length - 1; i >= 0; i--) {
      let newPost = post(state.userInfo.posts[i], state.userInfo);

      elements.root.appendChild(newPost);

      const deleteButton = document.getElementById(
        `delete${state.userInfo.posts[i].id}`
      );
      if (deleteButton) {
        deleteButton.addEventListener("click", async () => {
          const aceesToken = localStorage.getItem("accessToken");
          const postId = state.userInfo.posts[i].id;

          await api.deletePost(aceesToken, postId);
        });
      }
    }
  };

  return {
    render,
    setUserInfo,
  };
};

const perfil = () => {
  const elements = {
    root: document.querySelector(".userInfo"),
    pfp: document.getElementById("profilePicture"),
  };

  const state = {
    userInfo: null,
  };

  let setUserInfo = (userInfo) => {
    state.userInfo = userInfo;
    render();
  };

  let render = () => {
    elements.root.innerHTML = `
      <div class="backgroundRectangle"></div>
      <div class="info">
          <img src="${
            state.userInfo.image
          }" alt="foto de perfil" id="profilePicture">
          <h3>${state.userInfo.username}</h3>
          <div class="atribute">
              <img src="../common/assets/cargo.png" alt="icone de cargo">
              <p>${state.userInfo.cargo.nome} - ${
      state.userInfo.cargo.nucleo
    }</p>
          </div>
          <div class="atribute">
              <img src="../common/assets/email.png" alt="icone de email">
              <p>${state.userInfo.email}</p>
          </div>
          ${
            auth.state.user?.id == state.userInfo.id
              ? `<button class="edit">Editar</button>`
              : ""
          }
      </div>
    `;
  };

  return {
    render,
    setUserInfo,
  };
};

const EditModal = () => {
  let elements = {
    root: document.querySelector("main"),
    modalOverlay: document.createElement("section"),
    openBtn: document.querySelector(".edit"),
  };

  let createModal = () => {};

  let render = () => {
    if (!elements.openBtn) return;
  };

  return {
    render,
  };
};

const profilePage = () => {
  const components = {
    header: header(),
    perfil: perfil(),
    userPosts: userPostsList(),
  };

  let render = async () => {
    const userInfo = await getUserInfo();

    components.perfil.setUserInfo(userInfo);
    components.userPosts.setUserInfo(userInfo);
    components.header.render();
  };

  return {
    render,
  };
};

await profilePage().render();
