export var api = {
  getAllPosts: async () => {
    const response = await fetch("/api/post");

    return response.json();
  },
  getUniquePost: async (id) => {
    const response = await fetch(`/api/post/${id}`)
    
    return response.json()
  },
  createPost: async (accessToken, body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    } 

    const response = await fetch("/api/post", opt);

    return response.json();
  },
  deletePost: async (accessToken, postId) => {
    const opt = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`/api/post/${postId}`, opt)

    return response.json()
  },
  createComment: async (accessToken, body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }

    const response = await fetch("/api/comment", opt)

    return response.json()
  },
  deleteComment: async (accessToken, id) => {
    const opt = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    }

    const response = await fetch(`/api/comment/${id}`, opt)

    return response.json()
  },
  createUser: async (body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/user", opt)

    return response.json()
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
