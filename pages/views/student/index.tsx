import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import { IPost } from '../../../types';
import PostPreview from '../../../components/post-preview';
import { BlogService } from '../../../src/blog/blog.service';

interface Props {
	students: string[];
}

const Student: NextPage<Props> = ({ students }) => {
	return (
		<div>
			<h1>Students</h1>
			<div>
				{students &&
					students.map((v) => {
						return <div>{v}</div>;
					})}
			</div>
			<div style={{ fontStyle: 'italic', fontSize: 14 }}>this page was rendered on the</div>
		</div>
	);
};

export async function getServerSideProps(ctx: NextPageContext) {
	// const props: Props = {
	// 	students: ctx.query.students as string[],
	// };
	return { props: { students: ctx.query.students || null } };
}

export default Student;
