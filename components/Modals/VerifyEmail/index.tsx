'use client';
import s from './VerifyEmail.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { RegisterUserType } from '@/types/services/auth';
//imgs
import modal_close from '@/imgs/close.svg';
import back_btn from '@/imgs/Modal/back_btn.svg';
import sheet from '@/imgs/Modal/sheet.svg';
import { Api } from '@/services';

export const VerifyEmail = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const email = useAppSelector((state) => state.modalSlice.email);
	const registerFormData = useAppSelector((state) => state.authSlice.registration);

	const fetchAuthResend = async (data: RegisterUserType) => {
		try {
			const responce = await api.auth.resendAuth(data);
		} catch (error) {
			console.log('error resendAuth: ', error);
		}
	};

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span onClick={() => dispatch(setModal('registration'))} className={s.back}>
					<Image
						className={s.back_img}
						src={back_btn}
						alt="back_btn"
						width={20}
						height={20}
					/>
					<p className={s.back_text}>Back</p>
				</span>
				<Image
					className={s.header_close}
					onClick={() => dispatch(setModal(''))}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>

			<div className={s.content}>
				<div className={s.sheet}>
					<Image src={sheet} alt="sheet" width={128} height={128} />
				</div>

				<h3 className={s.title}>Verify your email</h3>
				<p className={s.subtitle}>
					Check <span className={s.email}> {email}</span> to verify your account and
					get started.
				</p>

				<button onClick={() => fetchAuthResend(registerFormData)} className={s.btn}>
					Resend verification email
				</button>

				<p className={s.help}>
					Need help? <span className={s.contact}> Contact us </span>{' '}
				</p>
			</div>
		</div>
	);
};
