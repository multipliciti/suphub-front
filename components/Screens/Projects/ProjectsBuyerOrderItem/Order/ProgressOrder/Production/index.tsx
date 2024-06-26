'use client';
import s from './Production.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { setPhotoShow } from '@/redux/slices/Order/order';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { Api } from '@/services';
import { ProductionItem } from '@/types/services/orders';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	setRerender: (b: boolean) => void;
	rerender: boolean;
	date: string;
	productionStartedDate: string;
	activeDisplay: number[];
	activeStep: number;
	index: number;
	orderId: number;
	status: string;
	rerenderProgress: boolean;
	setActiveStep: (n: number) => void;
	setRerenderProgress: (n: boolean) => void;
	productionArr: ProductionItem[] | null;
}

// !!! 1. We need to implement the ability for the seller to send SMS messages.
// !!! 2. Perhaps we should remove the "productionCompleted" status since we removed the "approve" button from the buyer's side.
// !!! find tag #productionCompleted

export const Production = ({
	setRerender,
	rerender,
	date,
	productionStartedDate,
	activeDisplay,
	index,
	status,
	activeStep,
	setActiveStep,
	rerenderProgress,
	setRerenderProgress,
	orderId,
	productionArr,
}: PropsType) => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [newMessage, setNewMessage] = useState<boolean>(false);
	const [formData, setFormData] = useState<string>('');
	const currentdDate = new Date().toLocaleDateString('en-GB');

	const addOrderProduction = async (updates: string) => {
		const formDataSend = new FormData();
		formDataSend.append('orderId', orderId.toString());
		formDataSend.append('updates', updates);
		try {
			await api.sellerOrder.orderProduction(formDataSend);
			setRerenderProgress(!rerenderProgress);
		} catch (error) {
			console.error('addOrderProduction error:', error);
		}
	};

	const changeStatusShipped = async (orderId: number, status: string) => {
		try {
			await api.sellerOrder.changeStatus({
				id: orderId,
				status,
			});
			//close input
			setNewMessage(false);
			//if set success productionCompleted status for local rerender
			setRerender(!rerender);
		} catch (error) {
			console.error('changeStatusShipped error:', error);
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
				<div className={s.block}>
					<span className={s.block_data}>
						{formatDateString(productionStartedDate)}
					</span>
					<span className={s.block_title}>Production started</span>
				</div>
				{productionArr?.map((el, ind) => {
					return (
						<div key={ind} className={s.block}>
							<p className={s.status}>
								<span className={s.status_data}>
									{formatDateString(el.createdAt)}
								</span>
								{/* <span>new</span> */}
							</p>
							<p className={s.title}>{el.updates}</p>
							{el.images.length > 0 && (
								<div className={s.img_wrapper}>
									{el.images.map((img: any, ind) => {
										return (
											<Image
												onClick={() => {
													dispatch(setPhotoShow(img.url));
													dispatch(setModal('showPhoto'));
												}}
												key={ind}
												className={s.img_item}
												src={img.url}
												alt="test"
												width={60}
												height={60}
											/>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
				{/* {sent message} */}
				{/* <>
						<div className={s.block}>
							<div className={s.status}>
								<p className={s.status_data}>{currentdDate}</p>
								<p className={classNames(s.status_test, s.status_gray)}>
									Buyer feedback
								</p>
							</div>
							<p className={s.title}>{formData}</p>
						</div>
					</> */}
				{/* {new message} */}
				<div className={classNames(s.none, newMessage && s.block)}>
					<div className={s.status}>
						<p className={s.status_data}>{currentdDate}</p>
					</div>
					<input
						onChange={(e) => setFormData(e.target.value)}
						placeholder="Enter feedback"
						className={s.block_input}
						name="message"
						id="message"
					/>
				</div>
				{/* buttons */}

				<div className={s.buttons}>
					{/* // !!! Old (we removed approve from buyer) #productionCompleted  */}
					{/* when we click Approve we change ctatus to productionCompleted and shoud show
						"Milestone approved" */}
					{/* {status === 'productionCompleted' && (
						<p className={s.buttons_aproved}>Milestone approved</p>
					)} */}
					{/* // !!! #productionCompleted */}

					{/* {activeStep === 3 && status === 'inProduction' && !newMessage && (
						<>
							<button
								onClick={() => {
									setRerenderProgress(!rerenderProgress);
									setNewMessage(!newMessage);
								}}
								className={s.buttons_left}
							>
								Decline & add feedback
							</button>

							<button
								onClick={() => {
									// #productionCompleted
									// changeStatusShipped(orderId, 'productionCompleted');
									changeStatusShipped(orderId, 'preShipment');
								}}
								className={s.buttons_right}
							>
								Approve
							</button>
						</>
					)}
					{newMessage && (
						<>
							<button
								onClick={() => {
									setRerenderProgress(!rerenderProgress);
									setNewMessage(false);
								}}
								className={s.buttons_left}
							>
								Cancel
							</button>
							<button
								onClick={() => {
									addOrderProduction(formData);
								}}
								className={s.buttons_right}
							>
								Send
							</button>
						</>
					)} */}
				</div>

				{/* if don't step Production done  */}
				{/* {activeStep < 4 && (
					<div className={s.waiting_approved}>Waiting for customer approval</div>
				)} */}
				{/* if step Production done  */}
				{activeStep >= 4 && <div className={s.approved}>Production completed</div>}
			</div>
		</>
	);
};
