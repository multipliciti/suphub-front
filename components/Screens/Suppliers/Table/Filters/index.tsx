'use client';
import s from './Filters.module.scss';
import { classNames } from '@/utils/classNames';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import search_icon from '@/imgs/search.svg';
import arrow_icon from '@/imgs/arrow.svg';
import clear_input from '@/imgs/Buyer&Seller/clear.svg';
import plusIcon from '@/imgs/Suppliers/table/plus.svg';
import plusWhiteIcon from '@/imgs/Suppliers/table/plusWhite.svg';
import { Api } from '@/services';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

interface TypeProps {
	setStateInputs: (n: any) => void;
	stateInputs: any;
}

export const Filters = ({ setStateInputs, stateInputs }: TypeProps) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const [activeFilter, setActiveFilter] = useState<number>(-1);
	const inputSearchRef = useRef<HTMLInputElement | null>(null);
	const categoriesFilterRef = useRef<HTMLDivElement>(null);

	const [category, setCategory] = useState<any[]>([]);

	const getCategory = async () => {
		try {
			const category = await api.category.getCategories();
			setCategory(category);
		} catch (error) {
			console.error('error submitedRFQ', error);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

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

	const handleOpenInviteModal = () => {
		dispatch(setModal('inviteSuppliers'));
	};

	return (
		<div className={s.wrapper}>
			<button className={s.button} onClick={handleOpenInviteModal}>
				<Image className={s.button_icon} src={plusIcon} alt="add" />
				<Image className={s.button_icon_hover} src={plusWhiteIcon} alt="add" />
				<span>Add suppliers</span>
			</button>

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
				ref={categoriesFilterRef}
				onClick={() => setActiveFilter(activeFilter !== 1 ? 1 : -1)}
				className={s.filter}
			>
				<span className={s.filter_title}>Categories</span>
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
					{category.map((el, ind) => {
						return (
							<div key={ind} className={s.item_wrapper}>
								<p
									onClick={(e) => {
										e.stopPropagation();
										setVelueFilters('categories', el.id);
									}}
									className={classNames(
										s.item,
										stateInputs['categories'].some(
											(existingItem: any) => existingItem === el.id
										) && s.item_active
									)}
									key={ind}
								>
									{el.name}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
