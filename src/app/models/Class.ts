import {Relation} from "./Relation";

export interface Class {
  startTime: string;
  duration: number;
  finished: boolean;
  rating: number;
  comment: string;
  isOnline: boolean;
  info: Relation;
}
