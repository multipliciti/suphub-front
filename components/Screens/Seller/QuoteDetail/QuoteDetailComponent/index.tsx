'use client';
import s from './QuoteDetailComponent.module.scss';
import Image from 'next/image';
import back_icon from '@/imgs/Buyer&Seller/back_btn.svg';
import { VinylDouble } from './VinylDouble';
import { GarageDoor } from './GarageDoor';
import { Btns } from './Btns';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';

export const QuoteDetailComponent = () => {
	const [activeDisplay, setActiveDisplay] = useState<number>(3);
	const [requirements, setRequirements] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<button className={s.back}>
					<Image src={back_icon} alt="delete_icon" width={16} height={16} />
					Back
				</button>

				<div className={s.requirements}>
					<span>View Requirements</span>
					<span
						onClick={() => setRequirements(!requirements)}
						className={classNames(s.switch, requirements && s.switch_active)}
					>
						<span
							className={classNames(s.switcher, requirements && s.switcher_active)}
						></span>
					</span>
				</div>
			</div>
			<div className={s.content}>
				<Btns activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
				<div className={s.display}>
					{activeDisplay === 1 && <VinylDouble />}
					{activeDisplay === 3 && <GarageDoor />}
				</div>
			</div>
		</div>
	);
};
