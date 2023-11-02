'use client';
import s from './BusinessVerification.module.scss';
import Image from 'next/image';
import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import modal_close from '@/imgs/close.svg';
import file_icon from '@/imgs/ProfileSettings/file_icon.svg';
import check_icon from '@/imgs/Buyer&Seller/SellerVerification/radio-button-check.svg';

export const BusinessVerification = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [hideOldPassword, setHideOldPassword] = React.useState<boolean>(true);

	const {
		// register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, touchedFields },
	} = useForm({
		// defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
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
						<div className={s.header_title}>Business Verification</div>
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
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="vendorType"
								id={'productsCertifications'}
								checked={true}
							/>
							<div className={s.radio_image}>
								<Image src={check_icon} alt={'Check icon'} />
							</div>
						</div>
						<div className={s.content_product_certifications_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Company details</div>
								<div className={s.content_title_sub}>
									Provide company name, locatin and website
								</div>
							</div>
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="vendorType"
								id={'productsCertifications'}
								checked={false}
							/>
						</div>
						<div className={s.content_file_upload_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>
									Business license and certifications
								</div>
								<div className={s.content_title_sub}>
									Upload your business certification
								</div>
							</div>
							<label htmlFor={'businessFileInput'}>
								<div className={s.upload_button}>
									<Image alt={'Upload Button'} src={file_icon} />
									Upload files
								</div>
								<input
									accept=".jpg, .jpeg, .png, .pdf"
									type="file"
									id="businessFileInput"
									className={s.upload_hidden_input}
									// onChange={handleBusinessCertificationFiles}
									multiple
								/>
							</label>
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="vendorType"
								id={'productsCertifications'}
								checked={false}
							/>
						</div>
						<div className={s.content_file_upload_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Factory certification</div>
								<div className={s.content_title_sub}>
									Upload your factory certification
								</div>
							</div>
							<label htmlFor={'businessFileInput'}>
								<div className={s.upload_button}>
									<Image alt={'Upload Button'} src={file_icon} />
									Upload files
								</div>
								<input
									accept=".jpg, .jpeg, .png, .pdf"
									type="file"
									id="businessFileInput"
									className={s.upload_hidden_input}
									// onChange={handleBusinessCertificationFiles}
									multiple
								/>
							</label>
						</div>
					</div>
					<div className={s.radio_group}>
						<div className={s.radio_element}>
							<input
								className={s.radio_btn}
								type="radio"
								name="vendorType"
								id={'productsCertifications'}
								checked={false}
							/>
						</div>
						<div className={s.content_product_certifications_group}>
							<div className={s.content_title_group}>
								<div className={s.content_title}>Product certifications</div>
								<div className={s.content_title_sub}>Add product certifications</div>
							</div>
							<div className={s.content_input_group}>
								<p className={s.content_title_small}>Products certifications</p>
								<label
									className={classNames(s.label, s.padding_eight)}
									htmlFor="password"
								>
									{/*<Image*/}
									{/*	className={s.image}*/}
									{/*	src={modal_password}*/}
									{/*	alt="password_icon"*/}
									{/*	width={20}*/}
									{/*	height={20}*/}
									{/*/>*/}

									{/*this goes inside input*/}
									{/*{...register('oldPassword', {*/}
									{/*	required: 'Enter current password',*/}
									{/*})}*/}
									<input
										id={'certificationsProducts'}
										className={s.content_input}
										placeholder={'Enter product certifications'}
										type={'text'}
									/>
								</label>
							</div>
							{/*{errors.oldPassword && (*/}
							{/*	<p className={s.errorDescription}>{errors.oldPassword?.message}</p>*/}
							{/*)}*/}
							<div className={s.content_input_group}>
								<p className={s.content_title_small}>
									Products are certified for the following countries
								</p>
								<label
									className={classNames(s.label, s.padding_eight)}
									htmlFor="password"
								>
									<input
										id={'certificationsCountries'}
										className={s.content_input}
										placeholder={'Enter countries'}
										type={'text'}
									/>
								</label>
							</div>

							{/*{errors.oldPassword && (*/}
							{/*	<p className={s.errorDescription}>{errors.oldPassword?.message}</p>*/}
							{/*)}*/}
						</div>
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
