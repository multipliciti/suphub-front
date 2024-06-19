import React from 'react';
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

function SuppliersSidebarInput() {
	return (
		<div className={s.input}>
			<input className={s.input_text} />
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
