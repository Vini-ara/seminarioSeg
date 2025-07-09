import { api } from "./api.js";

var authorization = async () => {
  let state = {
    user: null,
  };

  let login = async (email, senha) => {
    const res = await api.login({
      email,
      password: senha,
    });

    if (res) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("expiresIn", res.expiresIn);

      state.user = res.user;
    }
  };

  let refresh = async (id, accessToken) => {
    const res = await api.refreshAuth(id);

    if (res) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("expiresIn", res.expiresIn);

      state.user = res.user;
    }
  };

  let logout = () => {
    state.user = null;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn");
  };

  let setup = async () => {
    const oldAccessToken = localStorage.getItem("accessToken");

    if (!oldAccessToken) return;

    const nowInSeconds = Math.floor(new Date().getTime() / 1000);

    const isTokenExpired =
      parseInt(localStorage.getItem("expiresIn")) < nowInSeconds;

    if (isTokenExpired) return;

    await refresh();

    console.log("User logged in from localStorage");
    console.log(state.user);
  };

  await setup();

  return {
    state,
    login,
    logout,
  };
};

export const auth = await authorization();
