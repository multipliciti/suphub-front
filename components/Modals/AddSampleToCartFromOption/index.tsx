'use client';
import Image from 'next/image';
import { useState } from 'react';

import s from './AddSampleToCartFromOption.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

import { AddToCart } from './AddToCart';
import { Added } from './Added';
import { Error } from './Error';

import modal_close from '@/imgs/close.svg';

//testing
export const AddSampleToCartFromOption = () => {
	const [activeWindow, setActiveWindow] = useState<number>(1);
	const [error, setError] = useState<string>('');
	const dispatch = useAppDispatch();

	const closeModal = () => {
		dispatch(setModal(''));
	};

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>
					{activeWindow === 1 && 'Add to cart'}
					{activeWindow === 2 && ''}
					{activeWindow === 3 && 'Error'}
				</span>
				<Image
					className={s.header_close}
					onClick={() => closeModal()}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>
			{/* body  */}
			<div className={s.body}>
				{activeWindow === 1 && (
					<AddToCart setError={setError} setActiveWindow={setActiveWindow} />
				)}

				<div>{activeWindow === 2 && <Added />}</div>
				<div>
					{activeWindow === 3 && <Error error={error} closeModal={closeModal} />}
				</div>
			</div>
		</div>
	);
};
//testing
