import { useAppSelector } from '@/redux/hooks';

import s from './ProjectsHeader.module.scss';

export const ProjectsHeader = () => {
	const buyerCompany = useAppSelector((state) => state.authSlice.buyerCompany);
	const project = useAppSelector((state) => state.projectItemSlice.project);

	return (
		<h1 className={s.wrapper}>
			{buyerCompany && <span className={s.text}>{buyerCompany.name}</span>}
			<span className={s.name}>{project ? project.name : 'All projects'}</span>
		</h1>
	);
};
