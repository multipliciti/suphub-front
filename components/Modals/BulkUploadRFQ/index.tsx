'use client';
import s from './BulkUploadRFQ.module.scss';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import close_img from '@/imgs/close.svg';
import bulkUpload_icon from '@/imgs/Buyer&Seller/bulkUpload.svg';

export const BulkUploadRFQ = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					onClick={() => dispatch(setModal(''))}
					className={s.header_close}
					src={close_img}
					alt="close_img"
					width={20}
					height={20}
				/>
			</div>
			<div className={s.wrapper_inner}>
				<Image
					src={bulkUpload_icon}
					alt="bulkUpload_icon"
					width={100}
					height={100}
				/>

				<div className={s.description}>
					<h3 className={s.title}>Bulk Upload</h3>
					<p className={s.subtitle}>
						We can help you upload a series of products via csv, please contact
						support for assistance.
					</p>
				</div>

				<div className={s.buttons}>
					<button onClick={() => dispatch(setModal(''))} className={s.cancel}>
						Cancel
					</button>
					<button className={s.contact}>Contact support</button>
				</div>
			</div>
		</div>
	);
};
