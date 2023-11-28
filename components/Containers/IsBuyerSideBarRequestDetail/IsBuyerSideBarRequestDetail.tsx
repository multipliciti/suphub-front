'use client';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import Image from 'next/image';
import close_image from '@/imgs/close.svg';
import s from './IsBuyerSideBarRequestDetail.module.scss';
import { Specs } from './Specs/Specs';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { setRfqId } from '@/redux/slices/sideBars/sideBarRequestDetail';
type TypeProps = {
	children: React.ReactNode;
};

export const IsBuyerSideBarRequestDetail = ({ children }: TypeProps) => {
	const dispatch = useAppDispatch();
	const id = useAppSelector((state) => state.sideBarRequestDetailSlice.rfqId);
	const [navId, setNavId] = useState<number>(1);
	const btns_nav = [
		{
			label: 'Specs',
			id: 1,
		},
		{
			label: 'Customer Support',
			id: 2,
		},
	];

	return (
		<div className={s.wrapper}>
			{children}
			<div className={classNames(s.sidebar, id !== -1 && s.sidebar_active)}>
				<div className={s.sidebar_wrapper}>
					<div onClick={() => dispatch(setRfqId(-1))} className={s.close_img}>
						<Image src={close_image} alt="close_image" width={15} height={15} />
					</div>
					<h3 className={s.sidebar_title}>Request Detail</h3>
					{/* // */}
					<div className={s.sidebar_nav}>
						{btns_nav.map((el, ind) => {
							return (
								<span
									key={ind}
									onClick={() => setNavId(el.id)}
									className={classNames(
										s.sidebar_nav_item,
										navId === el.id && s.sidebar_nav_item_active
									)}
								>
									{el.label}
								</span>
							);
						})}
					</div>
					{navId === 1 && <Specs />}

					<div className={s.update}>
						<button className={s.update_btn}>Update request</button>
					</div>
				</div>
			</div>
		</div>
	);
};
