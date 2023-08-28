'use client';
import s from './Order.module.scss';
import imageTest1 from '@/imgs/Product/ImageTest1.png';
import { useState } from 'react';
import { Simple } from './Simple';
import { classNames } from '@/utils/classNames';
import { User } from '@/types/services/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

interface PropsType {
	user : User | null;
	statusGetUser: 'pending' | 'seccess' | 'rejected' | 'logouted'
}

export const Order = ({user, statusGetUser} : PropsType) => {
	const dispatch = useAppDispatch()

	const orderSummary = [
		['QTY. 1+', 75],
		['QTY. 1+', 75],
		['QTY. 1+', 75],
	];

	const simples = [
		{
			id: 1,
			title: 'Window corner 1',
			price: 70,
		},
		{
			id: 2,
			title: 'Window corner 2',
			price: 70,
		},
	];

	const exempels = [
		{
			id: 1,
			title: 'Beige',
			img: imageTest1,
		},
		{
			id: 2,
			title: 'Blue',
			img: imageTest1,
		},
		{
			id: 3,
			title: 'Green',
			img: imageTest1,
		},
		{
			id: 4,
			title: 'Orange',
			img: imageTest1,
		},
	];

	return (
		<div className={s.container}>
			{/* started */}
			<div className={classNames(s.started, !user && statusGetUser !== 'pending' && s.started_active)}>
				<div className={s.convert}>
					<h3 className={s.convert_title}>Convert to business buyer</h3>
					<p className={s.convert_subtitle}>Become a verified buyer to trade</p>
					<button onClick={()=> dispatch(setModal('login'))} className={s.convert_btn}>
						Get started
					</button>
				</div>
			</div>

			<div className={s.order}>
				<div className={s.header}>Order summary</div>
				<div className={s.price}>
					{orderSummary.map((el, ind) => {
						return (
							<p key={ind} className={s.price_row}>
								<span className={s.price_row_key}> {el[0]}</span>
								<span className={s.price_row_value}>
									{el[1]} <span className={s.unit}>/ unit</span>
								</span>
							</p>
						);
					})}

					<button className={s.btn}>
						Add to RFQ cart
					</button>
				</div>
			</div>

			{simples.map((el: any, ind: number) => {
				return (
					<div>
						<Simple
							exemples={exempels}
							id={el.id}
							title={el.title}
							price={el.price}
						/>
					</div>
				);
			})}
		</div>
	);
};
