'use client';
import { useRouter } from 'next/navigation';
import { setPhotoShow } from '@/redux/slices/Order/order';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';
import Image from 'next/image';
import s from './PreShipmentInspection.module.scss';
import { Delivery } from '@/types/services/orders';
import { Api } from '@/services';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	delivery: Delivery | null;
	orderId: number;
	projectId: number;
	activeDisplay: number[];
	activeStep: number;
	index: number;
}

export const PreShipmentInspection = ({
	date,
	activeDisplay,
	activeStep,
	index,
	delivery,
	orderId,
	projectId,
}: PropsType) => {
	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;
	const dispatch = useAppDispatch();
	const { push } = useRouter();
	const api = Api();

	const optionsArr = [
		{ id: 1, title: 'Air', value: 'air', active: false },
		{ id: 2, title: 'Ocean', value: 'ocean', active: true },
		{ id: 3, title: 'Truck', value: 'truck', active: false },
	];

	const fetchOrderPay = async () => {
		const data = {
			orderId,
			amount: delivery?.amount ? delivery?.amount * 100 : 0,
			type: 'delivery',
			successUrl: `${HOST}/projects/${projectId}/order/${orderId}`,
			cancelUrl: `${HOST}/projects/${projectId}/order/${orderId}`,
		};
		try {
			const response = await api.buyerOrder.orderPay(data);
			push(response.data.url);
		} catch (error) {
			console.error('fetchOrderPay error:', error);
		}
	};

	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>{formatDateString(date)}</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<span className={s.data}>{formatDateString(date)}</span>
				{/* if has not a delivery */}
				<div className={s.not_delivery}>Waiting for customer approval</div>

				{/* if has a delivery */}
				{delivery && (
					<form className={s.form}>
						{/* choice type */}
						<div className={s.form_chapter}>
							<div className={s.block}>
								<h5 className={s.title}>Freight type</h5>
							</div>

							<div className={classNames(s.block, s.options)}>
								{optionsArr.map((option, ind) => {
									return (
										<span
											key={ind}
											className={classNames(
												s.options_type,
												option.value === delivery.type && s.options_type_active
											)}
										>
											{option.title}
										</span>
									);
								})}
							</div>
						</div>
						{/* input amount */}
						<div className={s.form_chapter}>
							<div className={s.block}>
								<h5 className={s.title}>Shipment invoice amount</h5>
								<p className={s.subtitle}>
									If invoice included shipment, please skip
								</p>
							</div>
							<div className={s.block}>
								<p className={s.price}>{delivery.amount}$</p>
							</div>
						</div>
						{/* pdf */}
						{delivery && delivery.documents && delivery.documents.length > 0 && (
							<>
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Upload documents</h5>
										<p className={s.subtitle}>
											Bill of lading or other freight document
										</p>
									</div>
									<div className={classNames(s.block, s.pdf)}>
										<div className={s.pdf_description}>
											{delivery.documents.map((file, ind: number) => {
												return (
													<a
														key={ind}
														className={s.pdf_link}
														href="https://suphub-dev.s3.amazonaws.com/order-uploads/3/1e223d30-b3c8-4330-ae43-5346cb92266a.pdf"
														download
													>
														{file.name}
													</a>
												);
											})}
										</div>
									</div>
								</div>
							</>
						)}
						{/* Images */}
						{delivery.images.length > 0 && (
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Upload images</h5>
								</div>
								<div className={classNames(s.block, s.photo)}>
									{delivery.images.map((image: any, ind) => {
										return (
											<span key={ind} className={s.photo_wrapper}>
												<Image
													onClick={() => {
														dispatch(setPhotoShow(image.url));
														dispatch(setModal('showPhoto'));
													}}
													className={s.photo_img}
													key={ind}
													src={image.url}
													alt="Image"
													width={60}
													height={60}
												/>
											</span>
										);
									})}
								</div>
							</div>
						)}

						<div className={s.buttons}>
							{activeStep >= 5 && (
								<>
									<div className={s.status}>
										<span className={s.status_paid}>Shipment paid</span>
									</div>
								</>
							)}

							{activeStep < 5 && (
								<>
									<button
										onClick={(event) => {
											event.preventDefault();
											if (delivery) {
												fetchOrderPay();
											}
										}}
										className={s.paid}
									>
										Pay ${delivery?.amount}
									</button>
								</>
							)}
						</div>
					</form>
				)}
			</div>
		</>
	);
};
