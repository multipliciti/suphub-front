'use client';
import s from './Production.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import test from '@/imgs/Product/test2.png';
import { useState } from 'react';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const Production = ({ activeDisplay, index }: PropsType) => {
	const [testShow, setTest] = useState(false);
	const arrMessages = [
		{
			data: '01/05/2023',
			status: 'new',
			message: 'Production started',
		},
		{
			data: '01/05/2023',
			status: 'new',
			message: 'Production of “Vinyl double pane fixed window” finished',
		},
		{
			data: '01/05/2023',
			status: 'new',
			message:
				'Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished',
			imgs: [test, test, test, test, test, test],
		},
	];
	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			{arrMessages.map((el, ind) => {
				return (
					<div key={ind} className={s.message}>
						<p className={s.status}>
							<span className={s.status_data}>{el.data}</span>
							<span>{el.status}</span>
						</p>
						<p className={s.title}>{el.message}</p>
						{el.imgs && (
							<div className={s.img_wrapper}>
								{el.imgs.map((img, ind) => {
									return (
										<Image
											key={ind}
											className={s.img_item}
											src={test}
											alt="test"
											width={60}
											height={60}
										/>
									);
								})}
							</div>
						)}
					</div>
				);
			})}

			<div onClick={() => setTest(!testShow)} className={s.buttons}>
				{testShow && <p className={s.buttons_aproved}>Milestone approved</p>}
				{!testShow && (
					<>
						<button className={s.buttons_decline}>Decline & add feedback</button>
						<button className={s.buttons_approve}>Approve</button>
					</>
				)}
			</div>
		</div>
	);
};
