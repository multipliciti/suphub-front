'use client';
import s from './Products.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { ProductTable } from './ProductTable';
import { QuotationsTable } from './QuotationsTable';
import arrow_white from '@/imgs/Buyer&Seller/arrow_white.svg';
import arrow_resize from '@/imgs/Buyer&Seller/arrow_resize.svg';
import arrow_icon from '@/imgs/arrow.svg';
import disable_arrow from '@/imgs/Buyer&Seller/disable_arrow.svg';

export const Product = ({ products }: any) => {
	console.log('products', products[0]);
	const [active, setActive] = useState<number>(0);
	console.log('active', active);

	return (
		<div className={s.wrapper}>
			{products.map((el: any, ind: number) => {
				return (
					<div className={classNames(s.set)}>
						<div className={s.products}>
							{/* header  */}
							<div
								className={classNames(
									s.products_header,
									active === el.id && s.products_header_active
								)}
							>
								<div
									onClick={() => setActive(el.id)}
									className={s.products_header_toggle}
								>
									<Image
										className={s.arrow}
										src={arrow_white}
										alt="arrow_white"
										width={20}
										height={20}
									/>
									<p>
										<span className={s.indificator}>{el.indificator}</span>{' '}
										{el.category}
									</p>
								</div>
								<p className={s.products_header_count}>
									<span>{el.properties.length} </span>
									{el.properties.lendth === 1 ? 'item' : 'items'}
								</p>
								<Image
									className={classNames(
										s.products_header_resize,
										s.none,
										active === el.id && s.active
									)}
									src={arrow_resize}
									alt="arrow_resize"
									width={20}
									height={20}
								/>
							</div>

							<span className={classNames(s.none, active === el.id && s.active)}>
								<ProductTable properties={el.properties} />
							</span>
						</div>

						<div
							className={classNames(
								s.quotations,
								active === el.id ? s.active : s.none
							)}
						>
							<div className={s.quotations_header}>
								<p className={s.title}>Quotations</p>
								<span className={s.pagination}>
									<span className={s.pagination_arrow}>
										<Image
											src={arrow_icon}
											alt="arrow_icon"
											width={20}
											height={20}
										/>
									</span>
									<span className={s.pagination_arrow}>
										<Image
											src={arrow_icon}
											alt="arrow_icon"
											width={20}
											height={20}
										/>
									</span>
								</span>
							</div>
							<QuotationsTable quotations={el.quotations} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
