import { header } from "../src/header.js";
import { auth } from "../src/auth.js";

const head = header();

var formLogin = () => {
  let elements = {
    form: document.querySelector("form"),
    email: document.querySelector('input[name="email"]'),
    senha: document.querySelector('input[name="senha"]'),
  };

  let state = {
    email: "",
    senha: "",
  };

  let formSetup = () => {
    elements.form.addEventListener("submit", formSubmit);

    elements.email.addEventListener("change", (e) => {
      state.email = e.target.value;
    });

    elements.senha.addEventListener("change", (e) => {
      state.senha = e.target.value;
    });
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    
    state.email = elements.email.value;
    state.senha = elements.senha.value;

    await auth.login(state.email, state.senha);
  };

  let render = () => {
    if (auth.state.user) {
      window.location.href = "/feed";
      return;
    }

    formSetup();
  }

  return {
    render
  };
};

formLogin().render();
head.render();
