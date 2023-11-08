import { FC, useState } from 'react';
import Image from 'next/image';

import { classNames } from '@/utils/classNames';

import s from './TableSelect.module.scss';

import open_img from '@/imgs/Marketplace/ProductFilter/open.svg';
import close_img from '@/imgs/Marketplace/ProductFilter/close.svg';
import selected_img from '@/imgs/Marketplace/Filters/selected.svg';


type Props =  {
	isMultiple: boolean
	placeholder: string
	options: string[]
	value: string[]
	setValue: (value: string[]) => void
}

export const TableSelect: FC<Props> = (props) => {
	const { placeholder, isMultiple, options, value, setValue } = props;

	const [isOpen, setIsOpen] = useState(false);

	const handleSelectOption = (option: string) => {
		const isSelected = value.includes(option);

		if (isSelected) {
			setValue(value.filter(item => item !== option));
		} else {
			if (isMultiple) {
				setValue([...value, option]);
			} else {
				setValue([option])
			}
		}
	}

	return (
		<div
			className={s.wrapper}
			onClick={(e) => {
				e.stopPropagation();
				setIsOpen(!isOpen)}
			}
		>
			<span
				className={classNames(
					s.title,
					(value.length > 0) && s.title_selected
				)}
			>
				{value.length > 0
					? value.join(', ')
					: placeholder
				}
			</span>

			<Image
				className={s.img}
				src={isOpen ? open_img : close_img}
				alt="close_img"
				width={20}
				height={20}
			/>

			<div
				className={classNames(
					s.menu,
					isOpen && s.menu_active
				)}
			>
				<div
					className={s.select}
				>
					{options.map((item, index) => {
						const isSelected = value.includes(item);
						return (
							<div
								key={index + item}
								className={classNames(
									s.option,
									isSelected && s.option_active
								)}
								onClick={(e) => {
									e.stopPropagation();
									handleSelectOption(item);
									if (!isMultiple) {
										setIsOpen(false)
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
						)
					})}
				</div>
			</div>
		</div>
	)
}