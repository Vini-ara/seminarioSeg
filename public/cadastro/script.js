import { api } from "../src/api.js";
import { header } from "../src/header.js";

const head = header();

var formCadastro = () => {
  let elements = {
    form: document.querySelector("form"),
    imagePreview: document.getElementById("profilePicInput"),
    imageInput: document.getElementById("imageInput"),
    nome: document.querySelector('input[name="nome"]'),
    genero: document.querySelector('input[name="genero"]'),
    cargo: document.querySelector('input[name="cargo"]'),
    email: document.querySelector('input[name="email"]'),
    senha: document.querySelector('input[name="password"]'),
  };

  let state = {
    imageFile: "",
    nome: "",
    genero: "",
    cargo: "",
    email: "",
    senha: "",
  };

  let imagePreviewHandler = () => {
    const reader = new FileReader();

    elements.imageInput.addEventListener("input", () => {
      let file = elements.imageInput.files[0];

      reader.readAsDataURL(file);

      reader.addEventListener(
        "load",
        () => {
          elements.imagePreview.src = reader.result;
          state.imageFile = reader.result;
        },
        false
      );
    });
  };

  let formSetup = () => {
    imagePreviewHandler();

    elements.form.addEventListener("submit", formSubmit);

    elements.nome.addEventListener("change", (e) => {
      state.nome = e.target.value;
    });

    elements.genero.addEventListener("change", (e) => {
      state.genero = e.target.value;
    });

    elements.cargo.addEventListener("change", (e) => {
      state.cargo = e.target.value;
    });

    elements.email.addEventListener("change", (e) => {
      state.email = e.target.value;
    });

    elements.senha.addEventListener("change", (e) => {
      state.senha = e.target.value;
    });
  };

  let formSubmit = async () => {
    const requestBody = {
      email: state.email,
      username: state.nome,
      password: state.senha,
      name: state.nome,
      gender: state.genero,
      cargoId: 1,
      image: state.imageFile,
    };

    await api.createUser(requestBody);

    elements.form.reset();
  };

  return {
    formSetup,
  };
};

head.render();
formCadastro().formSetup();
