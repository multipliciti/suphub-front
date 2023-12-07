'use client';
import s from './FilterWrapper.module.scss';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
	updateMinProducts,
	updateMaxproducts,
	updateSelectedItemsProsuct,
} from '@/redux/slices/favorites/productsFilter';
//img
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import open_img from '@/imgs/Marketplace/ProductFilter/open.svg';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';
import { classNames } from '@/utils/classNames';
import { ProductFilterItem } from '@/types/products/productFilters';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import debounce from 'lodash.debounce';

interface TypeProps {
	item: ProductFilterItem;
}

export const FilterWrapper = (props: TypeProps) => {
	const dispatch = useAppDispatch();
	const { title, items, type, key, min, max } = props.item;
	const [open, setOpen] = useState<boolean>(false);
	const minInputRef = useRef<HTMLInputElement | null>(null);
	const maxInputRef = useRef<HTMLInputElement | null>(null);
	const startResetInputsValue = useAppSelector(
		(state) => state.favoritesProductFilter.startResetInputs
	);
	const selectedOptionCountry = useAppSelector((state) =>
		state.favoritesProductFilter.storeProductsFilter.find(
			(el) => el.key === 'countryOfOrigin'
		)
	);
	const selectedOptionLeadTime = useAppSelector((state) =>
		state.favoritesProductFilter.storeProductsFilter.find(
			(el) => el.key === 'leadTime'
		)
	);
	const handleOptionChange = (arr: number[]) => {
		const newSelectedOptionLeadTime = arr;
		dispatch(
			updateSelectedItemsProsuct({
				filterKey: key,
				selectedItems: newSelectedOptionLeadTime,
			})
		);
	};

	//When startResetInputsValue changes, it signals that the input values of the filters should be reset completely.
	useEffect(() => {
		if (minInputRef.current) {
			minInputRef.current.value = '';
		}
		if (maxInputRef.current) {
			maxInputRef.current.value = '';
		}
	}, [startResetInputsValue]);

	const handleOptionChangeDaspatch = (selectedOptionCountrys: any[]) => {
		dispatch(
			updateSelectedItemsProsuct({
				filterKey: key,
				selectedItems: selectedOptionCountrys,
			})
		);
	};

	const handleMinChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateMinProducts({ filterKey: key, min: Number(event.target.value) }));
	}, 250);

	const handleMaxChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateMaxproducts({ filterKey: key, max: Number(event.target.value) }));
	}, 250);

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

	const handleClearFilter = () => {
		dispatch(updateMinProducts({ filterKey: key, min: '' }));
		dispatch(updateMaxproducts({ filterKey: key, max: '' }));
		if (minInputRef.current) {
			minInputRef.current.value = '';
		}
		if (maxInputRef.current) {
			maxInputRef.current.value = '';
		}
	};

	return (
		<div
			onClick={(e) => {
				setOpen(!open);
			}}
			className={s.wrapper}
		>
			<span className={s.text}> {title} </span>
			<Image
				className={s.img}
				src={open ? open_img : close_img}
				alt="close_img"
				width={20}
				height={20}
			/>

			{type === 'range' && (
				<div className={classNames(s.inner_wrapper, open && s.inner_wrapper_active)}>
					<label
						onClick={(e) => e.stopPropagation()}
						className={s.label}
						htmlFor={title}
					>
						<input
							ref={minInputRef}
							onChange={(e) => handleMinChange(e)}
							placeholder="Min"
							className={s.input}
							id={title}
							type="number"
							inputMode="numeric"
						/>
					</label>
					<label
						onClick={(e) => e.stopPropagation()}
						className={s.label}
						htmlFor={title}
					>
						<input
							ref={maxInputRef}
							onChange={(e) => handleMaxChange(e)}
							placeholder="Max"
							className={s.input}
							id={title}
							type="number"
							inputMode="numeric"
						/>
					</label>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleClearFilter();
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
									<label
										onClick={(e) => e.stopPropagation()}
										htmlFor={el.title}
										className={s.label_radio}
									>
										<input
											id={el.title}
											type="radio"
											value={el.title}
											checked={
												el.value.toString() ===
												selectedOptionLeadTime?.selectedItems?.toString()
											}
											onClick={(e) => {
												e.stopPropagation();
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
						onClick={(e) => {
							e.stopPropagation();
							dispatch(
								updateSelectedItemsProsuct({
									filterKey: key,
									selectedItems: [],
								})
							);
						}}
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
									key={ind}
									onClick={(e) => {
										e.stopPropagation();
										handleSelectChange(el.value.toString());
									}}
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
							e.stopPropagation();
							handleOptionChangeDaspatch([]);
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
