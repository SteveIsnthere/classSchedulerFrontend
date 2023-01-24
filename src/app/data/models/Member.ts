import {Course} from "./Course";
import {TimePeriod} from "./TimePeriod";

export interface Member {
  _id: string;
  name: string
  nickname: string
  email: string
  phone: string
  password: string
  isTeacher: boolean
  about: string
  noteToAdmin: string
  courses: Course[]
  unableTimes: TimePeriod[]
  preferredTimes: TimePeriod[]
}
