'use client';
import s from './Filters.module.scss';
import { classNames } from '@/utils/classNames';
import { useRef, useState } from 'react';
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

	// Function to add and remove items in stateInputs
	const setVelueFilters = (key: string, item: string | number): void => {
		// Check if the item already exists in the array
		const include = stateInputs[key]?.includes(item);

		// Remove the item from the array if it exists
		if (include) {
			setStateInputs((prevState: any) => ({
				...prevState,
				[key]:
					prevState[key]?.filter((existingItem: any) => existingItem !== item) || [],
			}));
		}
		// Add the item to the array if it doesn't exist
		else {
			setStateInputs((prevState: any) => ({
				...prevState,
				[key]: [...(prevState[key] || []), item],
			}));
		}
	};

	const typesFilter = {
		singleFamily: 'singleFamily',
		multifamily: 'multifamily',
		custom: 'custom',
	};

	return (
		<div className={s.wrapper}>
			<label className={s.label} htmlFor="search">
				<Image src={search_icon} alt="search_icon" width={20} height={20} />
				<input
					ref={inputSearchRef}
					className={s.label_search}
					placeholder="Search product by product name, PO, manufacture name"
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
				onClick={() => setActiveFilter(activeFilter === 1 ? -1 : 1)}
				className={s.filter}
			>
				<span className={s.filter_title}>Type</span>
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

				<div
					className={classNames(
						s.filter_content,
						activeFilter === 1 && s.filter_content_active
					)}
				>
					{Object.values(typesFilter).map((el, ind) => {
						return (
							<div className={s.item_wrapper}>
								<p
									onClick={(e) => {
										e.stopPropagation();
										setVelueFilters('type', el);
									}}
									className={classNames(
										s.item,
										stateInputs['type'].some(
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
