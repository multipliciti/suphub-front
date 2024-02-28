'use client';
import Image from 'next/image';
import s from './Error.module.scss';

import error_icon from '@/imgs/Buyer&Seller/process_error.svg';

type TypeProps = {
	error: string;
	closeModal: () => void;
};

export const Error = ({ error, closeModal }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<Image src={error_icon} alt="error_icon" width={128} height={128} />

			<h3 className={s.title}>{error}</h3>

			<button onClick={() => closeModal()} className={s.btn}>
				Close
			</button>
		</div>
	);
};
