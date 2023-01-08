export interface DisplayElement {
  _id: string;
  isBlank: boolean;
  courseName: string;
  duration: number;
  student: string;
  teacher: string;
  isOnline: boolean;
}

export function getBlankDisplayElement(): DisplayElement {
  return {
    _id: "",
    isBlank: true,
    courseName: '',
    duration: 0.5,
    student: '',
    teacher: '',
    isOnline: false
  }
}
