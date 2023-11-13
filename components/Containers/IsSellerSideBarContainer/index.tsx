'use client';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { SellerSidebarComponent } from '@/components/Features/SellerSidebar';

interface TypeProps {
	setActiveDisplay: (n: number) => void;
	children: React.ReactNode;
}

export const IsSellerSideBarContainer = ({
	children,
	setActiveDisplay,
}: TypeProps) => {
	const isSideBar = useAppSelector((state) => state.sellerSidebarSlice.sideBar);

	return (
		<div>
			<SellerSidebarComponent setActiveDisplay={setActiveDisplay} />
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
