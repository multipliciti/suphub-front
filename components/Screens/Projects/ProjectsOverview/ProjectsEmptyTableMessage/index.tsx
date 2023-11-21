'use client';
import Image from 'next/image';

import { useAppDispatch } from '@/redux/hooks';
import { setStatus } from '@/redux/slices/projects/projects';
import { useRouter } from 'next/navigation';
import { Api } from '@/services';

import s from './ProjectsEmptyTableMessage.module.scss';

import houseIcon from '@/imgs/Buyer&Seller/house.svg';
import houseCreateIcon from '@/imgs/Buyer&Seller/house_create.svg';

export const ProjectsEmptyTableMessage = () => {
	const api = Api();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleCreateProject = async () => {
		try {
			const response = await api.project.createProject({
				name: 'Untitled',
				type: 'custom',
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
		<div className={s.wrapper}>
			<div className={s.img}>
				<div>
					<Image src={houseIcon} alt="house_icon" width={45} height={45} />
					<Image
						className={s.create_icon}
						src={houseCreateIcon}
						alt="house_create_icon"
						width={18}
						height={18}
					/>
				</div>
			</div>

			<h2 className={s.title}>No projects yet</h2>

			<div className={s.text}>
				You don&apos;t have any projects yet. To create your project specification,
				compare, order products, create your first project.
			</div>

			<div className={s.add_btn} onClick={handleCreateProject}>
				<button>Add new project</button>
			</div>
		</div>
	);
};
