'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './OptionsView.module.scss';
import { Api } from '@/services';
import { Option } from '@/types/services/rfq';
import { BackButton } from '@/components/UI/BackButton';
import testProduct from '@/imgs/Product/test2.png';
import Link from 'next/link';

type TypeProps = {
	id: number;
};

export const OptionsView = ({ id }: TypeProps) => {
	const api = Api();
	const [options, setOptions] = useState<Option[]>([]);
	const fetchDetOptions = async (projectId: number) => {
		try {
			const response = await api.rfqOption.getOptionsByRfqId(projectId);
			setOptions(response.data);
		} catch (error) {
			console.error('Error fetchDetOptions options:', error);
		}
	};

	console.log('options', options);
	useEffect(() => {
		fetchDetOptions(id);
	}, []);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Link className={s.header_link} href="/testBuyerRFQ" as={`/testBuyerRFQ`}>
					<BackButton />
				</Link>
				<span className={s.header_close}></span>
				<span className={s.header_title}>Compare - Fixed Window</span>
			</div>
			<div className={s.table_container}>
				{options.length > 0 && (
					<>
						{/* table  */}
						<table className={s.table}>
							<thead className={s.thead}>
								<tr>
									<th>Options</th>
									{options.map((el: any, ind: number) => {
										return <th key={ind}>option {ind + 1}</th>;
									})}
								</tr>
							</thead>
							{/* tbody  */}
							<tbody className={s.tbody}>
								{/* image  */}
								<tr>
									<td>Image</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												<Image
													className={s.img}
													src={testProduct}
													alt="testProduct"
													width={160}
													height={160}
												/>
											</td>
										);
									})}
								</tr>
								{/* Product name  */}
								<tr>
									<td>Product name</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>{el.product.name}</td>;
									})}
								</tr>
								{/* Unit Price  */}
								<tr>
									<td>Unit Price</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td className={s.price} key={ind}>
												${el.price}
											</td>
										);
									})}
								</tr>
								{/* Manufacturer */}
								<tr>
									<td>Manufacturer</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* MOQ */}
								<tr>
									<td>MOQ</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.moq} {el.product.moq > 1 ? ' Units' : ' Unit'}
											</td>
										);
									})}
								</tr>
								{/* Lead time (weeks) */}
								<tr>
									<td>Lead time (weeks)</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.leadTime}
												{el.product.leadTime > 1 ? ' Weeks' : ' Week'}
											</td>
										);
									})}
								</tr>
								{/* Certification */}
								<tr>
									<td>Certification</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* Warranty (years) */}
								<tr>
									<td>Warranty (years)</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.warranty}
												{el.product.warranty > 1 ? ' years' : ' year'}
											</td>
										);
									})}
								</tr>
								{/* Opening Size */}
								<tr>
									<td>Opening Size</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>{el.size}</td>;
									})}
								</tr>
								{/* Material */}
								<tr>
									<td>Material</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* Glazing */}
								<tr>
									<td>Glazing</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* U-factor */}
								<tr>
									<td>U-factor</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								<tr>
									<td></td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												<div className={s.btns}>
													<button className={s.btns_sample}>Order sample</button>
													<button className={s.btns_cart}>Add to cart</button>
												</div>
											</td>
										);
									})}
								</tr>
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
};
