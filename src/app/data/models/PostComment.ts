export interface PostComment{
  authorNickName: string;
  content: string;
  likes: number;
}


export let dummyComment = {
  authorNickName: "test",
  content: "test",
  likes: 0
}
