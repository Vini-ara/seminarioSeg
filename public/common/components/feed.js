const posts = [
  {
    id: 1,
    content: "Hello there",
    updatedAt: "2023-05-03T14:53:57.214Z",
    createdAt: "2023-05-03T14:53:57.214Z",
    user: {
      id: 1,
      email: "jhondoe@gmail.com",
      username: "jhondoe",
      name: "Jhon Doe Douglas",
      image: "../common/akaza.jpg",
      createdAt: "2023-05-03T14:34:54.730Z",
    },
  },
];

export var feed = (rootElement, postList) => {
  postList.forEach((post) => {
    rootElement.innerHTML = `
                <div class="post">
                    <div class="postHeader">
                        <img src="${post.user.image}" alt="foto de perfil"> 
                        <h4>${post.user.name}</h4>
                        <span>${post.updatedAt}</span>
                    </div> 
                    <div class="postContent">
                      ${post.content}
                    </div>
                    <div class="postActions">
                        <button type="button">
                            <img src="../common/assets/Comment.png" alt="Comment button">
                        </button>
                    </div>
                </div> 
        `;
  });

  rootElement.appendChild();
};
