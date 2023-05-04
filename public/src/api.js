export var api = {
  getAllPosts: async () => { 
    const response = await fetch('/posts');

    return response.json()
  },
  createUser: async (body) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body)
    }

    const response = await fetch("/user", opt)

    return response.json()
  }
}
