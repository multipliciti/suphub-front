'use client';
import s from './Projects.module.scss';
import { Nav } from './Nav';
import { useState } from 'react';
import { Orders } from './Orders';
import { Overview } from './Overview';
import { RFQCar } from './RFQCar';
import { IsSellerSideBarContainer } from '@/components/Containers/IsSellerSideBarContainer';
import { GetStarted } from '@/components/Screens/Seller/Projects/GetStarted';

export const Projects = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(3);
	return (
		<IsSellerSideBarContainer>
			<div className={s.wrapper}>
				<Nav activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
				{activeDisplay === 1 && <GetStarted />}
				{activeDisplay === 2 && <Overview />}
				{activeDisplay === 3 && <RFQCar />}
				{activeDisplay === 4 && <Orders />}
			</div>
		</IsSellerSideBarContainer>
	);
};
