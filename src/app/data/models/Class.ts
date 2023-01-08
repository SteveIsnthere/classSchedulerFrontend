import {Relation} from "./Relation";

export interface Class {
  _id: string;
  startTime: string;
  duration: number;
  finished: boolean;
  rating: number;
  comment: string;
  isOnline: boolean;
  info: Relation;
}
