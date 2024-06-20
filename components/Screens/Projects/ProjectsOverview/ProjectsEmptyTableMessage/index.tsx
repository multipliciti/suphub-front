'use client';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { setStatus } from '@/redux/slices/projects/projects';
import { Api } from '@/services';
import { ProjectsEmptyTableMessageWrapper } from './ProjectsEmptyTableMessageWrapper';
import Image from 'next/image';

import inviteSuppliersIcon from '@/imgs/Buyer&Seller/Projects/invite_suppliers.svg';
import plusIcon from '@/imgs/Buyer&Seller/Projects/plus_icon.svg';
import s from './ProjectsEmptyTableMessage.module.scss';

export const ProjectsEmptyTableMessage = () => {
	const api = Api();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.authSlice.user);

	const handleAddSuppliers = async () => {
		router.push('/suppliers');
	};

	const handleCreateProject = async () => {
		if (!user) {
			dispatch(setModal('login'));
			return;
		}
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
		<ProjectsEmptyTableMessageWrapper
			title="Create your first project!"
			text="Create your projects to build bill of materials, manage team tasks, and source components."
		>
			<button className={s.btn_suppliers} onClick={handleAddSuppliers}>
				<Image src={inviteSuppliersIcon} alt="Invite Suppliers icon" />
				<span className={s.btn_suppliers_text}>Add your suppliers</span>
			</button>
			<button className={s.btn_project} onClick={handleCreateProject}>
				<Image src={plusIcon} alt="Add new Project icon" />
				<span className={s.btn_project_text}>Create a new project</span>
			</button>
		</ProjectsEmptyTableMessageWrapper>
	);
};
