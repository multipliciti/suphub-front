'use client';
import { useEffect, useState } from 'react';
import s from './Specs.module.scss';
import { RfqItemGot } from '@/types/services/rfq';
import Image from 'next/image';
import close_icon from '@/imgs/close.svg';
import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';

//!!! Notes
//When the endpoint for the update is available, follow these update steps:

//1 For fields with the "string" type inside the data useState, display it as the default value in the input. Create a handler to handle changes in the fields within the data useState and update accordingly.
//2 For fields without the "string" type, simply add the ability to retrieve elements from the data useState. Create the necessary handler.
//3 After changing the data useState, send it to the ready endpoint.
//!!! Notes
export const Specs = () => {
	const api = Api();
	const [data, setData] = useState<RfqItemGot | null>(null);
	const id = useAppSelector((state) => state.sideBarRequestDetailSlice.rfqId);
	const fetchGetRfq = async (id: number) => {
		try {
			const response = await api.rfq.getRfqOne(id);
			setData(response);
		} catch (error) {
			console.error('fetchGetRfq buyer error', error);
		}
	};

	useEffect(() => {
		if (id !== -1) fetchGetRfq(id);
	}, [id]);

	return (
		<div className={s.wrapper}>
			<div className={s.table_wrapper}>
				<h4 className={s.table_header}>General</h4>
				<table className={s.table}>
					<tbody className={s.body}>
						<tr>
							<td>Product name</td>
							<td>{data?.productName}</td>
						</tr>
						<tr>
							<td>Subcategory</td>
							<td>Windows</td>
						</tr>
						<tr>
							<td>Quantity</td>
							<td>
								{data?.quantity} <span className={s.units}>Units</span>
							</td>
						</tr>
						<tr>
							<td>Budget per unit (USD)</td>
							<td>${data?.budget}</td>
						</tr>
						<tr>
							<td>Required certifications</td>
							<td>
								<div className={s.certifications}>
									{data?.certifications?.split(',').map((el, ind) => {
										return (
											<span className={s.certifications_item} key={ind}>
												{el}
												<Image
													src={close_icon}
													alt="close_icon"
													width={10}
													height={10}
												/>
											</span>
										);
									})}
								</div>
							</td>
						</tr>
						<tr>
							<td>Files</td>
							<td>
								{data &&
									data.documents.length > 0 &&
									data.documents.map((el, ind) => {
										return (
											<a key={ind} className={s.link} href={el.url}>
												{el.name}
											</a>
										);
									})}
								{data && data.documents.length < 1 && (
									<p className={s.title}>Not files</p>
								)}
							</td>
						</tr>
						<tr>
							<td>Product images</td>
							<td>
								{/* if have images  */}
								<div className={s.images}>
									{data &&
										data.images.length > 0 &&
										data.images.map((el, ind) => {
											return (
												<Image
													className={s.img}
													key={ind}
													src={el.url}
													alt="img"
													width={48}
													height={48}
												/>
											);
										})}
								</div>

								{/* if not images  */}
								{data && data.images.length < 1 && <span>Not images</span>}
							</td>
						</tr>
					</tbody>
				</table>
				<div className={s.description}>
					<h3 className={s.description_title}>Description</h3>
					<div className={s.description_body}></div>
				</div>
			</div>
		</div>
	);
};
