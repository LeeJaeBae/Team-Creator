import { Injectable } from '@nestjs/common';
import { Group } from './group';
import { Student } from './student';

@Injectable()
export class AppService {
  data: Student[] = [];
  groupCount = 0;
  groups: Group[] = [];
  history: any[] = [];

  async createStudent(name): Promise<void> {
    if (this.data.find((v) => v.name === name)) {
      return;
    } else {
      this.data.push(new Student(name));
    }
  }

  getAllStudent() {
    console.log(this.data);
    return { data: this.data };
  }

  async deleteOne(name): Promise<void> {
    console.log(name);
    if (this.data.find((v) => v.name === name)) {
      this.data = this.data.filter((v) => v.name !== name);
    }
  }

  findOne(name): Student {
    if (this.data.find((v) => v.name === name)) {
      return this.data.find((v) => v.name === name);
    } else {
      return null;
    }
  }

  async setLoveStd(data): Promise<void> {
    console.log(data);
    const target = this.findOne(data.name);
    target.setLoveStudent({
      first: data.first,
      second: data.second,
      third: data.third,
    });
  }
  async setHateStd(data): Promise<void> {
    console.log(data);
    const target = this.findOne(data.name);
    target.setHateStudent({
      first: data.first,
      second: data.second,
      third: data.third,
    });
  }
}
