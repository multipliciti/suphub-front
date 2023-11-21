import Image from 'next/image';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProjectIdForDelete } from '@/redux/slices/projects/projectsSidebar';
import { setResult, setStatus } from '@/redux/slices/projects/projects';
import { setModal } from '@/redux/slices/modal';
import { Api } from '@/services';

import s from './DeleteProject.module.scss';

import closeIcon from '@/imgs/Buyer&Seller/close.svg';
import house2Icon from '@/imgs/Buyer&Seller/house_2.svg';
import trash2Icon from '@/imgs/Buyer&Seller/trash_2.svg';

export const DeleteProject = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'error'>(
		'idle'
	);

	const projectIdForDelete = useAppSelector(
		(state) => state.projectsSidebar.projectIdForDelete
	);
	const project = useAppSelector((state) => state.projectItemSlice.project);
	const projectList = useAppSelector((state) => state.projectsSlice.result);

	const handleDeleteProject = async () => {
		if (!projectIdForDelete) {
			return;
		}
		try {
			setFetchStatus('loading');
			await api.project.deleteProjectById(projectIdForDelete);
			revalidateProjects();
			handleCloseModal();
		} catch (e) {
			setFetchStatus('error');
		}
	};

	const handleCloseModal = () => {
		dispatch(setProjectIdForDelete(null));
		dispatch(setModal(''));
	};

	const revalidateProjects = () => {
		if (!project || project.id === projectIdForDelete) {
			dispatch(setStatus('refetch'));
			return;
		}
		dispatch(
			setResult(projectList.filter((item) => item.id !== projectIdForDelete))
		);
	};

	return (
		<div className={s.wrapper}>
			<button className={s.close_btn} onClick={handleCloseModal}>
				<Image src={closeIcon} alt="close_icon" width={16} height={16} />
			</button>

			<div className={s.main}>
				<div className={s.main_img}>
					<Image
						src={house2Icon}
						alt={'delete_project_icon'}
						width={75}
						height={70}
					/>
					<div className={s.trash_icon}>
						<Image
							src={trash2Icon}
							alt={'trash_delete_project_icon'}
							width={14}
							height={16}
						/>
					</div>
				</div>
				<div className={s.main_info}>
					<h2>Delete project</h2>
					<p>Are you sure you want to delete your project?</p>
				</div>
				<div className={s.buttons}>
					<button onClick={handleCloseModal} disabled={fetchStatus === 'loading'}>
						No, go back
					</button>
					<button
						className={s.delete_btn}
						disabled={fetchStatus === 'loading'}
						onClick={handleDeleteProject}
					>
						{fetchStatus === 'loading' ? 'Loading..' : 'Yes, delete project'}
					</button>
				</div>

				{fetchStatus === 'error' && (
					<div className={s.main_error}>Something went wrong</div>
				)}
			</div>
		</div>
	);
};
