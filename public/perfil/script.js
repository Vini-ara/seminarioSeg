import { header } from "../src/header.js";
import { feed } from "../src/feed.js";

const head = header();

const feedRootElem = document.querySelector(".userPosts");

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

feed(feedRootElem, posts).render();

head.render();
