
export const post = (postInfo, userInfo) => {
  let dateNormalization = (date) => {
    let newDate = new Date(date)

    const options = { month: 'long', day: 'numeric', year: 'numeric' }

    return newDate.toLocaleDateString('pt-BR', options)
  }

  let postElem = document.createElement("div")

  postElem.classList.add("post")

  postElem.innerHTML = `
                <div class="postHeader">
                    <img src="${userInfo.image}" alt="foto de perfil"> 
                    <h4>${userInfo.name}</h4>
                    <span>${dateNormalization(postInfo.updatedAt)}</span>
                </div> 
                <div class="postContent">
                  ${postInfo.content}
                </div>
                <div class="postActions">
                    <button type="button">
                        <img src="../common/assets/Comment.png" alt="Comment button">
                    </button>
                </div>
    `

  return postElem
}
