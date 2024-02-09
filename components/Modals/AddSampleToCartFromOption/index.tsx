'use client';
import Image from 'next/image';
import { useState } from 'react';

import s from './AddSampleToCartFromOption.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

import modal_close from '@/imgs/close.svg';

import { AddToCart } from './AddToCart';
import { Added } from './Added';

//testing
export const AddSampleToCartFromOption = () => {
	const [activeWindow, setActiveWindow] = useState<number>(1);

	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>
					{activeWindow === 1 && 'Add to cart'}
					{activeWindow === 2 && ''}
				</span>
				<Image
					className={s.header_close}
					onClick={() => dispatch(setModal(''))}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>

			{/* body  */}
			<div className={s.body}>
				<div>
					{activeWindow === 1 && <AddToCart setActiveWindow={setActiveWindow} />}
				</div>
				<div>{activeWindow === 2 && <Added />}</div>
			</div>
		</div>
	);
};
//testing
