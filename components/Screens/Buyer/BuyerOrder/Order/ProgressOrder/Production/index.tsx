'use client';
import s from './Production.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import test from '@/imgs/Product/test2.png';
import { useState } from 'react';
interface PropsType {
	activeDisplay: number[];
	index: number;
	rerenderProgress: boolean;
	setRerenderProgress: (n: boolean) => void;
}
export const Production = ({
	activeDisplay,
	index,
	rerenderProgress,
	setRerenderProgress,
}: PropsType) => {
	const [testShow, setTest] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<boolean>(false);
	const [formData, setFormData] = useState<string>('');
	const currentdDate = new Date().toLocaleDateString('en-GB');
	const arrMessages = [
		{
			data: '01/05/2023',
			status: 'new',
			message: 'Production started',
		},
		{
			data: '01/05/2023',
			status: 'new',
			message: 'Production of “Vinyl double pane fixed window” finished',
		},
		{
			data: '01/05/2023',
			status: 'new',
			message:
				'Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished Production of “Vinyl double pane fixed window” finished',
			imgs: [test, test, test, test],
		},
	];

	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			{arrMessages.map((el, ind) => {
				return (
					<div key={ind} className={s.block}>
						<p className={s.status}>
							<span className={s.status_data}>{el.data}</span>
							<span>{el.status}</span>
						</p>
						<p className={s.title}>{el.message}</p>
						{el.imgs && (
							<div className={s.img_wrapper}>
								{el.imgs.map((img, ind) => {
									return (
										<Image
											key={ind}
											className={s.img_item}
											src={test}
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
	);
};
