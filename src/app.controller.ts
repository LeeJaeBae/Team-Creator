import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
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
    // AppController.data.push(
    //   new Student({
    //     name: `이재원`,
    //     first: `조승현`,
    //     second: `이구슬`,
    //     third: `김희수`,
    //   }),
    //   new Student({
    //     name: `조승현`,
    //     first: `이재원`,
    //     second: `정재순`,
    //     third: `김희수`,
    //   }),
    //   new Student({
    //     name: `이구슬`,
    //     first: `이승형`,
    //     second: `이재원`,
    //     third: `정예준`,
    //   }),
    //   new Student({
    //     name: `김희수`,
    //     first: `이재원`,
    //     second: `조승현`,
    //     third: `김재경`,
    //   }),
    //   new Student({
    //     name: `김재경`,
    //     first: `김한얼`,
    //     second: `정재순`,
    //     third: `변희주`,
    //   }),
    //   new Student({
    //     name: `김한얼`,
    //     first: `조승현`,
    //     second: `이승형`,
    //     third: `황용주`,
    //   }),
    //   new Student({
    //     name: `황용주`,
    //     first: `조승현`,
    //     second: `이구슬`,
    //     third: `이재원`,
    //   }),
    //   new Student({
    //     name: `정재순`,
    //     first: `김한얼`,
    //     second: `이승형`,
    //     third: `김희수`,
    //   }),
    //   new Student({
    //     name: `이승형`,
    //     first: `조승현`,
    //     second: `이구슬`,
    //     third: `김한얼`,
    //   }),
    //   new Student({
    //     name: `정예준`,
    //     first: `조승현`,
    //     second: `이구슬`,
    //     third: `김희수`,
    //   }),
    // );
  }

  static data: Student[] = [];
  static groupCount = 0;
  static groups: Group[] = [];
  static history: any[] = [];

  @Get()
  @Render('Home')
  getHome() {
    return this.appService.getAllStudent();
  }

  @Post('/')
  async insertStudent(@Body() data: Student, @Res() res) {
    if (data.name === '') {
      res.redirect('/');
      return;
    }
    await this.appService.createStudent(data.name).then((v) => {
      res.redirect('/love?name=' + data.name);
    });
  }

  @Get('/delete')
  deleteStudent(@Query() data: Student, @Res() res) {
    this.appService.deleteOne(data.name).then((v) => {
      res.redirect('/');
    });
  }

  @Get('/love')
  @Render('Love')
  getLove(@Query() data, @Res() res) {
    if (this.appService.findOne(data.name)) {
      const _data = this.appService.getAllStudent();
      return { ..._data, name: data.name };
    } else {
      res.redirect('/');
    }
  }

  @Post('/love')
  postLove(@Body() data, @Res() res) {
    this.appService.setLoveStd(data).then((v) => {
      res.redirect('/hate?name=' + data.name);
    });
  }

  @Get('/hate')
  @Render('Hate')
  getHate(@Query() data, @Res() res) {
    if (this.appService.findOne(data.name)) {
      const _data = this.appService.getAllStudent();
      return { ..._data, name: data.name };
    } else {
      res.redirect('/');
    }
  }

  @Post('/hate')
  postHate(@Body() data, @Res() res) {
    this.appService.setHateStd(data).then((v) => {
      res.redirect('/');
    });
  }

  @Get('/group')
  @Render('Group')
  getGroup() {
    return {
      data: [...this.appService.getAllStudent().data],
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
        this.createGroup().then((v) => {
          res.redirect('/');
        });
      })
      .catch((e) => {
        res.redirect('/');
        console.log(e);
      });
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
    console.log(AppController.history);
    AppController.groups =
      // AppController.history[AppController.history.length - 1];
      AppController.history[0];
  }

  @Redirect('/create', 200)
  goHome() {
    return { url: 'http://localhost:3000' };
  }
}
