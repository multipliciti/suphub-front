'use client';
import { MainContent } from './MainContent';
import { IsBuyerSideBarContainer } from '@/components/Containers/IsBuyerSideBarContainer';
export const Orders = () => {
	return (
		<div>
			<IsBuyerSideBarContainer>
				<MainContent />
			</IsBuyerSideBarContainer>
		</div>
	);
};
