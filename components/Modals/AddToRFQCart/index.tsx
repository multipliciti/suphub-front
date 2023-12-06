'use client';
import s from './AddToRFQCart.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import React, { useState, useEffect } from 'react';
import { Api } from '@/services';
import { RfqItem } from '@/types/products/rfq';
import { Project } from '@/types/products/project';
import search_img from '@/imgs/Marketplace/search.svg';
import modal_close from '@/imgs/close.svg';
import back_btn from '@/imgs/Modal/back_btn_add_to_rfq.svg';
import black_arrow from '@/imgs/Modal/arrow_right.svg';
import white_arrow from '@/imgs/Modal/arrow_right_white.svg';
import plus_sign from '@/imgs/Modal/plus_sign.svg';
import plus_sign_white from '@/imgs/Modal/plus_sign_white.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';
import { classNames } from '@/utils/classNames';

export const AddToRFQCart = () => {
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => state.productSlice.product);

	const api = Api();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const defineSearchPlaceholder = (step: number) => {
		switch (step) {
			case 1:
				return 'Search Project';
			case 2:
				return 'Search RFQ';
			default:
				return 'Search';
		}
	};

	const INITIAL_STEP = 1;
	const [projects, setProjects] = useState<Project[] | any>([]);
	const [step, setStep] = useState<number>(INITIAL_STEP);
	const [rfqs, setRfqs] = useState<RfqItem[]>([]);
	const [selectedRfqs, setSelectedRfqs] = useState<Record<number, boolean>>({});
	const [refreshable, setRefreshable] = useState<number>(0);
	const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
	const [addingProjectOrRfqInProgress, setAddingProjectOrRfqInProgress] =
		useState<boolean>(false);
	const refresh = () => {
		setRefreshable((prev) => prev + 1);
	};

	const handleNextStep = () => {
		setStep((prevStep) => prevStep + 1);
		setSearchQuery('');
	};
	const handlePrevStep = () => {
		setStep((prevStep) => prevStep - 1);
		setSearchQuery('');
	};

	const handleSearchQueryChange = (e: any) => {
		setSearchQuery(e.target.value);
	};

	const closeModal = () => {
		dispatch(setModal(''));
		setStep(1);
		setSelectedRfqs({});
	};

	const fetchRfq = async (projectId: number) => {
		try {
			const response = await api.rfq.getProjectById({
				projectId,
				searchParams: JSON.stringify({ subCategoryId: product?.subCategoryId }),
			});
			setRfqs(response.result);
		} catch (error) {
			console.error('Error fetching rfqs:', error);
		}
	};

	const toRfq = (projectId: number) => {
		fetchRfq(projectId);
		setSelectedProjectId(projectId);
		handleNextStep();
	};
	const postRfqOption = async (rfq: RfqItem, product: any) => {
		await api.rfqOption.createOwn({
			productId: product.id,
			rfqId: rfq.id,
		});
		setSelectedRfqs({ ...selectedRfqs, [rfq.id]: true });
	};

	const handleCreateProject = async () => {
		setAddingProjectOrRfqInProgress(true);
		try {
			await api.project.createProject({
				name: 'New Project',
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
			refresh();
		} catch (e) {
			console.log('Error with create new project ', e);
		}
	};

	const handleCreateRfq = async () => {
		setAddingProjectOrRfqInProgress(true);
		try {
			await api.rfq.createRfqItem({
				projectId: selectedProjectId,
				subCategoryId: product?.subCategoryId,
				productName: 'Empty Product',
				quantity: 50,
				budget: 1000,
				size: '36x39',
				certifications: ['AED', 'DDC'],
				additionalComments: 'Some Additional comment',
			});
			await fetchRfq(selectedProjectId);
			setAddingProjectOrRfqInProgress(false);
		} catch (e) {
			console.log('Error with create new rfq ', e);
			setAddingProjectOrRfqInProgress(false);
		}
	};

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await api.project.getProject({});
				setProjects(response.result);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
			setAddingProjectOrRfqInProgress(false);
		};

		const handlePopState = () => {
			closeModal();
		};

		fetchProjects();

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [refreshable]);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				{step !== 1 && (
					<div
						onClick={() => {
							if (step !== 3 || !Boolean(Object.keys(selectedRfqs).length)) {
								handlePrevStep();
							}
						}}
						className={s.back}
					>
						<Image src={back_btn} alt="back_btn" width={24} height={24} />
						<span className={s.back_text}>Back</span>
					</div>
				)}
				{step === 1 && <h3 className={s.title}>Choose Projects</h3>}
				<span onClick={closeModal} className={s.close}>
					<Image src={modal_close} alt="modal_close" width={15} height={15} />
				</span>
			</div>
			<div className={s.content}>
				<label className={s.search_label} htmlFor="search">
					<Image src={search_img} alt="search_img" width={24} height={24} />
					<input
						className={s.search_input}
						placeholder={defineSearchPlaceholder(step)}
						value={searchQuery}
						id="search"
						type="text"
						onChange={handleSearchQueryChange}
					/>
				</label>
				<div className={s.list}>
					{step === 1 && (
						<>
							{projects
								.filter((project: Project) =>
									project.name.toLowerCase().includes(searchQuery.toLowerCase())
								)
								.map((project: Project) => (
									<button
										key={project.id}
										onClick={() => product && toRfq(project.id)}
										className={s.btnItem}
									>
										<p>{project.name}</p>
										<Image
											src={black_arrow}
											alt="black_arrow"
											width={20}
											height={20}
										/>
									</button>
								))}
							{addingProjectOrRfqInProgress && (
								<button className={classNames(s.btnItem, s.btnItemLoading)}>
									<p>Creating...</p>
								</button>
							)}
							<button onClick={handleCreateProject} className={s.btnAdd}>
								Create a new project
								<Image src={white_arrow} alt="white_arrow" width={20} height={20} />
							</button>
						</>
					)}

					{step === 2 && (
						<>
							{rfqs
								.filter((rfq) =>
									rfq.productName.toLowerCase().includes(searchQuery.toLowerCase())
								)
								.map((rfq: RfqItem, index) => (
									<button
										key={index}
										onClick={() => postRfqOption(rfq, product)}
										disabled={selectedRfqs[rfq.id]}
										className={s.btnItem}
									>
										<p>{rfq.productName}</p>
										<Image
											src={selectedRfqs[rfq.id] ? password_valid : plus_sign}
											alt="plus_sign"
											width={20}
											height={20}
										/>
									</button>
								))}
							{addingProjectOrRfqInProgress && (
								<button className={classNames(s.btnItem, s.btnItemLoading)}>
									<p>Creating...</p>
								</button>
							)}
							<button
								onClick={handleCreateRfq}
								className={s.btnAdd}
								disabled={Boolean(Object.keys(selectedRfqs).length)}
							>
								Add to a new empty product request
								<Image
									src={
										Boolean(Object.keys(selectedRfqs).length)
											? plus_sign
											: plus_sign_white
									}
									alt="white_plus_sign"
									width={20}
									height={20}
								/>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
