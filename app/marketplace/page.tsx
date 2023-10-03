import Image from 'next/image';
import { Marketplace } from '@/components/screens/Marketplace';
import { IsSideBarContainer } from '@/components/Containers/IsSideBarContainer';

export default function MarketplacePage() {
	return (
		<>
			<IsSideBarContainer>
				<Marketplace />
			</IsSideBarContainer>
		</>
	);
}
