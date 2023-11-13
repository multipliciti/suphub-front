'use client';
import s from './SubmitForReview.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { useState, useEffect } from 'react';
import { Api } from '@/services';
import Image from 'next/image';
import back_btn from '@/imgs/ProfileSettings/back_btn.svg';
import modal_close from '@/imgs/close.svg';
import docs from '@/imgs/ProfileSettings/docs.svg';
import docs_checked from '@/imgs/ProfileSettings/docs_checked.svg';
import { classNames } from '@/utils/classNames';

export const SubmitForReview = () => {
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => state.productSlice.product);

	const INITIAL_STEP = 1;

	const [step, setStep] = useState<number>(INITIAL_STEP);

	const handleNextStepAndSubmit = () => {
		setStep((prevStep) => prevStep + 1);
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
			<div className={s.header}>
				<span onClick={closeModal} className={s.header_close}>
					<Image
						className={s.header_close}
						src={modal_close}
						alt="modal_close"
						width={15}
						height={15}
					/>
				</span>
			</div>
			<div className={s.content}>
				{step === 1 && (
					<>
						<Image className={s.content_img} src={docs} alt="docs" />
						<div className={s.content_title}>Would you like to submit the info?</div>
					</>
				)}
				{step === 2 && (
					<>
						<Image className={s.content_img} src={docs_checked} alt="docs_checked" />
						<div className={s.content_title}>You have submitted the info</div>
					</>
				)}
				<div className={s.content_text}>
					Our team will consider your application and inform you when the
					verification process will be done.
				</div>
			</div>
			<div className={s.btn_group}>
				{step === 1 && (
					<>
						<button className={s.btn} onClick={closeModal}>
							Cancel
						</button>
						<button
							className={classNames(s.btn, s.btn_active)}
							onClick={handleNextStepAndSubmit}
						>
							Submit for review
						</button>
					</>
				)}
				{step === 2 && (
					<button className={classNames(s.btn, s.btn_active)} onClick={closeModal}>
						Back to Settings
					</button>
				)}
			</div>
		</div>
	);
};
