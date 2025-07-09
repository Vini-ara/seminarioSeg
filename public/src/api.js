export const httpClient = axios.create();

httpClient.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      config.headers["Content-Type"] = "application/json";

      return config;
    } catch (error) {
      console.error("Erro ao obter token:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Erro na resposta:", error);
    return responseErrorInterceptor(error);
  }
);

function responseErrorInterceptor(error) {
  const originalRequest = error.config;

  if (
    error.response?.status === 403
  ) {
    localStorage.clear();

    console.log("Token expirado ou inválido, redirecionando para login...");

    window.location.href = "/login";
    return;

    // originalRequest._retry = true; // Evitar retry infinito
    //
    // if (!isRefreshing) {
    //   isRefreshing = true;
    //
    //   // Timeout na renovação do token
    //   const refreshPromise = refreshToken();
    //   const timeoutPromise = new Promise((_, reject) =>
    //     setTimeout(() => reject(new Error("Timeout na renovação")), 10000)
    //   );
    //
    //   Promise.race([refreshPromise, timeoutPromise])
    //     .then((accessToken) => {
    //       handleTokenRefreshSuccess(accessToken as string);
    //     })
    //     .catch((err) => {
    //       console.log("Erro ao atualizar token:", err);
    //       handleTokenRefreshFailure(err);
    //     })
    //     .finally(() => {
    //       isRefreshing = false;
    //     });
    }

  return Promise.reject(error);
}




export var api = {
  getAllPosts: async () => {
    const response = await httpClient.get("/api/post");

    return response.data;
  },
  getUniquePost: async (id) => {
    const response = await httpClient.fetch(`/api/post/${id}`)
    
    return response.data;
  },
  createPost: async (body) => {
    const response = await httpClient.post("/api/post", body);

    return response.data;
  },
  deletePost: async (postId) => {
    const response = await httpClient.delete(`/api/post/${postId}`)

    return response.data;
  },
  createComment: async (body) => {
    const response = await fetch("/api/comment", body)

    return response.data;
  },
  deleteComment: async (id) => {
    const response = await httpClient.delete(`/api/comment/${id}`)

    return response.data;
  },
  createUser: async (body) => {
    const response = await httpClient.post("/api/user", body)

    return response.data;
  },
  findUser: async (id) => {
    const response = await httpClient.get(`/api/user/${id}`) 

    return response.data;
  },
  login: async (body) => {
    const response = await httpClient.post("/api/auth/login", body);
    
    return response.data;
  },
  refreshAuth: async () => {
    const response = await httpClient.get("/api/auth/refresh");

    return response.data;
  },
};
