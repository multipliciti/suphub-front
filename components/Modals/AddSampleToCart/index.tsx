'use client';
import Image from 'next/image';

import s from './AddSampleToCart.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

import { ChooseProjects } from './ChooseProjects';
import modal_close from '@/imgs/close.svg';

export const AddSampleToCart = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<p className={s.header_title}>Choose Project</p>
				<Image
					onClick={() => dispatch(setModal(''))}
					src={modal_close}
					className={s.header_close}
					alt="modal_close"
					width={15}
					height={15}
				/>
			</div>

			<ChooseProjects />
		</div>
	);
};
