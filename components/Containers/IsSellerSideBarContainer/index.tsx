'use client';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { SellerSidebarComponent } from '@/components/Features/SellerSidebar';

export const IsSellerSideBarContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const isSideBar = useAppSelector((state) => state.sellerSidebarSlice.sideBar);

	return (
		<div>
			<SellerSidebarComponent />
			<div
				className={classNames(
					'content_container',
					isSideBar && 'content_container_sidebar'
				)}
			>
				{children}
			</div>
		</div>
	);
};
