import {dummyComment, PostComment} from "./PostComment";

export interface Post{
  title: string;
  likes: number;
  imageLink: string;
  time: string;
  content: string;
  authorNickName: string;
  comments: PostComment[];
}

export let dummyPost = {
  title: "test",
  likes: 0,
  imageLink: "https://www.google.com",
  time: "2019-01-01",
  content: "test",
  authorNickName: "test",
  comments: [dummyComment]
}
