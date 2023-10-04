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
	const [activeFilter, setActiveFilter] = useState<number[]>([]);
	const inputSearchRef = useRef<HTMLInputElement | null>(null);

	//toggle. Off or on filter wrapper
	const toggleFilter = (id: number) => {
		if (activeFilter.includes(id)) {
			setActiveFilter(activeFilter.filter((filterId) => filterId !== id));
		} else {
			setActiveFilter([...activeFilter, id]);
		}
	};

	//add and remove items in store inputs (stateInputs)
	const setVelueFilters = (key: string, item: { id: number; title: string }) => {
		const include = stateInputs[key].some(
			(existingItem: any) => existingItem.id === item.id
		);
		//remove item from array
		if (include) {
			setStateInputs((prevState: any) => ({
				...prevState,
				[key]: prevState[key].filter(
					(existingItem: any) => existingItem.id !== item.id
				),
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
	//filter items
	const filtersArray = [
		{
			id: 1,
			title: 'Manufacturer',
			key: 'manufacturer',
			filters: [
				{
					id: 1,
					title: 'Customer name',
				},
				{
					id: 2,
					title: 'Customer name',
				},
				{
					id: 3,
					title: 'Customer name',
				},
				{
					id: 4,
					title: 'Customer name',
				},
				{
					id: 5,
					title: 'Customer name',
				},
				{
					id: 6,
					title: 'Customer name',
				},
				{
					id: 7,
					title: 'Customer name',
				},
				{
					id: 8,
					title: 'Customer name',
				},
				{
					id: 9,
					title: 'Customer name',
				},
				{
					id: 10,
					title: 'Customer name',
				},
			],
		},
		{
			id: 2,
			title: 'Status',
			key: 'status',
			filters: [
				{
					id: 1,
					title: 'PO issued',
				},
				{
					id: 2,
					title: 'Payment pending',
				},
				{
					id: 3,
					title: 'In production',
				},
				{
					id: 4,
					title: 'Pre-shipment',
				},
				{
					id: 5,
					title: 'PO issued',
				},
				{
					id: 6,
					title: 'Payment pending',
				},
				{
					id: 7,
					title: 'In production',
				},
				{
					id: 8,
					title: 'Pre-shipment',
				},
			],
		},
		{
			id: 3,
			title: 'Order type',
			key: 'orderType',
			filters: [
				{
					id: 1,
					title: 'Purchase order',
				},
				{
					id: 2,
					title: 'Sample order',
				},
			],
		},
	];

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

			{filtersArray.map((element, ind) => {
				return (
					<div
						key={ind}
						onClick={() => toggleFilter(element.id)}
						className={s.filter}
					>
						<span className={s.filter_title}>{element.title}</span>
						<Image
							className={classNames(
								s.filter_icon,
								activeFilter.includes(element.id) && s.filter_icon_active
							)}
							src={arrow_icon}
							alt="arrow_icon"
							width={20}
							height={20}
						/>

						<div
							className={classNames(
								s.filter_content,
								activeFilter.includes(element.id) && s.filter_content_active
							)}
						>
							{element.filters.map((el, ind) => {
								return (
									<div className={s.item_wrapper}>
										<p
											onClick={(e) => {
												e.stopPropagation();
												setVelueFilters(element.key, el);
											}}
											className={classNames(
												s.item,
												stateInputs[element.key].some(
													(existingItem: any) => existingItem.id === el.id
												) && s.item_active
											)}
											key={ind}
										>
											{el.title}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};
