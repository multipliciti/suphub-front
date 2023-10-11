'use client';
import s from './Feedback.module.scss';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import star_rate from '@/imgs/Buyer&Seller/star_rate.svg';
import star_rate_active from '@/imgs/Buyer&Seller/star_rate_active.svg';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

interface forDataTupe {
	rate: number;
	feedback: string;
}

export const Feedback = ({ activeDisplay, index }: PropsType) => {
	const [formData, setFormData] = useState<forDataTupe>({
		rate: 0,
		feedback: '',
	});
	const [testShow, setTestShow] = useState<boolean>(false);

	//add text
	const handleAddInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prevState) => {
			return { ...prevState, feedback: e.target.value };
		});
	};

	const handleAddRate = (n: number) => {
		setFormData((prevState) => {
			return { ...prevState, rate: n };
		});
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
					!testShow && activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{/* when should we write a review and send it to the backend */}
				<p className={s.title}>
					Please rate <span className={s.title_active}>Weika Windows</span> and tell
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

				<button onClick={() => setTestShow(true)} className={s.rate_btn}>
					Submit feedback
				</button>
			</div>

			{/* when a review has been sent, we request existing reviews from the backend and display */}
			<div
				className={classNames(
					s.wrapper,
					testShow && activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<div className={classNames(s.feedback_done)}>
					{/* my  */}
					<div className={classNames(s.feedback_item, s.feedback_my)}>
						<p>You gave a feedback:</p>
						<div className={s.feedback_rate}>
							{Array.from({ length: 5 }, (_, index) => (
								<Image
									key={index}
									src={index < formData.rate ? star_rate_active : star_rate}
									alt="star_rate"
									width={32}
									height={32}
								/>
							))}
						</div>
						<p className={classNames(s.feedback_message, s.feedback_message_my)}>
							{formData.feedback}
						</p>
					</div>
					{/* another humen */}
					<div className={s.feedback_item}>
						<p>You received a feedback:</p>
						<div className={s.feedback_rate}>
							{Array.from({ length: 5 }, (_, index) => (
								<Image
									key={index}
									src={index < 5 ? star_rate_active : star_rate}
									alt="star_rate"
									width={32}
									height={32}
								/>
							))}
						</div>
						<p className={s.feedback_message}>
							Example feedback paragraph goes here Example feedback paragraph goes
							here Example feedback paragraph goes here Example feedback paragraph
							goes here. Xao is the best!
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
