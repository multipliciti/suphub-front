'use client';
import { classNames } from '@/utils/classNames';
import { useEffect, useState } from 'react';
import s from './IsBuyerSideBarRequestDetail.module.scss';
import { RfqItemGot } from '@/types/services/rfq';
import { Api } from '@/services';

type TypeProps = {
	children: React.ReactNode;
	sideBarRequestDetail: boolean;
};

export const IsBuyerSideBarRequestDetail = ({
	sideBarRequestDetail,
	children,
}: TypeProps) => {
	const api = Api();
	const [navId, setNavId] = useState<number>(1);
	const [data, setData] = useState<RfqItemGot | null>(null);
	const btns_nav = [
		{
			label: 'Specs',
			id: 1,
		},
		{
			label: 'Customer Support',
			id: 2,
		},
	];

	const fetchGetRfq = async () => {
		console.log('start getOrders');
		try {
			const response = await api.rfq.getRfqOne(1);
			setData(response);
		} catch (error) {
			console.error('fetchGetRfq buyer error', error);
		}
	};
	console.log('data', data);

	useEffect(() => {
		fetchGetRfq();
	}, []);
	return (
		<div className={s.wrapper}>
			{children}

			<div
				className={classNames(s.sidebar, sideBarRequestDetail && s.sidebar_active)}
			>
				<div className={s.sidebar_wrapper}>
					<h3 className={s.sidebar_title}>Request Detail</h3>
					{/* // */}
					<div className={s.sidebar_nav}>
						{btns_nav.map((el, ind) => {
							return (
								<span
									key={ind}
									onClick={() => setNavId(el.id)}
									className={classNames(
										s.sidebar_nav_item,
										navId === el.id && s.sidebar_nav_item_active
									)}
								>
									{el.label}
								</span>
							);
						})}
					</div>

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
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
