import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Group } from './group';
import { Student } from './student';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    AppController.data.push(
      new Student({
        name: `이재원`,
        first: `조승현`,
        second: `이구슬`,
        third: `김희수`,
      }),
      new Student({
        name: `조승현`,
        first: `이재원`,
        second: `정재순`,
        third: `김희수`,
      }),
      new Student({
        name: `이구슬`,
        first: `이승형`,
        second: `이재원`,
        third: `정예준`,
      }),
      new Student({
        name: `김희수`,
        first: `이재원`,
        second: `조승현`,
        third: `김재경`,
      }),
      new Student({
        name: `김재경`,
        first: `김한얼`,
        second: `정재순`,
        third: `변희주`,
      }),
      new Student({
        name: `김한얼`,
        first: `조승현`,
        second: `이승형`,
        third: `황용주`,
      }),
      new Student({
        name: `황용주`,
        first: `조승현`,
        second: `이구슬`,
        third: `이재원`,
      }),
      new Student({
        name: `정재순`,
        first: `김한얼`,
        second: `이승형`,
        third: `김희수`,
      }),
      new Student({
        name: `이승형`,
        first: `조승현`,
        second: `이구슬`,
        third: `김한얼`,
      }),
      new Student({
        name: `정예준`,
        first: `조승현`,
        second: `이구슬`,
        third: `김희수`,
      }),
    );
  }

  static data: Student[] = [];
  static groupCount = 0;
  static groups: Group[] = [];
  static history: any[] = [];

  @Get()
  @Render('Home')
  getHome() {
    return {
      data: AppController.data,
      groups: AppController.groups.length > 0 ? AppController.groups : [[], 0],
      history: AppController.history,
    };
  }

  @Post('/')
  @Render('Home')
  insertStudent(@Body() data: Student) {
    let key: boolean;
    key = true;
    Object.keys(data).map((v) => {
      if (data[v] === '') {
        key = false;
      }
    });
    if (key) AppController.data.push(new Student({ ...data }));
    return { data: AppController.data };
  }

  @Get('/group')
  @Render('Group')
  getGroup() {
    return {
      data: AppController.data,
      count: AppController.groupCount,
      stdCount: AppController.data.length,
    };
  }

  @Post('/group')
  @Render('Group')
  postGroup(@Body() data) {
    AppController.groupCount = data.count | 0;
    return {
      data: AppController.data,
      count: AppController.groupCount,
      stdCount: AppController.data.length,
    };
  }

  @Post('/create')
  async postCreate(@Res() res: Response) {
    await this.checkTarget()
      .then(() => {
        this.createGroup();
      })
      .catch((e) => {
        console.log(e);
      });
    res.redirect('/');
  }

  async checkTarget(): Promise<void> {
    const targets: string[] = ['first', 'second', 'third'];
    AppController.data.map((v) => {
      v.setStdList(AppController.data);
      for (const target of targets) {
        const std: Student[] = AppController.data.filter(
          (std) => std.name === v[target],
        );
        if (
          std.length > 0 &&
          std[0].targeted.filter((id) => id === v.id).length === 0
        ) {
          std[0].targeted.push(v.id);
        }
      }
    });
  }

  async createGroup(): Promise<void> {
    for (let k = 0; k < 100000; k++) {
      if (AppController.groups.length > 0) {
        let point = 0;
        for (const group of AppController.groups) {
          point += group.point;
        }
        AppController.history.push([
          AppController.groups,
          point / AppController.groups.length,
        ]);
        AppController.groups = [];
      }
      if (AppController.groupCount > 0) {
        for (let i = 0; i < AppController.groupCount; i++)
          AppController.groups.push(
            new Group(Math.round(Student.count / AppController.groupCount)),
          );
      }
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      const students: any[] = AppController.data.slice();
      shuffleArray(students);
      let index = 0;
      while (students.length !== 0) {
        const target = students.shift();
        AppController.groups[index].addStudent(target);
        index = (index + 1) % AppController.groupCount;
      }
      for (const group of AppController.groups) {
        group.calcPoint();
      }
    }
    AppController.history.sort((a, b) => a[1] - b[1]);
    AppController.groups = AppController.history.pop();
  }

  @Redirect('/create', 200)
  goHome() {
    return { url: 'http://localhost:3000' };
  }
}
