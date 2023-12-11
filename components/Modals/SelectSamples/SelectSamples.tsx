'use client';
import Image from 'next/image';

import s from './SelectSamples.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import modal_close from '@/imgs/close.svg';

//testing
export const SelectSamples = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>Select samples</span>
				<Image
					onClick={() => dispatch(setModal(''))}
					src={modal_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>
		</div>
	);
};
//testing
