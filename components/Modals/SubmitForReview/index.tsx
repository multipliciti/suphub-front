'use client';
import s from './SubmitForReview.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Api } from '@/services';
import { Project, RfqItem } from '@/types/products/rfq';
import search_img from '@/imgs/Marketplace/search.svg';
import modal_close from '@/imgs/close.svg';
import back_btn from '@/imgs/Modal/back_btn_add_to_rfq.svg';
import black_arrow from '@/imgs/Modal/arrow_right.svg';
import white_arrow from '@/imgs/Modal/arrow_right_white.svg';
import plus_sign from '@/imgs/Modal/plus_sign.svg';
import plus_sign_white from '@/imgs/Modal/plus_sign_white.svg';
import password_valid from '@/imgs/Modal/password_valid.svg';

export const SubmitForReview = () => {
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => state.productSlice.product);

	const api = Api();
	const INITIAL_STEP = 1;

	const [step, setStep] = useState<number>(INITIAL_STEP);
	const [selectedRfqs, setSelectedRfqs] = useState<Record<number, boolean>>({});

	const handleNextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};
	const handlePrevStep = () => {
		setStep((prevStep) => prevStep - 1);
	};

	const handleSearchQueryChange = (e: any) => {
	};

	const closeModal = () => {
		dispatch(setModal(''));
		setStep(1);
	};

	useEffect(() => {

		const handlePopState = () => {
			closeModal();
		};

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	return (
		<div className={s.wrapper}>
			current step is {step}
			<br/>
			{step === 1 && (
			<button onClick={handleNextStep}>
				next page
			</button>
			)}
			{step === 2 && (
				<button onClick={handlePrevStep}>
					prev page
				</button>
			)}

			<button onClick={closeModal}>Close</button>

			{/*<div className={s.header}>*/}
			{/*<div*/}
			{/*			onClick={() => {*/}
			{/*				if (step !== 3 || !Boolean(Object.keys(selectedRfqs).length)) {*/}
			{/*					handlePrevStep();*/}
			{/*				}*/}
			{/*			}}*/}
			{/*			className={s.back}*/}
			{/*		>*/}
			{/*			<Image src={back_btn} alt="back_btn" width={24} height={24} />*/}
			{/*			<span className={s.back_text}>Back</span>*/}
			{/*		</div>*/}
			{/*	<span onClick={closeModal} className={s.close}>*/}
			{/*		<Image src={modal_close} alt="modal_close" width={15} height={15} />*/}
			{/*	</span>*/}
			{/*</div>*/}
			{/*<div className={s.content}>*/}
			{/*	<div className={s.list}>*/}
			{/*		{step === 1 && (*/}
			{/*			<>*/}
			{/*				1 step*/}
			{/*				</>*/}
			{/*		)}*/}

			{/*		{step === 2 && (*/}
			{/*			<>*/}
			{/*				2 step*/}
			{/*				</>*/}
			{/*			)}*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	);
};
