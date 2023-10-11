'use client';
import s from './SubmitForReview.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { useState, useEffect } from 'react';
import { Api } from '@/services';

export const SubmitForReview = () => {
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => state.productSlice.product);

	const INITIAL_STEP = 1;

	const [step, setStep] = useState<number>(INITIAL_STEP);

	const handleNextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};
	const handlePrevStep = () => {
		setStep((prevStep) => prevStep - 1);
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
		</div>
	);
};
