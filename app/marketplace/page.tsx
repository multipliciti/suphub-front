import Image from 'next/image';
import { Marketplace } from '@/components/Screens/Marketplace';
import { IsSideBarMarketplace } from '@/components/Containers/IsSideBarMarketplace';

export default function MarketplacePage() {
	return (
		<>
			<IsSideBarMarketplace>
				<Marketplace />
			</IsSideBarMarketplace>
		</>
	);
}
