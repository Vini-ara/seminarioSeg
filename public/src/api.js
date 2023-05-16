export var api = {
  getAllPosts: async () => {
    const response = await fetch("/api/post");

    return response.json();
  },
  createPost: async (body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    } 

    const response = await fetch("/api/post", opt);

    return response.json();
  },
  createUser: async (body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/user", opt);

    return response.json();
  },
  findUser: async (id) => {
    const response = await fetch(`/api/user/${id}`) 

    return response.json()
  },
  login: async (body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
    
    const response = await fetch("/api/auth/login", opt);
    
    return response.json();
  },
  refreshAuth: async (accessToken) => {
    const opt = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch("/api/auth/refresh", opt);

    return response.json();
  },
};
