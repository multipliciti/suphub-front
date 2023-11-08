import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import s from './Layout.module.scss';

import closeIcon from '@/imgs/Buyer&Seller/close.svg';


interface Props {
	title: string
	description?: string
	close: () => void
}

export const StorefrontAddProductModalLayout: FC<PropsWithChildren<Props>> = (props) => {
	const { children, title, description, close } = props;

	return (
		<div className={s.wrapper}>

			<div className={s.header}>
				<h2>
					{title}
					<button
						className={s.close_btn}
						onClick={close}
					>
						<Image
							src={closeIcon}
							alt="close_icon"
							width={16}
							height={16}
						/>
					</button>
				</h2>
				{description &&	<p>Fill the form to add new product</p>}
			</div>

			<div className={s.main}>
				{children}
			</div>

		</div>
	)
}