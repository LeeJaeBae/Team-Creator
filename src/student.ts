export class Student {
  id: number;
  name: string;
  love_first: string;
  love_second: string;
  love_third: string;
  hate_first: string;
  hate_second: string;
  hate_third: string;

  loveList: number[];
  hateList: number[];

  targeted: number[];

  done: boolean;

  static count = 0;

  constructor(name) {
    this.id = Student.count++;
    this.name = name;
    this.targeted = [];
    this.loveList = [];
    this.done = false;
  }

  setLoveStudent({ first = '', second = '', third = '' }) {
    this.love_first = first;
    this.love_second = second;
    this.love_third = third;
  }
  setHateStudent({ first = '', second = '', third = '' }) {
    this.hate_first = first;
    this.hate_second = second;
    this.hate_third = third;
    this.done = true;
  }

  setStdList(list: Student[]) {
    if (this.loveList.length > 0 || this.hateList.length > 0) {
      return;
    }
    if (list.filter((v) => v.name === this.love_first).length > 0)
      this.loveList.push(list.filter((v) => v.name === this.love_first)[0].id);
    if (list.filter((v) => v.name === this.love_second).length > 0)
      this.loveList.push(list.filter((v) => v.name === this.love_second)[0].id);
    if (list.filter((v) => v.name === this.love_third).length > 0)
      this.loveList.push(list.filter((v) => v.name === this.love_third)[0].id);
    if (list.filter((v) => v.name === this.hate_first).length > 0)
      this.hateList.push(list.filter((v) => v.name === this.hate_first)[0].id);
    if (list.filter((v) => v.name === this.hate_second).length > 0)
      this.hateList.push(list.filter((v) => v.name === this.hate_second)[0].id);
    if (list.filter((v) => v.name === this.hate_third).length > 0)
      this.hateList.push(list.filter((v) => v.name === this.hate_third)[0].id);
  }
}
