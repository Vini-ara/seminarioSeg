const posts = [
    {
        userInfo: {},
        postContent: {}
    }
]

var feed = (rootElement, postList) => {
    postList.forEach(post => {
        rootElement.innerHTML = `
                <div class="post">
                    <div class="postHeader">
                        <img src="../common/assets/akaza.jpg" alt="foto de perfil"> 
                        <h4>Fulaninho de tal</h4>
                        <span>17 mar 2023</span>
                    </div> 
                    <div class="postContent">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                    </div>
                    <div class="postActions">
                        <button type="button">
                            <img src="../common/assets/Comment.png" alt="Comment button">
                        </button>
                    </div>
                </div> 
        `



        e
    })

    rootElement.appendChild();

}
