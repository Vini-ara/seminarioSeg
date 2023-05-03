export var feed = (rootElement, postList) => {
  let dateNormalization = (date) => {
    let newDate = new Date(date)

    const options = { month: 'long', day: 'numeric', year: 'numeric' }

    return newDate.toLocaleDateString('pt-BR', options)
  }

  let render = () => {
    while(rootElement.firstChild)
      rootElement.removeChild(rootElement.lastChild)

    let inner = ""

    postList.forEach((post) => {
      let postElem = document.createElement("div")
      postElem.classList.add("post")

      postElem.innerHTML = `
                    <div class="postHeader">
                        <img src="${post.user.image}" alt="foto de perfil"> 
                        <h4>${post.user.name}</h4>
                        <span>${dateNormalization(post.updatedAt)}</span>
                    </div> 
                    <div class="postContent">
                      ${post.content}
                    </div>
                    <div class="postActions">
                        <button type="button">
                            <img src="../common/assets/Comment.png" alt="Comment button">
                        </button>
                    </div>
        `
      rootElement.appendChild(postElem)
    })
  }

  return { render }
}
