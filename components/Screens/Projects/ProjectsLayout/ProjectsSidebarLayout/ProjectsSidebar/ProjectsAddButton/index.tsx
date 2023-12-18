'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useAppDispatch } from '@/redux/hooks';
import { setStatus } from '@/redux/slices/projects/projects';
import { Api } from '@/services';

import s from './ProjectsAddButton.module.scss';

import addProject_img from '@/imgs/Buyer&Seller/SideBar/addProject.svg';

export const ProjectsAddButton = () => {
	const api = Api();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleCreateProject = async () => {
		try {
			const response = await api.project.createProject({
				name: 'Untitled',
				type: 'singleFamily',
				budget: 0,
				floorArea: 0,
				address: {
					street: '',
					city: '',
					state: '',
					country: '',
					zipcode: '',
				},
			});
			dispatch(setStatus('refetchByCreating'));
			router.push(`/projects/${response.id}/overview`);
		} catch (e) {
			console.log('Error with create new project ', e);
		}
	};

	return (
		<button className={s.add} onClick={handleCreateProject}>
			<Image src={addProject_img} alt="addProject" width={20} height={20} />
			<p className={s.add_title}>Add new project</p>
		</button>
	);
};
