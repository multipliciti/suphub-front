'use client';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { setSellerCompany, setSidebar } from '@/redux/slices/storefront/storefront';
import { BoxItem } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontSidebarLayout/StorefrontSidebar/BoxItem';

import toggle_img from '@/imgs/SideBar/toggle.svg';
// import star_icon from '@/imgs/Buyer&Seller/star.svg';

import s from './StorefrontSidebar.module.scss';
import { useEffect, useState } from 'react';
import { Api } from '@/services';

const BOX_ITEM_LIST = [
	{
		title: 'RFQ',
		days: 'last 30 days',
		rating_number: '0',
		trend: 'up',
		interest: '0%',
	},
	{
		title: 'GMV',
		days: 'last 30 days',
		rating_number: '0',
		trend: 'up',
		interest: '20%',
	},
];

export const StorefrontSidebar = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const isSideBar = useAppSelector((state) => state.storefrontSlice.sidebar);
	const user = useAppSelector((state) => state.authSlice.user);
	const sellerCompany = useAppSelector(
		(state) => state.storefrontSlice.sellerCompany
	);

	const [totalSellerOrders, setTotalSellerOrders] = useState<number>();

	useEffect(() => {
		if (!sellerCompany) {
			fetchSellerCompany();
			fetchSellerOrders();
		}
	}, [sellerCompany, user]);

	const fetchSellerCompany = async () => {
		if (!user || !user.sellerCompanyId) {
			return;
		}
		try {
			const response = await api.sellerCompany.getById(user.sellerCompanyId);
			dispatch(setSidebar(true));
			dispatch(setSellerCompany(response.data));
		} catch (e) {
			console.log('Error with fetch seller company ', e);
		}
	};

	const fetchSellerOrders = async () => {
		try {
			const response = await api.order.getSellerOrders();
			setTotalSellerOrders(response.total);
		} catch (e) {
			console.log('Error with fetch seller orders ', e);
		}
	};

	if (!sellerCompany) {
		return;
	}

	return (
		<div className={classNames(s.wrapper, isSideBar && s.wrapper_active)}>
			<div
				onClick={() => dispatch(setSidebar(!isSideBar))}
				className={s.toggle_wrapper}
			>
				<Image
					className={isSideBar ? s.toggle_icon : s.toggle_icon_active}
					src={toggle_img}
					alt="toggle_img"
					width={16}
					height={16}
				/>
			</div>

			<div className={s.wrapper_scroll}>
				<div className={s.wrapper_inner}>
					<div className={classNames(s.content, isSideBar && s.content_active)}>
						<div className={s.seller_company}>
							{sellerCompany.logo && (
								<Image
									className={s.seller_company_logo}
									src={sellerCompany.logo?.url || ''}
									alt="seller_company_logo"
									width={76}
									height={28}
									style={{ objectFit: 'contain' }}
								/>
							)}
							<h5 className={s.seller_company_title}>{sellerCompany.name}</h5>

							{/*<div className={s.rating}>*/}
							{/*	<span className={s.rating_number}>5.0</span>*/}
							{/*	<Image*/}
							{/*		className={s.rating_star}*/}
							{/*		src={star_icon}*/}
							{/*		alt="star_icon"*/}
							{/*		width={16}*/}
							{/*		height={16}*/}
							{/*	/>*/}
							{/*	<span className={s.rating_title}>144 Reviews</span>*/}
							{/*</div>*/}

							{sellerCompany.status === 'verified' ? (
								<p className={classNames(s.status, s.status_verified)}>Verified</p>
							) : (
								<p className={classNames(s.status, s.status_unverified)}>
									Unverified
								</p>
							)}
						</div>

						<BoxItem
							title="Orders"
							rating_number={totalSellerOrders?.toString() || ''}
							days="last 30 days"
						/>

						{BOX_ITEM_LIST.map((el, index) => (
							<BoxItem
								key={index}
								title={el.title}
								rating_number={el.rating_number}
								disable
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
