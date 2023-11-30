import s from './WarningTrialCanBeUsedOnce.module.scss';
import React from 'react';
import Image from 'next/image';
import alert_icon from '@/imgs/Buyer&Seller/SellerVerification/alert-icon.svg';
import modal_close from '@/imgs/close.svg';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

export const WarningTrialCanBeUsedOnce: React.FC = () => {
	const dispatch = useAppDispatch();
	function closeModal() {
		dispatch(setModal(''));
	}

	function backToMembershipFee() {
		dispatch(setModal('sellerVerificationMembershipFee'));
	}

	return (
		<div className={s.wrapper_layout}>
			<div className={s.modal_header}>
				<div className={s.logo} />
				<span onClick={closeModal} className={s.close}>
					<Image src={modal_close} alt="logo" width={15} height={15} />
				</span>
			</div>

			<div className={s.message}>
				<div className={s.img_bg}>
					<Image alt={'Alert logo'} className={s.img} src={alert_icon} />
				</div>
				<h1 className={s.title}>Trial Mode Limit Reached</h1>
				<div className={s.desc}>
					We are sorry, but our trial mode is a one-time offer. Please choose a plan
					to continue.
				</div>
				<button className={s.btn} onClick={backToMembershipFee}>
					Back to Membership Fee
				</button>
			</div>
		</div>
	);
};
