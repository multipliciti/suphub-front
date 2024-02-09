'use client';
import s from './MyQuotation.module.scss';
import { useRef, useState } from 'react';
import { Api } from '@/services';
import Image from 'next/image';
import { ProductsNameList } from './ProductsNameList/ProductsNameList';
import { useClickOutside } from '@/components/Hooks/useClickOutside';
import { truncateFileNameEnd } from '@/utils/names';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import eye_active from '@/imgs/Buyer&Seller/eye_active.svg';
import search_icon from '@/imgs/search.svg';
import close_icon from '@/imgs/close.svg';

type TypeProps = {
	item: any;
};

// !!! need to redo the layout (HTML) for good future adaptation
export const MyQuotation = ({ item }: TypeProps) => {
	const api = Api();
	const wrapperRef = useRef<HTMLTableDataCellElement | null>(null);
	const [nameContains, setNameContains] = useState<string>('');
	const [focusedInput, setFocusedInput] = useState<number>(-1);
	//initialState that should have the same number of elements as in Rfqs
	const initialState = item.Rfq.map((el: any, ind: number) => {
		return {
			size: null,
			quantity: null,
			unit: 'unit',
			price: null,
			productId: null,
			rfqId: el.id,
		};
	});

	//Already changed data after some entered data.
	const [dataArr, setDataArr] = useState<any[]>(initialState);
	//function that changes data dataArr
	const handleChangeDataArr = (ind: number, key: string, value: any) => {
		const dataArrCopy = [...dataArr];
		const objCopy = dataArrCopy[ind];
		objCopy[key] = value;
		setDataArr(dataArrCopy);
	};
	//data filtering and sending in a loop using forEach
	const fetchSendDataArr = () => {
		//filter array objs aren't contains null
		const filteredDataArray = dataArr.filter((obj) => {
			return Object.values(obj).every((value) => value !== null);
		});
		//map filteredDataArray and rewrite productId
		const finishDataArrya = filteredDataArray.map((el) => {
			return {
				...el,
				productId: el.productId.id,
			};
		});
		try {
			finishDataArrya.forEach((el) => {
				api.rfqOption.create(el);
			});
		} catch (error) {
			console.log('error create option:', error);
		}
	};
	//Hook for disappearing wrapperRef
	useClickOutside(wrapperRef, () => {
		setFocusedInput(-1);
	});

	return (
		<div>
			<div className={s.wrapper}>
				<table className={s.table}>
					<thead className={s.thead}>
						<tr className={s.tr}>
							<th className={s.th}>Product Requested</th>
							<th className={s.th}>Product quoted</th>
							<th className={s.th}>Size</th>
							<th className={s.th}>Quantity</th>
							<th className={s.th}>Unit price (USD)</th>
						</tr>
					</thead>
					<tbody className={s.tbody}>
						{item.Rfq.map((el: any, ind: number) => {
							return (
								<tr key={ind} className={s.tr}>
									<td className={s.td}>
										<span>{el.productName}</span>
										<Image
											className={s.eye}
											src={eye_icon}
											alt="addProject"
											width={20}
											height={20}
										/>
										<Image
											className={s.eye_active}
											src={eye_active}
											alt="addProject"
											width={20}
											height={20}
										/>
									</td>
									<td ref={wrapperRef} className={s.td}>
										{dataArr[ind].productId ? (
											<div className={s.chose}>
												<span className={s.chose_title}>
													{truncateFileNameEnd(dataArr[ind].productId.name, 25)}
												</span>
												<Image
													className={s.chose_close}
													src={close_icon}
													alt="close_icon"
													width={10}
													height={10}
													onClick={() => {
														handleChangeDataArr(ind, 'productId', null);
													}}
												/>
											</div>
										) : (
											<>
												<label
													onClick={() => {
														setFocusedInput(ind === focusedInput ? -1 : ind);
													}}
													className={s.td_label}
													htmlFor={`ProductQuoted_${ind}`}
												>
													<input
														onChange={(e) => setNameContains(e.target.value)}
														placeholder="Find a product"
														className={s.input}
														id={`ProductQuoted_${ind}`}
														type="text"
													/>
													<Image
														src={search_icon}
														alt="search_icon"
														width={20}
														height={20}
													/>
												</label>
												{focusedInput === ind && (
													<ProductsNameList
														setFocusedInput={setFocusedInput}
														ind={ind}
														handleChangeDataArr={handleChangeDataArr}
														nameContains={nameContains}
													/>
												)}
											</>
										)}
									</td>
									<td className={s.td}>
										<label className={s.td_label} htmlFor="size">
											<input
												onChange={(e) =>
													handleChangeDataArr(ind, 'size', e.target.value)
												}
												placeholder="Size"
												className={s.input}
												id="size"
												type="text"
											/>
										</label>
									</td>
									<td className={s.td}>
										<div className={s.quantity}>
											<label className={s.td_label} htmlFor="quantity">
												<input
													onChange={(e) =>
														handleChangeDataArr(
															ind,
															'quantity',
															Number(e.target.value)
														)
													}
													placeholder="Quantity"
													className={s.input}
													id="quantity"
													type="number"
												/>
											</label>
											<span className={s.unit}>Unit</span>
										</div>
									</td>

									<td className={s.td}>
										<div className={s.price}>
											<label className={s.td_label} htmlFor="price">
												<input
													onChange={(e) =>
														handleChangeDataArr(ind, 'price', Number(e.target.value))
													}
													placeholder="$0.00"
													className={s.input}
													id="price"
													type="number"
												/>
											</label>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={s.footer}>
				<button onClick={() => fetchSendDataArr()} className={s.btn}>
					Send quote
				</button>
			</div>
		</div>
	);
};
