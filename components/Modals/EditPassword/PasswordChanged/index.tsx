'use client';
import s from './PasswordChanged.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import back_btn from '@/imgs/ProfileSettings/back_btn.svg';
import modal_close from '@/imgs/close.svg';
import checkmark from '@/imgs/ProfileSettings/password_changed_checkmark.svg';

export const PasswordChanged = () => {
	const dispatch = useAppDispatch();
	const closeModal = () => {
		dispatch(setModal(''));
		window.location.reload();
	};

	const backToEditPassword = () => {
		dispatch(setModal('editPassword'));
	};

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<div onClick={backToEditPassword} className={s.header_back_btn}>
					<Image src={back_btn} alt="back_btn" width={24} height={24} />
					<span className={s.header_back_text}>Back</span>
				</div>
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
				<Image className={s.content_img} src={checkmark} alt="checkmark" />
				<div className={s.content_title}>Password changed</div>
				<div className={s.content_text}>
					Your password has been changed successfully.
				</div>
			</div>
		</div>
	);
};
