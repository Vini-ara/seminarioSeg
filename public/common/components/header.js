var header = (user) => {
  let state = {
    logged: false
  }

  let root = document.querySelector(".info")

  let handleBtnClick = () => {
    state.logged = state.logged ? false : true

    render()
  }

  let setHandlers = () => {
    let btn = root.querySelector("button")

    if(btn) {
      btn.addEventListener('click', handleBtnClick)
    }
  }

  let render = () => {
    root.innerHTML = state.logged ? 
      `
        <p class="username"> ${user.name} </p>
        <img src=${user.img} alt="user profile picture">
      ` : `
        <p>Cadastre-se</p> 
        <button type="button">Entrar</button> 
      `

    setHandlers()
  }

  return {
    root,
    render
  } 
}

export { header }
