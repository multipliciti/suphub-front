'use client';
import s from './ChooseProjects.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import { Api } from '@/services';
import { Spinner } from '@/components/UI/Spinner';
import { useAppSelector } from '@/redux/hooks';

import { Project } from '@/types/products/project';
import { CartCreateBody } from '@/types/services/cart';

import search_img from '@/imgs/Marketplace/search.svg';
import white_arrow from '@/imgs/Modal/arrow_right_white.svg';
import black_arrow from '@/imgs/Modal/arrow_right.svg';

export const ChooseProjects = () => {
	const api = Api();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [search, setSearch] = useState<string>('');
	const [projects, setProject] = useState<Project[]>([]);

	const sample = useAppSelector((state) => state.modalSlice.sample);

	const getProjects = async () => {
		try {
			const response = await api.project.getProject({});
			setProject(response.result);
			setIsLoading(false);
		} catch (error) {
			console.error('error get projects:', error);
		}
	};

	const addToCart = async (idProject: number) => {
		try {
			setIsLoading(true);
			//request for get cart id
			const response = await api.cart.findByProjectId(idProject);
			const cartId = response.id;

			if (sample) {
				const sampleElementRoCart: CartCreateBody = {
					cartId,
					model: 'sample',
					modelId: sample.id,
					quantity: sample.quantity,
					price: sample.price,
				};
				//if has sampleId add to cart
				const result = sample && (await api.cart.create(sampleElementRoCart));
				result && setIsLoading(false);
			}
		} catch (error) {
			console.error('error addToCart:', error);
		}
	};

	const createNewProject = async () => {
		try {
			setIsLoading(true);
			const project = await api.project.createProject({
				name: 'New Project',
				type: 'singleFamily',
				budget: 0,
				floorArea: 0,
			});
			setProject((prevState) => [...prevState, project]);
			setIsLoading(false);
		} catch (error) {
			console.log('error create new project:', error);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className={s.wrapper}>
			{isLoading && <Spinner />}

			{!isLoading && (
				<>
					<label className={s.label} htmlFor="search">
						<Image
							className={s.label_search_img}
							src={search_img}
							alt="search_img"
							width={24}
							height={24}
						/>
						<input
							placeholder="Search Project"
							className={s.label_input}
							value={search}
							type="text"
							id="search"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</label>

					<div className={s.projects}>
						{projects
							.filter((project: Project) =>
								project.name.toLowerCase().includes(search.toLowerCase())
							)
							.map((project: Project, ind: number) => {
								return (
									<div
										onClick={() => addToCart(project.id)}
										className={s.project}
										key={ind}
									>
										<p className={s.project_name}>{project.name}</p>
										<Image
											src={black_arrow}
											alt="project_arrow"
											width={24}
											height={24}
										/>
									</div>
								);
							})}

						<div onClick={() => createNewProject()} className={s.project_new}>
							<p className={s.project_name}>Create a new project</p>
							<Image src={white_arrow} alt="white_arrow" width={24} height={24} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};
