import { api } from "../src/api.js";
import { header } from "../src/header.js";

const head = header();

var formCadastro = () => {
  let elements = {
    form: document.querySelector("form"),
    imagePreview: document.getElementById("profilePicInput"),
    imageInput: document.getElementById("imageInput"),
    nome: document.querySelector('input[name="nome"]'),
    email: document.querySelector('input[name="email"]'),
    senha: document.querySelector('input[name="password"]'),
  };

  let state = {
    imageFile: "",
    nome: "",
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

    elements.email.addEventListener("change", (e) => {
      state.email = e.target.value;
    });

    elements.senha.addEventListener("change", (e) => {
      state.senha = e.target.value;
    });
  };

  let formSubmit = async (e) => {
    e.preventDefault()

    const requestBody = {
      email: state.email ? state.email : elements.email.value,
      username: state.nome,
      password: state.senha ? state.senha : elements.senha.value,
      image: state.imageFile,
    };

    await api.createUser(requestBody)
    .then(() => {
      window.location.href = "/login"
      elements.form.reset();
    })
    .catch((err) => {
      alert("Erro ao criar usuário: " + err.message);
      console.error(err);
    });
  };

  return {
    formSetup,
  };
};

head.render();
formCadastro().formSetup();
