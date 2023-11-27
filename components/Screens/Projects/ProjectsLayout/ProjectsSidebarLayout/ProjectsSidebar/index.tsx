'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setResult, setStatus } from '@/redux/slices/projects/projects';
import { ProjectsSearchInput } from './ProjectsSearchInput';
import { ProjectsAddButton } from './ProjectsAddButton';
import { setSidebar } from '@/redux/slices/projects/projectsSidebar';
import { setProject } from '@/redux/slices/projects/projectItem';
import { classNames } from '@/utils/classNames';
import { ProjectsList } from './ProjectsList';
import { Api } from '@/services';

import s from './ProjectsSidebar.module.scss';

import toggle_img from '@/imgs/SideBar/toggle.svg';

export const ProjectsSidebar = () => {
	const api = Api();
	const router = useRouter();
	const pathname = usePathname();

	const dispatch = useAppDispatch();

	const isSidebar = useAppSelector((state) => state.projectsSidebar.sidebar);
	const status = useAppSelector((state) => state.projectsSlice.status);
	const params = useAppSelector((state) => state.projectsSlice.params);
	const project = useAppSelector((state) => state.projectItemSlice.project);

	useEffect(() => {
		fetchProjects();
	}, [params]);

	useEffect(() => {
		if (status === 'refetch' || status === 'refetchByCreating') {
			fetchProjects();
		}
	}, [status]);

	const fetchProjects = async () => {
		try {
			dispatch(setStatus('loading'));

			const response = await api.project.getAllProjects(params);
			dispatch(setResult(response.result));

			if (pathname === '/projects') {
				if (project) {
					router.push(`/projects/${project.id}/overview`);
				} else {
					if (response.result.length > 0) {
						router.push(`/projects/${response.result[0].id}/overview`);
					}
				}
			} else {
				if (status === 'refetch') {
					if (response.result.length > 0) {
						router.push(`/projects/${response.result[0].id}/overview`);
					} else {
						dispatch(setProject(null));
						router.push('/projects');
					}
				}
			}
			dispatch(setStatus('success'));
		} catch (e) {
			dispatch(setStatus('rejected'));
		}
	};
	return (
		<div className={classNames(s.wrapper, isSidebar && s.wrapper_active)}>
			<div
				onClick={() => dispatch(setSidebar(!isSidebar))}
				className={s.toggle_wrapper}
			>
				<Image
					className={isSidebar ? s.toggle_icon : s.toggle_icon_active}
					src={toggle_img}
					alt="toggle_img"
					width={16}
					height={16}
				/>
			</div>

			<div className={s.wrapper_scroll}>
				<div className={s.wrapper_inner}>
					<div className={classNames(s.content, isSidebar && s.content_active)}>
						<h5 className={s.title}>All Projects</h5>

						<ProjectsSearchInput />
						<ProjectsAddButton />
						<ProjectsList />
					</div>
				</div>
			</div>
		</div>
	);
};
