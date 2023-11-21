'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { setProjectIdForDelete } from '@/redux/slices/projects/projectsSidebar';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';

import s from './ProjectsList.module.scss';

import delete_icon from '@/imgs/Buyer&Seller/delete_icon.svg';

export const ProjectsList = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const status = useAppSelector((state) => state.projectsSlice.status);
	const projectList = useAppSelector((state) => state.projectsSlice.result);
	const project = useAppSelector((state) => state.projectItemSlice.project);

	const handleSelectProject = (id: number) => {
		router.push(`/projects/${id}/overview`);
	};

	const handleDeleteProject = (id: number) => {
		dispatch(setProjectIdForDelete(id));
		dispatch(setModal('deleteProject'));
	};

	return (
		<div className={s.wrapper}>
			{projectList.map((item, index) => (
				<div
					key={`${item.id}+${index}`}
					className={classNames(s.item, project?.id === item.id && s.item_active)}
				>
					<p className={s.item_title} onClick={() => handleSelectProject(item.id)}>
						{item.name}
					</p>
					<Image
						className={classNames(s.item_delete, s.active)}
						onClick={() => handleDeleteProject(item.id)}
						src={delete_icon}
						alt="delete_icon"
						width={16}
						height={16}
					/>
				</div>
			))}
			{status === 'rejected' && <div>Something went wrong</div>}
		</div>
	);
};
