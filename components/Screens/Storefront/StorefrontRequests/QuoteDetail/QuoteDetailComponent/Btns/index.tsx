'use client';
import { classNames } from '@/utils/classNames';
import s from './Btns.module.scss';

interface TypeProps {
	activeDisplay: number;
	setActiveDisplay: (n: number) => void;
}

export const Btns = ({ setActiveDisplay, activeDisplay }: TypeProps) => {
	const buttons = [
		{ title: 'Vinyl double', id: 1 },
		{ title: 'Vinyl double', id: 2 },
		{ title: 'Garage door', id: 3 },
	];

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>Product Requested</h3>
			{buttons.map((btn, ind) => {
				return (
					<button
						className={classNames(
							s.button,
							activeDisplay === btn.id && s.button_active
						)}
						onClick={() => setActiveDisplay(btn.id)}
						key={ind}
					>
						{btn.title}
					</button>
				);
			})}
		</div>
	);
};
