import { api } from './api.js'
import { post } from './post.js'

export const feed = (rootElement = document.querySelector(".feed")) => {
  var state = {
    posts: []
  }

  let setPosts = (postList) => {
    state.posts = postList
    render()
  }

  let render = () => {
    while(rootElement.firstChild)
      rootElement.removeChild(rootElement.lastChild)

    for(let i = state.posts.length - 1; i >= 0; i--) {
      let newPost = post(state.posts[i], state.posts[i].user) 

      rootElement.appendChild(newPost)

      const deleteButton = document.getElementById(`delete${state.posts[i].id}`)
      if(deleteButton) {
        deleteButton.addEventListener("click", async () => {
          const postId = state.posts[i].id

          await api.deletePost(postId)

          window.location.reload()
        })
      }
    }
  }

  return { 
    render,
    setPosts
  }
}
