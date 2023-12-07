import Image from 'next/image';

import { Button } from '@/components/UI/Button';

import s from './PurchaseOrderMessage.module.scss';

import documentIcon from '@/imgs/Buyer&Seller/document.svg';
import checkmarkIcon from '@/imgs/Buyer&Seller/checkmark.svg';

export const PurchaseOrderMessage = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.image}>
				<Image src={documentIcon} alt={'order_issued'} width={72} height={88} />
				<div className={s.image_checkmark}>
					<Image
						src={checkmarkIcon}
						alt="order_issued_checkmark"
						width={17}
						height={13}
					/>
				</div>
			</div>
			<div className={s.info}>
				<h3>Purchase Order Issued!</h3>
				<p>We will contact you shortly to confirm all the details</p>
			</div>
			<Button variant="contained" disabled>
				Download PDF
			</Button>
		</div>
	);
};
