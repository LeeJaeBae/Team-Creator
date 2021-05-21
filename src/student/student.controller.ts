import { Controller, Get, Render } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(service: StudentService) {}
	@Render('student')
	@Get()
	public index() {
		return { students: ['test'] };
	}
}
