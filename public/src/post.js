import { auth } from "./auth.js";

export const post = (postInfo, userInfo, isComment = false) => {
  let dateNormalization = (date) => {
    let newDate = new Date(date);

    const options = { month: "long", day: "numeric", year: "numeric" };

    return newDate.toLocaleDateString("pt-BR", options);
  };

  let postElem = document.createElement("div");

  const isDeletable =
    auth.state.user?.isAdmin | (auth.state.user?.id == userInfo.id);

  postElem.classList.add("post");

  postElem.innerHTML = `
                <div class="postHeader">
                    <img src="${userInfo.image}" alt="foto de perfil"> 
                    <h4><a href="/perfil/?id=${userInfo.id}">${
    userInfo.username
  }</a></h4>
                    <span>${dateNormalization(postInfo.updatedAt)}</span>
                    ${
                      isDeletable
                        ? `
                        <button class="delete" id="${
                          !isComment
                            ? "delete" + postInfo.id
                            : "deleteComment" + postInfo.id
                        }">
                          <img src="../common/assets/trash-2.png" alt="excluir Post">
                        </button>
                      `
                        : ""
                    }
                </div> 
                <div class="postContent">
                  ${postInfo.content}
                </div>
    `;

  return postElem;
};
