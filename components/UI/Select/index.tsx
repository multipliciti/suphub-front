import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import Image from 'next/image';

import { useClickOutside } from '@/components/Hooks/useClickOutside';
import { classNames } from '@/utils/classNames';

import s from './Select.module.scss';

import open_img from '@/imgs/Marketplace/ProductFilter/open.svg';
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';

interface Props {
	title: string;
	isMulti: boolean;
	options: string[];

	value: string[];
	setValue: Dispatch<SetStateAction<string[]>>;
}

export const Select: FC<Props> = (props) => {
	const { title, isMulti, options, value, setValue } = props;

	const [isOpen, setIsOpen] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);
	useClickOutside(wrapperRef, () => setIsOpen(false));

	const handleSelectOption = (option: string) => {
		const isSelected = value.includes(option);

		if (isSelected) {
			setValue((prevState) => {
				return prevState.filter((item) => item !== option);
			});
		} else {
			setValue((prevState) => {
				if (isMulti) {
					return [...prevState, option];
				}
				return [option];
			});
		}
	};

	return (
		<div
			ref={wrapperRef}
			className={s.wrapper}
			onClick={(e) => {
				e.stopPropagation();
				setIsOpen(!isOpen);
			}}
		>
			<span
				className={classNames(
					s.title,
					(isMulti || (!isMulti && value.length > 0)) && s.title_selected
				)}
			>
				{isMulti ? title : value.length > 0 ? value[0] : title}
			</span>

			<Image
				className={s.img}
				src={isOpen ? open_img : close_img}
				alt="close_img"
				width={20}
				height={20}
			/>

			<div className={classNames(s.menu, isOpen && s.menu_active)}>
				<div className={s.select}>
					{options.map((item, index) => {
						const isSelected = value.includes(item);
						return (
							<div
								key={index + item}
								className={classNames(s.option, isSelected && s.option_active)}
								onClick={(e) => {
									e.stopPropagation();
									handleSelectOption(item);
									if (!isMulti) {
										setIsOpen(false);
									}
								}}
							>
								{item}
								{isSelected && (
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

				{isMulti && (
					<button className={s.clear_btn} onClick={() => setValue([])}>
						{options.length ? 'Clear filter' : 'No filters'}
					</button>
				)}
			</div>
		</div>
	);
};
