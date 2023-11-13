'use client';
import s from './Projects.module.scss';
import { Nav } from './Nav';
import { useState } from 'react';
import { Orders } from './Orders';
import { MyProducts } from './MyProducts';
import { Requests } from './Requests';
import { IsSellerSideBarContainer } from '@/components/Containers/IsSellerSideBarContainer';
import { GetStarted } from '@/components/Screens/Seller/Projects/GetStarted';

export const Projects = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(1);
	return (
		<IsSellerSideBarContainer setActiveDisplay={setActiveDisplay}>
			<div className={s.wrapper}>
				<Nav activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
				{activeDisplay === 1 && <GetStarted />}
				{activeDisplay === 2 && <MyProducts />}
				{activeDisplay === 3 && <Requests />}
				{activeDisplay === 4 && <Orders />}
			</div>
		</IsSellerSideBarContainer>
	);
};
