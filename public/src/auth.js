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
      state.user = res.user;
      window.location.href = "/feed"
    }
  };

  let refresh = async () => {
    const res = await api.refreshAuth();

    if (res) {
      state.user = res.user;
      return;
    }

    if (!window.location.pathname.includes('/login')) {
      window.location.href = "/login";
    }
  };

  let logout = async () => {
    await api.logout();

    state.user = null;
  };

  let isLoggedIn = async () => {
    const res = await api.isLoggedIn();

    if (res) {
      state.user = res.user;
      return true;
    }

    return false;
  }

  let setup = async () => {
    await isLoggedIn()
      .then((isLogged) => {
        if (isLogged) {
          if (window.location.pathname.includes('/login')) {
            window.location.href = "/feed";
          }
          return;
        }
        
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/cadastro')) {
          window.location.href = "/login";
        }

      })
      .catch((err) => {
        console.error("Error checking login status:", err);
      })
  };

  await setup();

  return {
    state,
    login,
    logout,
    refresh,
  };
};

export const auth = await authorization();
