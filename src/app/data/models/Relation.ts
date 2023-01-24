export interface Relation {
  _id: string;
  courseName: string;
  price: number;
  salary: number;
  teacher: string;
  student: string;
  classPerWeek: number;
  duration: number;
}

export function dummyRelation() {
  return {
    _id: '',
    courseName: '',
    price: 0,
    salary: 0,
    teacher: '',
    student: '',
    classPerWeek: 0,
    duration: 0
  }
}
