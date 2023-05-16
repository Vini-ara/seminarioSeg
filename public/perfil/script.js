import { header } from "../src/header.js";
import { api } from "../src/api.js";
import { auth } from "../src/auth.js";
import { post } from "../src/post.js";

const getUserInfo = async () => {
  if(window.location.href.split("?").length < 2) {
    window.location.href = "http://localhost:3000/"
  }

  const id = window.location.href.split("=")[1]

  const userInfo = await api.findUser(id)

  if(!userInfo)
    window.location.href = "http://localhost:3000/"

  return userInfo
}

const userPostsList = () => {
  const elements = {
    root: document.querySelector(".userPosts")
  }

  const state = {
    userInfo: null
  }

  let setUserInfo = (userInfo) => {
    state.userInfo = userInfo
    render()
  }

  let render = () => {
    state.userInfo.posts.forEach((postInfo) => {
      let newPost = post(postInfo, state.userInfo)

      elements.root.appendChild(newPost)
    })
  }
   
  return { 
    render,
    setUserInfo
  }
}

const perfil = () => {
  const elements = {
    root: document.querySelector(".userInfo"),
    pfp: document.getElementById("profilePicture")
  }

  const state = {
    userInfo: null,
  }

  let setUserInfo = (userInfo) => {
    state.userInfo = userInfo
    render()
  }

  let render = () => {
    elements.root.innerHTML = `
      <div class="backgroundRectangle"></div>
      <div class="info">
          <img src="${state.userInfo.image}" alt="foto de perfil" id="profilePicture">
          <h3>${state.userInfo.username}</h3>
          <div class="atribute">
              <img src="../common/assets/cargo.png" alt="icone de cargo">
              <p>${state.userInfo.cargo.nome} - ${state.userInfo.cargo.nucleo}</p>
          </div>
          <div class="atribute">
              <img src="../common/assets/email.png" alt="icone de email">
              <p>${state.userInfo.email}</p>
          </div>
      </div>
    `
  }

  return {
    render,
    setUserInfo
  }
}

const profilePage = () => {
  const components = {
    header: header(),
    perfil: perfil(),
    userPosts: userPostsList(),
  }
  
  let start = async () => {
    const userInfo = await getUserInfo()

    components.perfil.setUserInfo(userInfo)
    components.userPosts.setUserInfo(userInfo)
    components.header.render()
  }

  return {
    start
  }
}

await profilePage().start()
