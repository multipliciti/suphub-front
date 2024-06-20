import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import closeIcon from '@/imgs/Buyer&Seller/close.svg';
import s from './Layout.module.scss';

interface Props {
	title: string;
	close: () => void;
}

export const BulkUploadRFQModalLayout: FC<PropsWithChildren<Props>> = (props) => {
	const { children, title, close } = props;

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<h2>
					{title}
					<button className={s.close_btn} onClick={close}>
						<Image src={closeIcon} alt="close_icon" width={16} height={16} />
					</button>
				</h2>
			</div>
			<div className={s.main}>{children}</div>
		</div>
	);
};
