'use client';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { Sidebar } from '@/components/Features/SidebarMarketplace';

export const IsSideBarContainer = ({ children }: { children: React.ReactNode }) => {
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);

	return (
		<div>
			<Sidebar />
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
