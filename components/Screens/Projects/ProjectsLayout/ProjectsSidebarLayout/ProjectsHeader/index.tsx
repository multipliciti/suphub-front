import { useAppSelector } from '@/redux/hooks';

import s from './ProjectsHeader.module.scss';

export const ProjectsHeader = () => {
	const project = useAppSelector((state) => state.projectItemSlice.project);
	return (
		<h1 className={s.wrapper}>
			<span className={s.text}>Company name</span>
			<span className={s.name}>{project ? project.name : 'All projects'}</span>
		</h1>
	);
};
