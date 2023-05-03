import { header } from "../common/components/header.js";
import { feed } from "../common/components/feed.js";

header({
  name: "Vinizada",
  img: "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
}).render()

const feedRootElem = document.querySelector(".userPosts")

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
      image: "../common/assets/akaza.jpg",
      createdAt: "2023-05-03T14:34:54.730Z",
    },
  },
];

feed(
  feedRootElem,
  posts
).render()
