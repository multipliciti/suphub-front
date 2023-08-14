'use client';
import s from './FilterWrapper.module.scss';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import {
	updateMinProducts,
	updateMaxproducts,
	updateSelectedItemsProsuct,
} from '@/redux/slices/marketplace/productsFilter';
//img
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import open_img from '@/imgs/Marketplace/ProductFilter/open.svg';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';
import { classNames } from '@/utils/classNames';
import { ProductFilterItem } from '@/types/marketplace/productFilters';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface TypeProps {
	item: ProductFilterItem;
}

export const FilterWrapper = (props: TypeProps) => {
	const dispatch = useAppDispatch();
	const { title, items, type, key, min, max } = props.item;
	const [open, setOpen] = useState<boolean>(false);
	const selectedOptionCountry = useAppSelector((state) =>
		state.productsFilter.storeProductsFilter.find(
			(el) => el.key === 'countryOfOrigin'
		)
	);
	const selectedOptionLeadTime = useAppSelector((state) =>
		state.productsFilter.storeProductsFilter.find((el) => el.key === 'leadTime')
	);
	// event: ChangeEvent<HTMLInputElement>
	console.log('selectedOptionLeadTime', selectedOptionLeadTime);
	const handleOptionChange = (arr: number[]) => {
		const newSelectedOptionLeadTime = arr;
		dispatch(
			updateSelectedItemsProsuct({
				filterKey: key,
				selectedItems: newSelectedOptionLeadTime,
			})
		);
	};

	const handleOptionChangeDaspatch = (selectedOptionCountrys: any[]) => {
		dispatch(
			updateSelectedItemsProsuct({
				filterKey: key,
				selectedItems: selectedOptionCountrys,
			})
		);
	};

	const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateMinProducts({ filterKey: key, min: Number(event.target.value) }));
	};

	const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateMaxproducts({ filterKey: key, max: Number(event.target.value) }));
	};

	const handleSelectChange = (value: string) => {
		if (selectedOptionCountry) {
			const currentSelectedItems = selectedOptionCountry.selectedItems || [];
			const index = currentSelectedItems.indexOf(value);

			if (index !== -1) {
				const newSelectedOptionCountry = currentSelectedItems.filter(
					(el) => el !== value
				);
				handleOptionChangeDaspatch(newSelectedOptionCountry);
			} else {
				const newSelectedOptionCountry = [...currentSelectedItems, value];
				handleOptionChangeDaspatch(newSelectedOptionCountry);
			}
		}
	};

	return (
		<div className={s.wrapper}>
			<span className={s.text}> {title} </span>
			<Image
				onClick={() => setOpen(!open)}
				className={s.img}
				src={open ? open_img : close_img}
				alt="close_img"
				width={20}
				height={20}
			/>

			{type === 'range' && (
				<div className={classNames(s.inner_wrapper, open && s.inner_wrapper_active)}>
					<label className={s.label} htmlFor={title}>
						<input
							onChange={(e) => handleMinChange(e)}
							placeholder="min"
							className={s.input}
							id={title}
							type="number"
							inputMode="numeric"
						/>
					</label>
					<label className={s.label} htmlFor={title}>
						<input
							onChange={(e) => handleMaxChange(e)}
							placeholder="max"
							className={s.input}
							id={title}
							type="number"
							inputMode="numeric"
						/>
					</label>
					<button
						onClick={() => {
							dispatch(updateMinProducts({ filterKey: key, min: 0 }));
							dispatch(updateMaxproducts({ filterKey: key, max: 0 }));
						}}
						className={s.clear}
					>
						Clear filter
					</button>
				</div>
			)}

			{type === 'radio' && (
				<div className={classNames(s.inner_wrapper, open && s.inner_wrapper_active)}>
					<div className={s.radio_wrapper}>
						{items?.map((el, ind) => {
							return (
								<div key={ind}>
									<label htmlFor={el.title} className={s.label_radio}>
										<input
											id={el.title}
											type="radio"
											value={el.title}
											checked={
												el.value.toString() ===
												selectedOptionLeadTime?.selectedItems?.toString()
											}
											onClick={() => {
												if (Array.isArray(el.value)) {
													handleOptionChange(el.value);
												}
											}}
										/>
										<span
											className={classNames(
												s.radio_title,
												el.value.toString() ===
													selectedOptionLeadTime?.selectedItems?.toString() &&
													s.radio_title_active
											)}
										>
											{el.title}
										</span>
									</label>
								</div>
							);
						})}
					</div>

					<button
						onClick={(e) =>
							dispatch(
								updateSelectedItemsProsuct({
									filterKey: key,
									selectedItems: [],
								})
							)
						}
						className={s.clear}
					>
						Clear filter
					</button>
				</div>
			)}

			{type === 'select' && (
				<div
					style={{
						padding: '0px',
					}}
					className={classNames(s.inner_wrapper, open && s.inner_wrapper_active)}
				>
					<div className={s.select}>
						{items?.map((el, ind) => {
							return (
								<div
									onClick={() => handleSelectChange(el.value.toString())}
									className={classNames(
										s.option,
										selectedOptionCountry?.selectedItems?.includes(
											el.value.toString()
										) && s.option_active
									)}
								>
									{el.title}

									{selectedOptionCountry?.selectedItems?.includes(
										el.value.toString()
									) && (
										<Image
											className={s.select_img}
											src={selected_img}
											alt="selected_img"
											width={20}
											height={20}
										/>
									)}
								</div>
							);
						})}
					</div>

					<button
						style={{
							paddingBottom: '8px',
							paddingLeft: '12px',
						}}
						onClick={(e) => {
							handleOptionChangeDaspatch([]);
							// setSelectedOption([]);/
						}}
						className={s.clear}
					>
						Clear filter
					</button>
				</div>
			)}
		</div>
	);
};
