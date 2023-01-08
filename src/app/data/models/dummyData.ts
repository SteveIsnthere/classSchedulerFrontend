import {Member} from "./Member";

export let dummyStudent: Member = {
  _id: '1',
  name: "",
  nickname: "",
  email: "",
  phone: "123-456-7890",
  password: "password",
  isTeacher: false,
  about: "I am a student",
  noteToAdmin: "I am a student",
  courses: [],
  plans: [],
  unableTimes: [],
  preferredTimes: []
}

export let dummyTeacher: Member = {
  _id: '2',
  name: "",
  nickname: "Lorrainex912",
  email: "",
  phone: "123-456-7890",
  password: "password",
  isTeacher: true,
  about: "I am a teacher",
  noteToAdmin: "I am a teacher",
  courses: [],
  plans: [],
  unableTimes: [],
  preferredTimes: []
}
