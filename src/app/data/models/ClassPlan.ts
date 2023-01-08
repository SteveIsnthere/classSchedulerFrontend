import {Relation} from "./Relation";

export interface ClassPlan {
  _id: string;
  weekDay: number
  info: Relation
  startTime: string
  duration: number
}
