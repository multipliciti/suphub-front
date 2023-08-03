'use client';
import s from './VerifyEmail.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
//imgs
import modal_close from '@/imgs/Modal/Modal_close.svg';
import back_btn from '@/imgs/Modal/CheckEmail/back_btn.svg';
import sheet from '@/imgs/Modal/CheckEmail/sheet.svg';

export const VerifyEmail = () => {
	const dispatch = useAppDispatch();
	const email = useAppSelector((state) => state.modalSlice.email);

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

				<button className={s.btn}>Resend verification email</button>

				<p className={s.help}>
					Need help? <span className={s.contact}> Contact us </span>{' '}
				</p>
			</div>
		</div>
	);
};
