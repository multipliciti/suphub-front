'use client';
import s from './Filters.module.scss';
import { useRef, useState } from 'react';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import search_icon from '@/imgs/search.svg';
import arrow_icon from '@/imgs/arrow.svg';
import clear_input from '@/imgs/Buyer&Seller/clear.svg';

interface TypeProps {
	setStateInputs: (n: any) => void;
	stateInputs: any;
}
export const Filters = ({ setStateInputs, stateInputs }: TypeProps) => {
	const [activeFilter, setActiveFilter] = useState<number>(-1);
	const inputSearchRef = useRef<HTMLInputElement | null>(null);

	//add and remove items in store inputs (stateInputs)
	const setVelueFilters = (key: string, item: string) => {
		const include = stateInputs[key].some(
			(existingItem: any) => existingItem === item
		);
		//remove item from array
		if (include) {
			setStateInputs((prevState: any) => ({
				...prevState,
				[key]: prevState[key].filter((existingItem: any) => existingItem !== item),
			}));
		}
		//add item
		else {
			setStateInputs((prevState: any) => ({
				...prevState,
				[key]: [...prevState[key], item],
			}));
		}
	};

	const statuses = {
		confirmed: 'confirmed',
		depositWaiting: 'depositWaiting',
		inProduction: 'inProduction',
		preShipment: 'preShipment',
		shipped: 'shipped',
		paymentWaiting: 'paymentWaiting',
		delivered: 'delivered',
		completed: 'completed',
	};

	const orderType = {
		sample: 'sample',
		product: ' product',
	};

	return (
		<div className={s.wrapper}>
			<label className={s.label} htmlFor="search">
				<Image src={search_icon} alt="search_icon" width={20} height={20} />
				<input
					ref={inputSearchRef}
					className={s.label_search}
					placeholder="Search product by product name, PO, manufacture name  "
					type="text"
					name="search"
					id="search"
					onChange={(e) =>
						setStateInputs((prevInputs: any) => ({
							...prevInputs,
							search: e.target.value,
						}))
					}
				/>
				<Image
					onClick={() => {
						setStateInputs((prevInputs: any) => ({
							...prevInputs,
							search: '',
						}));
						if (inputSearchRef.current) inputSearchRef.current.value = '';
					}}
					src={clear_input}
					alt="search_icon"
					width={20}
					height={20}
				/>
			</label>

			<div
				onClick={() => setActiveFilter(activeFilter !== 1 ? 1 : -1)}
				className={s.filter}
			>
				<span className={s.filter_title}>Status</span>
				<Image
					className={classNames(
						s.filter_icon,
						activeFilter === 1 && s.filter_icon_active
					)}
					src={arrow_icon}
					alt="arrow_icon"
					width={20}
					height={20}
				/>
				{/* Status filter */}
				<div
					className={classNames(
						s.filter_content,
						activeFilter === 1 && s.filter_content_active
					)}
				>
					{Object.values(statuses).map((el, ind) => {
						return (
							<div className={s.item_wrapper}>
								<p
									onClick={(e) => {
										e.stopPropagation();
										setVelueFilters('status', el);
									}}
									className={classNames(
										s.item,
										stateInputs['status'].some(
											(existingItem: any) => existingItem === el
										) && s.item_active
									)}
									key={ind}
								>
									{el}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Order Type filter*/}
			<div
				onClick={() => setActiveFilter(activeFilter !== 2 ? 2 : -1)}
				className={s.filter}
			>
				<span className={s.filter_title}>Order Type</span>
				<Image
					className={classNames(
						s.filter_icon,
						activeFilter === 2 && s.filter_icon_active
					)}
					src={arrow_icon}
					alt="arrow_icon"
					width={20}
					height={20}
				/>

				<div
					className={classNames(
						s.filter_content,
						activeFilter === 2 && s.filter_content_active
					)}
				>
					{Object.values(orderType).map((el, ind) => {
						return (
							<div className={s.item_wrapper}>
								<p
									onClick={(e) => {
										e.stopPropagation();
										setVelueFilters('orderType', el);
									}}
									className={classNames(
										s.item,
										stateInputs['orderType'].some(
											(existingItem: any) => existingItem === el
										) && s.item_active
									)}
									key={ind}
								>
									{el}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
