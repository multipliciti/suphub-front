'use client';
import s from './GarageDoor.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import search_img from '@/imgs/search.svg';
import arrow_toggle from '@/imgs/Buyer&Seller/arrow_toggle.svg';
import { classNames } from '@/utils/classNames';

export const GarageDoor = () => {
	const [activeChoose, setActiveChoose] = useState<boolean>(false);
	const items = [
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
		{ title: 'Product Name', production: 'starting', price: 89.92 },
	];

	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr className={s.tr}>
						<th>Product quoted</th>
						<th>Size</th>
						<th>Quantity</th>
						<th>Unit price (USD)</th>
					</tr>
				</thead>
				<tbody className={s.tbody}>
					<tr className={s.tr}>
						<td className={s.label_wrapper}>
							<label className={s.label} htmlFor="none1">
								<input
									placeholder="Find a product"
									className={s.label_input}
									type="text"
									id="none1"
								/>
								<Image
									className={s.label_search}
									src={search_img}
									alt="search_img"
									width={20}
									height={20}
								/>
							</label>
						</td>
						<td className={s.size}>
							<input className={s.size_input} placeholder="W" type="text" />
							<input className={s.size_input} placeholder="H" type="text" />
							<input className={s.size_input} placeholder="D" type="text" />
						</td>
						<td className={s.quantity_wrapper}>
							<div className={s.quantity}>
								<input placeholder="100" className={s.quantity_input} type="text" />
								<span className={s.quantity_choose}>
									<span className={s.quantity_title}>Unit</span>
									<Image
										className={classNames(
											s.choose_img,
											activeChoose && s.choose_active
										)}
										src={arrow_toggle}
										alt="arrow_toggle"
										width={20}
										height={20}
									/>
								</span>
							</div>
						</td>
						<td>1</td>
					</tr>
					<tr className={s.tr}>
						<td className={s.label_wrapper}>
							<label className={s.label} htmlFor="none2">
								<input
									placeholder="Find a product"
									className={s.label_input}
									type="text"
									id="none2"
								/>
								<Image
									className={s.label_search}
									src={search_img}
									alt="search_img"
									width={20}
									height={20}
								/>
							</label>
						</td>
						<td className={s.size}>
							<input className={s.size_input} placeholder="W" type="text" />
							<input className={s.size_input} placeholder="H" type="text" />
							<input className={s.size_input} placeholder="D" type="text" />
						</td>
						<td className={s.quantity_wrapper}>
							<div className={s.quantity}>
								<input placeholder="100" className={s.quantity_input} type="text" />
								<span className={s.quantity_choose}>
									<span className={s.quantity_title}>Unit</span>
									<Image
										className={classNames(
											s.choose_img,
											activeChoose && s.choose_active
										)}
										src={arrow_toggle}
										alt="arrow_toggle"
										width={20}
										height={20}
									/>
								</span>
							</div>
						</td>
						<td>2</td>
					</tr>
					<tr className={s.tr}>
						<td>
							<div
								onClick={() => setActiveChoose(!activeChoose)}
								className={s.choose_wrapper}
							>
								<span className={s.choose_title}>Garage door</span>
								<Image
									className={classNames(
										s.choose_img,
										activeChoose && s.choose_active
									)}
									src={arrow_toggle}
									alt="arrow_toggle"
									width={20}
									height={20}
								/>
								<div
									className={classNames(
										s.choose_items,
										activeChoose && s.choose_items_active
									)}
								>
									{items.map((el, ind) => {
										return (
											<span key={ind} className={s.choose_item}>
												<p className={s.choose_item_name}>{el.title}</p>
												<p className={s.choose_item_production}>{el.production}</p>
												<p className={s.choose_item_price}>${el.price}</p>
											</span>
										);
									})}
								</div>
							</div>
						</td>
						<td className={s.size}>
							<input className={s.size_input} placeholder="W" type="text" />
							<input className={s.size_input} placeholder="H" type="text" />
							<input className={s.size_input} placeholder="D" type="text" />
						</td>
						<td className={s.quantity_wrapper}>
							<div className={s.quantity}>
								<input placeholder="100" className={s.quantity_input} type="text" />
								<span className={s.quantity_choose}>
									<span className={s.quantity_title}>Unit</span>
									<Image
										className={classNames(
											s.choose_img,
											activeChoose && s.choose_active
										)}
										src={arrow_toggle}
										alt="arrow_toggle"
										width={20}
										height={20}
									/>
								</span>
							</div>
						</td>
						<td>3</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
