'use client';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import s from './QuotationsTable.module.scss';
import Image from 'next/image';
import more_icon from '@/imgs/Buyer&Seller/more.svg';
import { useRouter } from 'next/navigation';
import chat_image from '@/imgs/Buyer&Seller/chat_icon.svg';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';

interface TypeProps {
	quotations: any;
}

export const QuotationsTable = ({ quotations }: TypeProps) => {
	const { push } = useRouter();
	const [indexMore, setIndexMore] = useState<number>(-1);
	console.log('quotations', quotations);
	console.log('quotation', quotations[0]);

	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th className={classNames(s.th, s.eye_icon)}>
							<Image src={eye_icon} alt="eye_icon" width={20} height={20} />
						</th>
						<th className={s.th}>Option 1</th>
						<th className={s.th}>Option 2</th>
						<th className={s.th}>Option 3</th>
					</tr>
				</thead>

				{/* body  */}
				<tbody className={s.tbody}>
					{quotations.map((quotation: any, rowIndex: number) => {
						return (
							<tr className={s.quotation} key={rowIndex}>
								<th className={classNames(s.th, s.eye_icon)}>
									<Image src={eye_icon} alt="eye_icon" width={20} height={20} />
								</th>
								{quotation.items.map((el: any, cellIndex: number) => {
									return (
										<th className={classNames(s.th, s.p)} key={cellIndex}>
											<span className={s.quotation_item}>
												<div className={s.quotation_item_decription}>
													<span className={s.quotation_item_title}>{el.title}</span>
													<span className={s.quotation_item_price}>{el.price}</span>
												</div>
												<Image
													onClick={() =>
														setIndexMore(el.id === indexMore ? -1 : el.id)
													}
													className={s.quotation_item_more}
													src={more_icon}
													alt="more_icon"
													width={20}
													height={20}
												/>
												<span
													className={classNames(
														s.more,
														el.id === indexMore && s.more_active
													)}
												>
													<p
														onClick={() => push('/product-detail')}
														className={s.more_item}
													>
														Product details
													</p>
													<p className={s.more_item}>Order sample</p>
													<p className={s.more_item}>Decline offer</p>
												</span>
											</span>
										</th>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
