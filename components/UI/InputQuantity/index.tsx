import { FC } from 'react';
import Image from 'next/image';

import s from './InputQuantity.module.scss';

import plus2Icon from '@/imgs/Buyer&Seller/plus_2.svg';
import minus2Icon from '@/imgs/Buyer&Seller/minus_2.svg';

interface Props {
	value: number;
	onChange: (value: number) => void;
}

export const InputQuantity: FC<Props> = ({ value, onChange }) => {
	const increment = () => {
		onChange(value + 1);
	};

	const decrement = () => {
		onChange(value - 1);
	};

	const handleChange = (value: number) => {
		onChange(value);
	};

	return (
		<div className={s.wrapper}>
			<button onClick={decrement}>
				<Image src={minus2Icon} alt="minus_icon" width={10} height={10} />
			</button>
			<input
				type="number"
				value={value}
				onChange={(e) => handleChange(Number(e.target.value))}
			/>
			<button onClick={increment}>
				<Image src={plus2Icon} alt="plus_icon" width={10} height={10} />
			</button>
		</div>
	);
};
