'use client';
import { classNames } from '@/utils/classNames';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import close_image from '@/imgs/close.svg';
import s from './IsBuyerSideBarRequestDetail.module.scss';
import { Specs } from './Specs/Specs';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { setRfqId } from '@/redux/slices/sideBars/sideBarRequestDetail';
import { Api } from '@/services';
import { RfqItemGot } from '@/types/services/rfq';
type TypeProps = {
	children: React.ReactNode;
};

interface updateDataInterface {
	subCategoryId: number | null;
	productName: string | null;
	certifications: string | null;
}

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

export const IsBuyerSideBarRequestDetail = ({ children }: TypeProps) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const rfqId = useAppSelector((state) => state.sideBarRequestDetailSlice.rfqId);
	const [navId, setNavId] = useState<number>(1);

	//data states
	const [data, setData] = useState<RfqItemGot | null>(null);
	//dataUpdate to operate the local changed state.
	const [updateData, setUpdateData] = useState<updateDataInterface>({
		subCategoryId: data?.subCategoryId || null,
		productName: data?.productName || null,
		certifications: data?.certifications || null,
	});

	const updateRfqFtch = async (rfqId: number, data: any) => {
		try {
			const response = await api.rfq.updateRfq(rfqId, data);
			setData(response.data);
		} catch (error) {
			console.log('error update rfq:', error);
		}
	};

	//get rfq
	const fetchGetRfq = async (id: number) => {
		try {
			const response = await api.rfq.getRfqOne(id);
			setData(response);
			setUpdateData({
				subCategoryId: null,
				productName: null,
				certifications: null,
			});
		} catch (error) {
			console.error('fetchGetRfq buyer error', error);
		}
	};

	useEffect(() => {
		//!!! for rerender and show correct data we must setData(null)
		setData(null);
		if (rfqId !== -1) fetchGetRfq(rfqId);
	}, [rfqId]);

	return (
		<div className={s.wrapper}>
			{children}
			<div className={classNames(s.sidebar, rfqId !== -1 && s.sidebar_active)}>
				<div className={s.sidebar_wrapper}>
					<div onClick={() => dispatch(setRfqId(-1))} className={s.close_img}>
						<Image src={close_image} alt="close_image" width={15} height={15} />
					</div>
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

					{navId === 1 && (
						<Specs
							data={data}
							setData={setData}
							updateData={updateData}
							setUpdateData={setUpdateData}
						/>
					)}

					<div className={s.update}>
						<button
							onClick={() => updateRfqFtch(rfqId, updateData)}
							className={s.update_btn}
						>
							Update request
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
