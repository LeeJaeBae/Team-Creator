export class Student {
  id: number;
  name: string;
  first: string;
  second: string;
  third: string;

  stdList: number[];

  targeted: number[];

  static count = 0;

  constructor({ name, first, second, third }) {
    this.id = Student.count++;
    this.name = name;
    this.first = first;
    this.second = second;
    this.third = third;
    this.targeted = [];
    this.stdList = [];
  }

  setStdList(list: Student[]) {
    if (this.stdList.length > 0) {
      return;
    }
    if (list.filter((v) => v.name === this.first).length > 0)
      this.stdList.push(list.filter((v) => v.name === this.first)[0].id);
    if (list.filter((v) => v.name === this.second).length > 0)
      this.stdList.push(list.filter((v) => v.name === this.second)[0].id);
    if (list.filter((v) => v.name === this.third).length > 0)
      this.stdList.push(list.filter((v) => v.name === this.third)[0].id);
  }
}
