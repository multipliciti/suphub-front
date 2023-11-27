'use client';
import s from './Production.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import test from '@/imgs/Product/test2.png';
import { useEffect, useState } from 'react';
import { Api } from '@/services';
import { ProductionMessageInterface } from '@/types/services/Orders';
import { formatDateString } from '@/utils/formatDateString';
interface PropsType {
	activeDisplay: number[];
	index: number;
	orderId: number;
	rerenderProgress: boolean;
	setRerenderProgress: (n: boolean) => void;
}
export const Production = ({
	activeDisplay,
	index,
	rerenderProgress,
	setRerenderProgress,
	orderId,
}: PropsType) => {
	const api = Api();
	const [testShow, setTest] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<boolean>(false);
	const [arrMessages, setArrMessages] = useState<ProductionMessageInterface[]>([]);
	const [formData, setFormData] = useState<string>('');
	const currentdDate = new Date().toLocaleDateString('en-GB');

	const getProductionFetch = async (id: number) => {
		try {
			const order: ProductionMessageInterface[] =
				await api.buyerOrder.getProductionByOrder(id);
			setArrMessages(order);
		} catch (error) {
			console.error('getOrderById buyer error', error);
		}
	};

	useEffect(() => {
		getProductionFetch(orderId);
	}, []);

	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>01/05/2023</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{arrMessages?.map((el, ind) => {
					return (
						<div key={ind} className={s.block}>
							<p className={s.status}>
								<span className={s.status_data}>
									{formatDateString(el.createdAt)}
								</span>
								<span>new</span>
							</p>
							<p className={s.title}>{el.updates}</p>
							{el.images.length > 0 && (
								<div className={s.img_wrapper}>
									{el.images.map((img, ind) => {
										return (
											<Image
												key={ind}
												className={s.img_item}
												src={img}
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
				{formData && testShow && (
					<>
						<div className={s.block}>
							<div className={s.status}>
								<p className={s.status_data}>{currentdDate}</p>
								<p className={classNames(s.status_test, s.status_gray)}>
									Buyer feedback
								</p>
							</div>

							<p className={s.title}>{formData}</p>
						</div>
					</>
				)}

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
					{testShow && <p className={s.buttons_aproved}>Milestone approved</p>}
					{!testShow && !newMessage && (
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
							<button onClick={() => setTest(!testShow)} className={s.buttons_right}>
								Approve
							</button>
						</>
					)}
					{!testShow && newMessage && (
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
									setRerenderProgress(!rerenderProgress);
									setNewMessage(false);
									setTest(!testShow);
								}}
								className={s.buttons_right}
							>
								Send
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
};
