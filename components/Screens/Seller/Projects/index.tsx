'use client';
import s from './Projects.module.scss';
import { Nav } from './Nav';
import { useState } from 'react';
import { Orders } from './Orders';
import { MyProducts } from './MyProducts';
import { Requests } from './Requests';
import { IsSellerSideBarContainer } from '@/components/Containers/IsSellerSideBarContainer';

export const Projects = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(3);
	return (
		<IsSellerSideBarContainer>
			<div className={s.wrapper}>
				<Nav activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
				{activeDisplay === 1 && <MyProducts />}
				{activeDisplay === 2 && <Requests />}
				{activeDisplay === 3 && <Orders />}
			</div>
		</IsSellerSideBarContainer>
	);
};
