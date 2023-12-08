'use client';
import { useEffect } from 'react';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { formatNumberAsCurrency } from '@/utils/numbers';
import { setSidebar } from '@/redux/slices/storefront/storefront';
import { classNames } from '@/utils/classNames';
import { BoxItem } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontSidebarLayout/StorefrontSidebar/BoxItem';

import toggle_img from '@/imgs/SideBar/toggle.svg';
import star_icon from '@/imgs/Buyer&Seller/star.svg';

import s from './StorefrontSidebar.module.scss';

export const StorefrontSidebar = () => {
	const dispatch = useAppDispatch();

	const isSideBar = useAppSelector((state) => state.storefrontSlice.sidebar);
	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);

	useEffect(() => {
		if (sellerCompany) {
			dispatch(setSidebar(true));
		}
	}, [sellerCompany]);

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
						<div className={s.box}>
							{sellerCompany.logo && (
								<Image
									className={s.seller_company_logo}
									src={sellerCompany.logo?.url || ''}
									alt="seller_company_logo"
									width={76}
									height={28}
									style={{ objectFit: 'cover' }}
								/>
							)}
							<h5 className={s.seller_company_title}>{sellerCompany.name}</h5>

							<div className={s.rating}>
								<span className={s.rating_number}>
									{sellerCompany.statistics.feedbacks.value?.toFixed(1) || 0}
								</span>
								<Image
									className={s.rating_star}
									src={star_icon}
									alt="star_icon"
									width={16}
									height={16}
								/>
								<span className={s.rating_title}>
									<span>{sellerCompany.statistics.feedbacks.reviews}</span>{' '}
									<span>Reviews</span>
								</span>
							</div>

							{sellerCompany.status === 'verified' ? (
								<p className={classNames(s.status, s.status_verified)}>Verified</p>
							) : (
								<p className={classNames(s.status, s.status_unverified)}>
									Unverified
								</p>
							)}
						</div>

						<div className={s.box}>
							<BoxItem
								title="Orders"
								value={sellerCompany.statistics.orders.value}
								trend={sellerCompany.statistics.orders.progress}
							/>
						</div>

						<div className={s.box}>
							<BoxItem
								title="RFQ"
								value={sellerCompany.statistics.RFQ.value}
								trend={sellerCompany.statistics.RFQ.progress}
							/>
						</div>

						<div className={s.box}>
							<BoxItem
								title="GMV"
								value={formatNumberAsCurrency(sellerCompany.statistics.GMV.value)}
								trend={sellerCompany.statistics.GMV.progress}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
