'use client';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/redux/hooks';
import { EmptyMessage } from '@/components/Features/EmptyMessage';
import { setStatus } from '@/redux/slices/projects/projects';
import { Api } from '@/services';

import s from './ProjectsEmptyTableMessage.module.scss';

export const ProjectsEmptyTableMessage = () => {
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
		<EmptyMessage
			title="No projects yet"
			text="You don't have any projects yet. To create your project specification,
				compare, order products, create your first project."
		>
			<div className={s.add_btn} onClick={handleCreateProject}>
				<button>Add new project</button>
			</div>
		</EmptyMessage>
	);
};
