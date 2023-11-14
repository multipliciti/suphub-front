'use client';
import { FC, PropsWithChildren } from 'react';

import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { StorefrontSidebar } from '@/components/Screens/Storefront/StorefrontSidebarLayout/StorefrontSidebar';

export const StorefrontSidebarLayout: FC<PropsWithChildren> = ({ children }) => {
	const isSidebar = useAppSelector((state) => state.storefrontSlice.sidebar);
	const sellerCompany = useAppSelector(
		(state) => state.storefrontSlice.sellerCompany
	);

	return (
		<>
			<StorefrontSidebar />
			<div
				className={classNames(
					'content_container',
					isSidebar && 'content_container_sidebar'
				)}
				style={{
					...(!isSidebar && { paddingLeft: '50px' }),
					...(!sellerCompany && !isSidebar && { paddingLeft: '32px' }),
				}}
			>
				{children}
			</div>
		</>
	);
};
