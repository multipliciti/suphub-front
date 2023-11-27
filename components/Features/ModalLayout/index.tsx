import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import s from './ModalLayout.module.scss';

import closeIcon from '@/imgs/Buyer&Seller/close.svg';

interface Props {
	title: string;
	description?: string;
	onHide: () => void;
}

export const ModalLayout: FC<PropsWithChildren<Props>> = (props) => {
	const { children, title, description, onHide } = props;

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<h2>
					{title}
					<button className={s.close_btn} onClick={onHide}>
						<Image src={closeIcon} alt="close_icon" width={16} height={16} />
					</button>
				</h2>
				{description && <p>{description}</p>}
			</div>

			<div className={s.main}>{children}</div>
		</div>
	);
};
