'use client';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { BuyerSidebarComponent } from '@/components/Features/BuyerSidebar';

export const IsBuyerSideBarContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const isSideBar = useAppSelector((state) => state.buyerSidebarSlice.sideBar);

	return (
		<div>
			<BuyerSidebarComponent />
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
