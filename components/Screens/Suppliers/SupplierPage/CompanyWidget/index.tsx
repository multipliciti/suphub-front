'use client';
import React from 'react';
import Image from 'next/image';
import { Supplier } from '@/services/suppliers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	setSelectedSupplier,
	setSidebar,
} from '@/redux/slices/suppliers/suppliersSidebar';
import { SellerPublicInfo } from '@/types/services/company';
import s from './CompanyWidget.module.scss';
//imgs
import locationIcon from '@/imgs/Suppliers/Supplier/location.svg';
import chatIcon from '@/imgs/Suppliers/Supplier/chat.svg';
import userPlusIcon from '@/imgs/Suppliers/Supplier/user-plus.svg';
import userMinusIcon from '@/imgs/Suppliers/Supplier/user-minus.svg';

function CompanyWidget({
	sellerCompany,
	thisSupplier,
	isInMySuppliers,
	handleSaveToMySuppliers,
	handleRemoveSupplierFromMySuppliers,
}: {
	sellerCompany: SellerPublicInfo | undefined;
	thisSupplier: Supplier | undefined;
	isInMySuppliers: Supplier | false;
	handleSaveToMySuppliers: () => void;
	handleRemoveSupplierFromMySuppliers: () => void;
}) {
	const user = useAppSelector((state) => state.authSlice.user);
	const dispatch = useAppDispatch();

	const handleOpenChatSidebar = () => {
		dispatch(setSidebar(true));
		if (!thisSupplier) return;
		dispatch(setSelectedSupplier(thisSupplier));
	};

	function formatAddress(address: any) {
		if (!address) {
			return null;
		}

		const { street, city, state, country, zipcode } = address;

		return `${street}, ${city}, ${state}, ${country}, ${zipcode}`;
	}

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<span className={s.content_title}>{sellerCompany?.name}</span>
				{(sellerCompany?.companyAddress || sellerCompany?.factoryAddress) && (
					<div className={s.content_location}>
						<Image src={locationIcon} width={20} height={20} alt="Location icon" />
						<span className={s.content_location_text}>
							{formatAddress(
								sellerCompany?.companyAddress || sellerCompany?.factoryAddress
							)}
						</span>
					</div>
				)}

				{/* TODO Fix this thing*/}

				{/* IS TRANSPARENT BECAUSE COLOR IS WHITE */}
				<div className={s.content_description}>
					Weika is a comprehensive company specializing in UPVC and aluminum windows
					& doors designing, with an annual production capacity of 500,000 square
					meters.
				</div>
			</div>

			<div className={s.button_wrapper}>
				{user?.role !== 'seller' && (
					<>
						{isInMySuppliers ? (
							<button
								className={s.button_suppliers_remove}
								onClick={handleRemoveSupplierFromMySuppliers}
							>
								<Image src={userMinusIcon} alt="Save to my suppliers" />
								<span className={s.button_suppliers_text}>
									Remove from My Suppliers
								</span>
							</button>
						) : (
							<button
								className={s.button_suppliers}
								onClick={handleSaveToMySuppliers}
							>
								<Image src={userPlusIcon} alt="Save to my suppliers" />
								<span className={s.button_suppliers_text}>Save to My Suppliers</span>
							</button>
						)}
					</>
				)}
				<button className={s.button_chat} onClick={handleOpenChatSidebar}>
					<Image src={chatIcon} alt="Open chat" />
					<span className={s.button_chat_text}>Chat</span>
				</button>
			</div>
		</div>
	);
}

export default CompanyWidget;
