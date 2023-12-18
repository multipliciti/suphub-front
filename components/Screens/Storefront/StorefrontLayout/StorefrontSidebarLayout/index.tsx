'use client';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { StorefrontSidebar } from './StorefrontSidebar';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { Spinner } from '@/components/UI/Spinner';

export const StorefrontSidebarLayout: FC<PropsWithChildren> = ({ children }) => {
	const isSidebar = useAppSelector((state) => state.storefrontSlice.sidebar);
	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);

	const pathname = usePathname();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkStorefrontPrivateRoutes();
	}, [pathname, sellerCompany]);

	const checkStorefrontPrivateRoutes = () => {
		setIsLoading(true);

		if (
			pathname !== '/storefront/get-started' &&
			sellerCompany &&
			sellerCompany?.status !== 'verified'
		) {
			router.push('/storefront/get-started');
			return;
		}

		setIsLoading(false);
	};

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
				{isLoading || !sellerCompany ? <Spinner /> : children}
			</div>
		</>
	);
};
