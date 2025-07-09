export const httpClient = axios.create();

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
    error.response?.status === 401
  ) {
    console.log("Token expirado ou inválido, redirecionando para login...");

    axios.get("/api/auth/refresh")
      .then((res) => {
        if (res.data) {
          // recarrega a pagina
          window.location.reload();

          return httpClient(originalRequest);
        }
      })
      .catch((err) => {
        console.error("Erro ao tentar atualizar o token:", err);
    
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      })

    return;
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
  isLoggedIn: async () => {
    const response = await httpClient.get("/api/auth/isLogged");

    return response?.data;
  }
};
