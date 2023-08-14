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
import { useAppDispatch } from '@/redux/hooks';

interface TypeProps {
	item: ProductFilterItem;
}

export const FilterWrapper = (props: TypeProps) => {
	const dispatch = useAppDispatch();
	const { title, items, type, min, max, key } = props.item;
	const [open, setOpen] = useState<boolean>(false);
	const [radioOption, setRadioOption] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState<string[]>([]);

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRadioOption(event.target.value);
	};

	const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateMinProducts({ filterKey: key, min: event.target.value }));
	};

	const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			updateMaxproducts({ filterKey: props.item.title, max: event.target.value })
		);
	};

	const handleOptionChangeDispatch = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			updateSelectedItemsProsuct({
				filterKey: props.item.title,
				selectedItems: [event.target.value],
			})
		);
	};

	const handleSelectChange = (value: string) => {
		if (selectedOption.includes(value)) {
			setSelectedOption(selectedOption.filter((option) => option !== value));
		} else {
			setSelectedOption([...selectedOption, value]);
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
							type="text"
						/>
					</label>
					<label className={s.label} htmlFor={title}>
						<input placeholder="max" className={s.input} id={title} type="text" />
					</label>
					<button className={s.clear}>Clear filter</button>
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
											value={el.value.toString()}
											checked={el.value === radioOption}
											onChange={handleOptionChange}
										/>
										<span
											className={classNames(
												s.radio_title,
												el.value === radioOption && s.radio_title_active
											)}
										>
											{el.title}
										</span>
									</label>
								</div>
							);
						})}
					</div>

					<button onClick={(e) => setRadioOption('')} className={s.clear}>
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
										selectedOption.includes(el.title) && s.option_active
									)}
								>
									{el.title}

									{selectedOption.includes(el.title) && (
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
						onClick={(e) => setRadioOption('')}
						className={s.clear}
					>
						Clear filter
					</button>
				</div>
			)}
		</div>
	);
};
