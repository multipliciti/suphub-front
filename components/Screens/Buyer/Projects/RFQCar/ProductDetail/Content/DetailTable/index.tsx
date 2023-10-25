'use client';
import Image from 'next/image';
import s from './DetailTable.module.scss';
import eye_active from '@/imgs/Buyer&Seller/eye_active.svg';
import { classNames } from '@/utils/classNames';

export const DetailTable = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.buttons}>
				<div className={s.head}>Product Requested</div>
				<button className={s.btn}>Vinyl double</button>
				<button className={s.btn}>Vinyl double</button>
			</div>
			<table className={s.table}>
				{/* thead  */}
				<thead className={s.thead}>
					<tr className={s.tr}>
						<th className={s.th}>Product quoted</th>
						<th className={s.th}>Size</th>
						<th className={s.th}>Quantity</th>
						<th className={s.th}>Unit price (USD)</th>
					</tr>
				</thead>
				{/* tbody  */}
				<tbody className={s.tbody}>
					<tr className={s.tr}>
						<th className={s.th}>Product quoted</th>
						<th className={s.th}>
							<span className={s.size}>30</span>
							<span className={s.size}>50</span>
							<span className={s.size}>90</span>
						</th>
						<th className={s.th}>
							<span>1</span>
							<span className={s.unit}>Unit</span>
						</th>
						<th className={s.th}>
							<span>$70.35</span>
							<span>
								<Image src={eye_active} alt="eye_active" width={20} height={20} />
							</span>
						</th>
					</tr>
					{/* 2 time */}
					<tr className={s.tr}>
						<th className={s.th}>Product quoted</th>
						<th className={s.th}>
							<span className={s.size}>30</span>
							<span className={s.size}>50</span>
							<span className={s.size}>90</span>
						</th>
						<th className={s.th}>
							<span>1</span>
							<span className={s.unit}>Unit</span>
						</th>
						<th className={s.th}>
							<span>$70.35</span>
							<span>
								<Image src={eye_active} alt="eye_active" width={20} height={20} />
							</span>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
