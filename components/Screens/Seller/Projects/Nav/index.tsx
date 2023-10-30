'use client';
import { classNames } from '@/utils/classNames';
import s from './Nav.module.scss';

interface TypeProps {
	activeDisplay: number;
	setActiveDisplay: (n: number) => void;
}
export const Nav = ({ activeDisplay, setActiveDisplay }: TypeProps) => {
	const navList = [
		{
			id: 1,
			title: 'My Products',
		},
		{
			id: 2,
			title: 'Requests',
		},
		{
			id: 3,
			title: 'Orders',
		},
	];

	return (
		<div className={s.wrapper}>
			<div className={s.nav}>
				{navList.map((el, ind) => {
					return (
						<div
							onClick={() => setActiveDisplay(el.id)}
							className={classNames(
								s.item,
								el.id === activeDisplay && s.item_active
							)}
							key={ind}
						>
							<p>{el.title}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
