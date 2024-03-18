'use client';
import s from './OrderConfirmation.module.scss';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import { Api } from '@/services';

interface PropsType {
	activeDisplay: number[];
	index: number;
	id: number;
	totalSum: number;
	activeStep: number;
	setActiveStep: (n: number) => void;
}

export const OrderConfirmation = ({
	id,
	activeDisplay,
	index,
	totalSum,
	activeStep,
	setActiveStep,
}: PropsType) => {
	const api = Api();
	const [percentageAmount, setPercentageAmount] = useState<number | null>(null);
	const [isBlockedSubmission, setIsBlockedSubmission] = useState<boolean>(
		activeStep >= 2 || false
	);
	const isActive = !isBlockedSubmission && Boolean(percentageAmount);

	function prettifyNumber() {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
		}).format(totalSum * (percentageAmount ? percentageAmount / 100 : 1));
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value: string | number = event.target.value.replace(/\D/g, '');

		if (!value) {
			setPercentageAmount(null);
			return;
		}

		if (+value < 1) {
			value = 1;
		} else if (+value > 100) {
			value = 100;
		}

		setPercentageAmount(+value);
	};

	const changeStatusDepositWaiting = async () => {
		try {
			await api.sellerOrder.changeStatus({
				id,
				status: 'depositWaiting',
			});
			setActiveStep(2);
		} catch (error) {
			console.error('changeStatusDepositWaiting error:', error);
		}
	};

	const handleDecline = () => {
		setPercentageAmount(null);
	};

	const handleConfirm = async () => {
		try {
			const amount = totalSum * (percentageAmount ? percentageAmount / 100 : 1);
			await api.sellerOrder.setDeposit(id, amount);
			await changeStatusDepositWaiting();
			setIsBlockedSubmission(true);
		} catch (e) {
			console.error('fetchOrderPay error:', e);
		}
	};

	return (
		<>
			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<p className={s.message_info}>What is the deposit amount?</p>
				<div className={s.wrapper_control}>
					<div className={s.input_wrapper}>
						<div className={s.input_percentage_wrapper}>
							<input
								disabled={isBlockedSubmission}
								className={s.input_percentage}
								maxLength={3}
								value={percentageAmount ? percentageAmount : ''}
								onChange={handleChange}
								type="text"
								placeholder="100"
								min="1"
								max="100"
								pattern="[0-9]*"
							/>
							<div className={s.input_percentage_prefix}>%</div>
						</div>
						<div className={s.input_amount_wrapper}>
							<div className={s.input_amount_prefix}>$</div>
							<input className={s.input_amount} disabled value={prettifyNumber()} />
						</div>
					</div>
					<div className={s.wrapper_control_buttons}>
						<button
							className={classNames(
								s.button_decline,
								isActive && s.button_decline_active
							)}
							onClick={!isBlockedSubmission ? handleDecline : () => null}
						>
							Decline order
						</button>
						<button
							className={classNames(
								s.button_confirm,
								isActive && s.button_confirm_active
							)}
							onClick={!isBlockedSubmission ? handleConfirm : () => null}
						>
							Confirm order
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
