'use client';
import s from './DepositSetUp.module.scss';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import countries from '@/utils/countries';
import modal_close from '@/imgs/close.svg';
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';
import info_icon from '@/imgs/Buyer&Seller/SellerVerification/info.svg';
import question_icon from '@/imgs/Buyer&Seller/SellerVerification/question-icon.svg';

export const DepositSetUp = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [selectedCountry, setSelectedCountry] = useState('Select Country');
	const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(e.target.value);
	};

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, touchedFields },
	} = useForm({
		defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
		mode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
	});

	const closeModal = () => {
		dispatch(setModal(''));
		reset();
	};

	const onSubmit: SubmitHandler<any> = async (data) => {
		const { oldPassword, newPassword, confirmPassword } = data;

		const form: any = {};
	};

	return (
		<div className={s.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.header}>
					<div className={s.header_row}>
						<div className={s.header_title}>Deposit set up</div>
						<span onClick={closeModal} className={s.back}>
							<Image
								alt="Close Button"
								className={s.header_close}
								src={modal_close}
							/>
						</span>
					</div>
					<div className={s.header_description}>
						Finish this list to verify your company
					</div>
				</div>
				<div className={s.separator} />
				<div className={s.content}>
					<div className={s.content_dropdown_group}>
						<div className={s.banner}>
							<Image src={info_icon} alt={'Info icon'} width={20} height={20} />
							<div className={s.banner_text}>
								Disbursement may be subject to fees charged by your bank
							</div>
						</div>
						<div className={s.content_dropdown_wrapper}>
							Bank Location
							<label className={s.dropdown_wrapper}>
								<select
									className={
										selectedCountry === 'Select Country'
											? classNames(s.dropdown_label, s.dropdown_label_placeholder)
											: s.dropdown_label
									}
									id="beneficiaryCountry"
									onChange={(e) => handleCountryChange(e)}
								>
									<option
										className={s.dropdown_label_placeholder}
										value=""
										disabled
										selected
									>
										Select Country
									</option>
									<option
										className={s.dropdown_label_option}
										value={'United States'}
									>
										United States
									</option>
									{countries.map((country, index) => (
										<option
											className={s.dropdown_label_option}
											key={index}
											value={country}
										>
											{country}
										</option>
									))}
								</select>
								<Image
									className={s.dropdown_arrow}
									alt={'chevron_down'}
									src={chevron_down}
								/>
							</label>
						</div>
					</div>
					<div className={s.separator} />

					<div className={s.content_group}>
						<div className={s.content_input_group}>
							<div className={s.content_title_group}>
								<p className={s.content_title}>Business Name</p>
								<Image src={question_icon} alt={'question icon'} />
							</div>
							<label className={classNames(s.label)}>
								<input
									id={'certificationsProducts'}
									className={s.content_input}
									placeholder={'Name as on bank documents'}
									type={'text'}
								/>
							</label>
						</div>
						{errors.oldPassword && (
							<p className={s.errorDescription}>{errors.oldPassword?.message}</p>
						)}
						<div className={s.content_input_group}>
							<div className={s.content_title_group}>
								<p className={s.content_title}>Routing Number</p>
								<Image src={question_icon} alt={'question icon'} />
							</div>
							<label className={classNames(s.label)} htmlFor="password">
								<input
									id={'certificationsProducts'}
									className={s.content_input}
									placeholder={'9 digits'}
									type={'text'}
								/>
							</label>
						</div>
						{errors.oldPassword && (
							<p className={s.errorDescription}>{errors.oldPassword?.message}</p>
						)}

						<div className={s.content_input_group}>
							<div className={s.content_title_group}>
								<p className={s.content_title}>Account Number</p>
								<Image src={question_icon} alt={'question icon'} />
							</div>
							<label className={classNames(s.label)} htmlFor="password">
								<input
									id={'certificationsProducts'}
									className={s.content_input}
									type={'text'}
								/>
							</label>
						</div>
						{errors.oldPassword && (
							<p className={s.errorDescription}>{errors.oldPassword?.message}</p>
						)}
						<div className={s.content_input_group}>
							<p className={s.content_title}>Re-type Bank Account Number</p>
							<label className={classNames(s.label)} htmlFor="password">
								<input
									id={'certificationsProducts'}
									className={s.content_input}
									type={'text'}
								/>
							</label>
						</div>
						{errors.oldPassword && (
							<p className={s.errorDescription}>{errors.oldPassword?.message}</p>
						)}
					</div>
				</div>

				<div className={s.bottom}>
					<div className={s.bottom_group}>
						<button
							onClick={(e) => {
								e.preventDefault();
								closeModal();
							}}
							className={s.bottom_button_cancel}
						>
							Cancel
						</button>
						<button
							className={classNames(
								s.bottom_button_send
								// s.bottom_button_send_active
							)}
							// disabled={true}
						>
							Submit for verification
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
