'use client';
import s from './Products.module.scss';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { ProductTable } from './ProductTable';
import { QuotationsTable } from './QuotationsTable';
import { truncateFileNameEnd } from '@/utils/names';
import arrow_white from '@/imgs/Buyer&Seller/arrow_white.svg';
import arrow_resize from '@/imgs/Buyer&Seller/arrow_resize.svg';
import arrow_resize_active from '@/imgs/Buyer&Seller/arrow_resize_active.svg';
import arrow_icon from '@/imgs/arrow.svg';
import disable_arrow from '@/imgs/Buyer&Seller/disable_arrow.svg';
import { RfqItemGot } from '@/types/services/rfq';

interface TypeProps {
	rfqs: RfqItemGot[][];
}

export const Products = ({ rfqs }: TypeProps) => {
	const [active, setActive] = useState<number>(0);
	const [compress, setCompress] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			{rfqs.map((el: RfqItemGot[], ind: number) => {
				return (
					<div key={ind} className={classNames(s.set)}>
						<div
							className={classNames(
								s.products,
								active === ind && compress && s.products_compress
							)}
						>
							{/* header */}
							<div
								className={classNames(
									s.products_header,
									active === ind && s.products_header_active,
									active === ind && compress && s.products_header_compress
								)}
							>
								<div
									onClick={() => setActive(active === ind ? -1 : ind)}
									className={s.products_header_toggle}
								>
									<Image
										className={classNames(
											s.arrow_toggle,
											ind === active && s.arrow_toggle_active
										)}
										src={arrow_white}
										alt="arrow_white"
										width={20}
										height={20}
									/>
									{compress ? (
										<p>
											<span className={s.indificator}>CSI</span>
											{truncateFileNameEnd(el[0].subCategory.csiCode, 15)}
										</p>
									) : (
										<p>
											<span className={s.indificator}>CSI</span>
											{el[0].subCategory.csiCode}
										</p>
									)}
								</div>
								{active === ind ? (
									!compress && (
										<p className={s.products_header_count}>
											<span>{el.length} </span>
											{el.length === 1 ? 'item' : 'items'}
										</p>
									)
								) : (
									<p className={s.products_header_count}>
										<span>{el.length} </span>
										{el.length === 1 ? 'item' : 'items'}
									</p>
								)}
								<Image
									onClick={() => setCompress(!compress)}
									className={classNames(
										s.products_header_resize,
										s.none,
										active === ind && s.active
									)}
									src={compress ? arrow_resize_active : arrow_resize}
									alt="arrow_resize"
									width={20}
									height={20}
								/>
							</div>
							<span
								className={classNames(
									s.none,
									active === ind && s.active,
									active === ind && s.table_wrapper
								)}
							>
								<span>
									<ProductTable compress={compress} properties={el} />
								</span>
							</span>
						</div>
						<div
							className={classNames(
								s.quotations,
								active === ind ? s.active : s.none,
								compress && s.quotations_compress
							)}
						>
							<div className={s.quotations_header}>
								<p className={s.title}>Quotations</p>
							</div>
							<QuotationsTable compress={compress} rfqs={el} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
