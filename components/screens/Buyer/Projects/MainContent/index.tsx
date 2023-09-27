'use client';
import s from './MainContent.module.scss';
import { Nav } from './Nav';
import { useState } from 'react';
import { Orders } from './Orders';
import { Overview } from './Overview';
import { RFQCar } from './RFQCar';

export const MainContent = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(1);
	return (
		<div className={s.wrapper}>
			<Nav activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
			{activeDisplay === 1 && <Overview />}
			{activeDisplay === 2 && <RFQCar />}
			{activeDisplay === 3 && <Orders />}
		</div>
	);
};
