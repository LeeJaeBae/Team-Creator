import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { NextConfig } from 'next/dist/next-server/server/config-shared';
import { AppController } from './app.controller';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { StudentModule } from './student/student.module';

@Module({
	imports: [
		RenderModule.forRootAsync(
			Next({
				dev: process.env.NODE_ENV !== 'production',
				conf: ((): any => {
					return { useFilesystemPublicRoutes: false };
				})(),
			})
		),
		StudentModule,
	],
	controllers: [AppController, BlogController],
	providers: [BlogService],
})
export class AppModule {}
