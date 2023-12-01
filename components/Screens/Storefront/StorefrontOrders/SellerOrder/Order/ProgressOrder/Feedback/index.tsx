'use client';
import s from './Feedback.module.scss';
import { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { FeedbackInterface } from '@/types/services/Orders';
import { Api } from '@/services';
import star_rate from '@/imgs/Buyer&Seller/star_rate.svg';
import star_rate_active from '@/imgs/Buyer&Seller/star_rate_active.svg';

interface PropsType {
	orderId: number;
	activeDisplay: number[];
	index: number;
	buyerFeedback: FeedbackInterface | null;
	sellerFeedback: FeedbackInterface | null;
}

interface forDataTupe {
	rate: number;
	feedback: string;
}

export const Feedback = ({
	orderId,
	activeDisplay,
	index,
	buyerFeedback,
	sellerFeedback,
}: PropsType) => {
	const api = Api();
	const [formData, setFormData] = useState<forDataTupe>({
		rate: 0,
		feedback: '',
	});
	const [feedback, setFeedback] = useState<boolean>(false);

	//add text
	const handleAddInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prevState) => {
			return { ...prevState, feedback: e.target.value };
		});
	};
	//add rate
	const handleAddRate = (n: number) => {
		setFormData((prevState) => {
			return { ...prevState, rate: n };
		});
	};

	useEffect(() => {
		//if I have olready sent my feedback
		if (sellerFeedback) {
			setFeedback(true);
		}
	});

	//post feedback
	const patchFeedback = async () => {
		try {
			await api.buyerOrder.orderFeedback({
				id: orderId,
				stars: formData.rate,
				message: formData.feedback,
			});
			setFeedback(true);
		} catch (error) {
			console.error('patchFeedback error:', error);
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
				<p>01/05/2023</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					!feedback && activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{/* when should we write a review and send it to the backend */}
				<p className={s.title}>
					Please rate <span className={s.title_active}>Customer Name</span> and tell
					us about your experience
				</p>

				<div className={s.rate}>
					{Array.from({ length: 5 }, (_, index) => (
						<Image
							onClick={() =>
								handleAddRate(formData.rate === index + 1 ? 0 : index + 1)
							}
							className={s.rate_star}
							key={index}
							src={index < formData.rate ? star_rate_active : star_rate}
							alt="star_rate"
							width={32}
							height={32}
						/>
					))}
				</div>

				<textarea
					onChange={handleAddInputValue}
					placeholder="Enter your feedback (Optional)"
					className={s.rate_feedback}
				></textarea>

				<button
					onClick={() => {
						if (formData.rate > 0) {
							patchFeedback();
						}
					}}
					className={classNames(s.rate_btn, formData.rate > 0 && s.rate_btn_active)}
				>
					Submit feedback
				</button>
			</div>

			{/* when a review has been sent, we request existing reviews from the backend and display */}
			<div
				className={classNames(
					s.wrapper,
					feedback && activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<div className={classNames(s.feedback_done)}>
					{/* my (seller)  */}
					{sellerFeedback && (
						<div className={classNames(s.feedback_item, s.feedback_my)}>
							<p>You gave a feedback:</p>
							<div className={s.feedback_rate}>
								{Array.from({ length: sellerFeedback.stars }, (_, index) => (
									<Image
										key={index}
										src={index < formData.rate ? star_rate_active : star_rate}
										alt="star_rate"
										width={32}
										height={32}
									/>
								))}
							</div>
							{sellerFeedback.message && (
								<p className={classNames(s.feedback_message, s.feedback_message_my)}>
									{sellerFeedback.message}
								</p>
							)}
						</div>
					)}
					{/* another humen ( buyer ) */}
					{buyerFeedback && (
						<div className={s.feedback_item}>
							<p>You received a feedback:</p>
							<div className={s.feedback_rate}>
								{Array.from({ length: buyerFeedback.stars }, (_, index) => (
									<Image
										key={index}
										src={index < 5 ? star_rate_active : star_rate}
										alt="star_rate"
										width={32}
										height={32}
									/>
								))}
							</div>
							{buyerFeedback.message && (
								<p className={s.feedback_message}>{buyerFeedback.message}</p>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
