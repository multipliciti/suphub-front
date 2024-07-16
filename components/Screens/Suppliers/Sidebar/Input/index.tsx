import React, { useState } from 'react';
import { SuppliersSidebarInputProps } from '../type';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import s from './SuppliersSidebarInput.module.scss';
//img
import tag from '@/imgs/Suppliers/input/tag.svg';
import attachment from '@/imgs/Suppliers/input/attachment.svg';
import photo from '@/imgs/Suppliers/input/photo.svg';

interface Button {
	name: string;
	logo: string;
	action: () => void;
}

const actionButtons = [
	{
		name: 'tag',
		logo: tag,
		action: () => null,
	},
	{
		name: 'attachment',
		logo: attachment,
		action: () => null,
	},
	{
		name: 'photo',
		logo: photo,
		action: () => null,
	},
];

function SuppliersSidebarInput({ sendMessage }: SuppliersSidebarInputProps) {
	const user = useAppSelector((state) => state.authSlice.user);

	const author =
		user?.firstName === null ? user?.email : `${user?.firstName ?? ''}`.trim();

	const [text, setText] = useState<string>('');

	function getTodayFormatted() {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const today = new Date();
		const month = months[today.getMonth()];
		const day = today.getDate();
		const year = today.getFullYear();

		return `${month} ${day}, ${year}`;
	}
	const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		//TODO implement real logic when backend is ready
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage({
				author: author,
				date: getTodayFormatted(),
				content: text,
			});
			setText('');
		}
	};

	return (
		<div className={s.input} onKeyDown={handleEnterKeyDown}>
			<input
				className={s.input_text}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<div className={s.input_attachment}>
				{actionButtons.map(({ name, logo, action }: Button, index: number) => (
					<Image
						className={s.logo}
						src={logo}
						onClick={action}
						title={name}
						alt={name}
						key={index}
					/>
				))}
			</div>
		</div>
	);
}

export default SuppliersSidebarInput;
