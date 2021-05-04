import { Student } from './student';

export class Group {
  static count = 0;
  id: number;
  student: Student[];
  stdIds: number[];
  maxCount: number;
  point: number;

  constructor(maxCount) {
    this.id = Group.count++;
    this.maxCount = maxCount;
    this.point = 0;
    this.student = [];
    this.stdIds = [];
  }

  addStudent(std: Student) {
    this.student.push(std);
    this.stdIds.push(std.id);
  }

  calcPoint() {
    this.student.map((v) => {
      this.stdIds.map((std) => {
        if (v.stdList.includes(std)) {
          this.point++;
        }
      });
    });
  }
}
