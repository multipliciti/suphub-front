'use client';
import s from './RFQCartFilters.module.scss';
import { Api } from '@/services';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';
import { useClickOutside } from '@/components/Hooks/useClickOutside';
import { categoriesToSubCategories } from '@/utils/categoriesToSubCategories';
import Image from 'next/image';
import search_icon from '@/imgs/search.svg';
import arrow_icon from '@/imgs/arrow.svg';
import clear_input from '@/imgs/Buyer&Seller/clear.svg';

interface TypeProps {
	setStateInputs: (n: any) => void;
	stateInputs: any;
}

export const RFQCartFilters = ({ setStateInputs, stateInputs }: TypeProps) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const [activeFilter, setActiveFilter] = useState<number>(-1);
	const [requestBtn, setRequestBtn] = useState<boolean>(false);
	const inputSearchRef = useRef<HTMLInputElement | null>(null);
	const [category, setCategory] = useState<any[]>([]);
	const subCategories = categoriesToSubCategories(category);
	const requestFilterRef = useRef<HTMLButtonElement>(null);
	const categoriesFilterRef = useRef<HTMLDivElement>(null);
	const statusFilterRef = useRef<HTMLDivElement>(null);
	useClickOutside(requestFilterRef, () => {
		setRequestBtn(false);
	});
	useClickOutside(categoriesFilterRef, () => {
		setActiveFilter(-1);
	});
	useClickOutside(statusFilterRef, () => {
		setActiveFilter(-1);
	});

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

	const statuses = {
		draft: 'draft',
		requested: 'requested',
		responded: 'responded',
		sampling: 'sampling',
		purchase: 'purchase',
		closed: 'closed',
		archived: 'archived',
	};

	return (
		<div className={s.wrapper}>
			<span className={s.request_wrapper}>
				<button
					ref={requestFilterRef}
					onClick={() => setRequestBtn(!requestBtn)}
					className={classNames(s.request, requestBtn && s.request_active)}
				>
					Add new request
				</button>
				<div
					className={classNames(
						s.request_options,
						requestBtn && s.request_options_active
					)}
				>
					<button
						onClick={() => {
							dispatch(setModal('addRequestManually'));
						}}
						className={classNames(s.request_manually, s.request_item)}
					>
						Add manually
					</button>
					<button
						onClick={() => {
							dispatch(setModal('bulkUpload'));
						}}
						className={classNames(s.request_upload, s.request_item)}
					>
						Bulk upload
					</button>
				</div>
			</span>

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
					{subCategories.map((el, ind) => {
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

			<div
				ref={statusFilterRef}
				onClick={() => setActiveFilter(activeFilter !== 2 ? 2 : -1)}
				className={s.filter}
			>
				<span className={s.filter_title}>Status</span>
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
					{Object.values(statuses).map((el, ind) => {
						return (
							<div key={ind} className={s.item_wrapper}>
								<p
									onClick={(e) => {
										e.stopPropagation();
										setVelueFilters('statuses', el);
									}}
									className={classNames(
										s.item,
										stateInputs['statuses'].some(
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
