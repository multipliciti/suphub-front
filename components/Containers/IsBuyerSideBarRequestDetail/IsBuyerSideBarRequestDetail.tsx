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
import { categoriesToSubCategories } from '@/utils/categoriesToSubCategories';
import { CategoryItem } from '@/types/sideBar';
import { Spinner } from '@/components/UI/Spinner';

type TypeProps = {
	children: React.ReactNode;
};

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
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [navId, setNavId] = useState<number>(1);

	//category
	const [category, setCategory] = useState<CategoryItem[]>([]);
	const subCategories = categoriesToSubCategories(category);
	//data states
	const [data, setData] = useState<RfqItemGot | null>(null);

	const updateRfqFtch = async (rfqId: number, data: any) => {
		try {
			setIsLoading(true);
			const response = await api.rfq.updateRfq(rfqId, data);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log('error update rfq:', error);
		}
	};

	//get rfq
	const fetchGetRfq = async (id: number) => {
		try {
			setIsLoading(true);
			const response = await api.rfq.getRfqOne(id);
			setData(response);
			setIsLoading(false);
		} catch (error) {
			console.error('fetchGetRfq buyer error', error);
		}
	};

	const getCategory = async () => {
		try {
			const category = await api.category.getCategories();
			setCategory(category);
		} catch (error) {
			console.error('error submit get category RFQ', error);
		}
	};

	useEffect(() => {
		getCategory();
		if (rfqId !== -1) fetchGetRfq(rfqId);
		//!!! for rerender and show correct data must setData(null)
		if (rfqId === -1) setData(null);
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

					<>
						{isLoading && (
							<div className={s.spinner}>
								<Spinner />
							</div>
						)}

						{!isLoading && (
							<>
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
										rfqId={rfqId}
										subCategories={subCategories}
										setIsLoading={setIsLoading}
										data={data}
										setData={setData}
									/>
								)}

								<div className={s.update}>
									<button
										onClick={() => updateRfqFtch(rfqId, data)}
										className={s.update_btn}
									>
										Update request
									</button>
								</div>
							</>
						)}
					</>
				</div>
			</div>
		</div>
	);
};
