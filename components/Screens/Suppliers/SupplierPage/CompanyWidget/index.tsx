'use client';
import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setSidebar } from '@/redux/slices/suppliers/suppliersSidebar';
import s from './CompanyWidget.module.scss';
//imgs
import locationIcon from '@/imgs/Suppliers/Supplier/location.svg';
import chatIcon from '@/imgs/Suppliers/Supplier/chat.svg';
import userPlusIcon from '@/imgs/Suppliers/Supplier/user-plus.svg';

function CompanyWidget() {
	const dispatch = useAppDispatch();

	const handleSaveToMySuppliers = () => {
		return null;
	};
	const handleOpenChatSideBar = () => {
		dispatch(setSidebar(true));
	};

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<span className={s.content_title}>Weika Windows</span>
				<div className={s.content_location}>
					<Image src={locationIcon} width={20} height={20} alt="Location icon" />
					<span className={s.content_location_text}>Huainan, Anhui, China</span>
				</div>
				<div className={s.content_description}>
					Weika is a comprehensive company specializing in UPVC and aluminum windows
					& doors designing, with an annual production capacity of 500,000 square
					meters.
				</div>
			</div>

			<div className={s.button_wrapper}>
				<button className={s.button_suppliers} onClick={handleSaveToMySuppliers}>
					<Image src={userPlusIcon} alt="Save to my suppliers" />
					<span className={s.button_suppliers_text}>Save to My Suppliers</span>
				</button>
				<button className={s.button_chat} onClick={handleOpenChatSideBar}>
					<Image src={chatIcon} alt="Open chat" />
					<span className={s.button_chat_text}>Chat</span>
				</button>
			</div>
		</div>
	);
}

export default CompanyWidget;
