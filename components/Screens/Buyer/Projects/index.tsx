'use client';
import { IsBuyerSideBarContainer } from '@/components/Containers/IsBuyerSideBarContainer';
import { IsBuyerSideBarRequestDetail } from '@/components/Containers/IsBuyerSideBarRequestDetail/IsBuyerSideBarRequestDetail';
import s from './Projects.module.scss';
import { Nav } from './Nav';
import { useState } from 'react';
import { Orders } from './Orders';
import { Overview } from './Overview';
import { RFQCar } from './RFQCar';

export const Projects = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(3);
	const [sideBarRequestDetail, setSideBarRequestDetail] = useState<boolean>(true);
	return (
		<IsBuyerSideBarContainer>
			{/* <IsBuyerSideBarRequestDetail sideBarRequestDetail={sideBarRequestDetail}> */}
			<div className={s.wrapper}>
				<Nav activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
				{activeDisplay === 1 && <Overview />}
				{activeDisplay === 2 && <RFQCar />}
				{activeDisplay === 3 && <Orders />}
			</div>
			{/* </IsBuyerSideBarRequestDetail> */}
		</IsBuyerSideBarContainer>
	);
};
