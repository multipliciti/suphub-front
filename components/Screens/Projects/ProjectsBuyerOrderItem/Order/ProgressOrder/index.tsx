'use client';
import { useEffect, useRef, useState } from 'react';
import s from './ProgressOrder.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import { Deposit } from './Deposit';
import { Data } from './Data';
import { Production } from './Production';
import { PreShipmentInspection } from './PreShipmentInspection';
import { PaymentDue } from './PaymentDue';
import { OrderDelivered } from './OrderDelivered';
import { OrderShipped } from './OrderShipped';
import { Feedback } from './Feedback';
import { OrderInterface } from '@/types/services/orders';
import done_icon from '@/imgs/Buyer&Seller/done.svg';
import show_details_icon from '@/imgs/Buyer&Seller/showDetails.svg';

interface TypeProps {
	rerender: boolean;
	setRerender: (b: boolean) => void;
	order: OrderInterface;
	projectId: number;
}

export const ProgressOrder = ({
	order,
	rerender,
	setRerender,
	projectId,
}: TypeProps) => {
	//useRef for wrapper
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	//cteate useRef for everyone steps
	const stepRefs = Array.from({ length: 8 }, (_) =>
		useRef<HTMLDivElement | null>(null)
	);
	//To re-render and recalculate the height of the progress bar
	const [rerenderProgress, setRerenderProgress] = useState<boolean>(false);
	const [activeDisplay, setActiveDisplay] = useState<number[]>([0]);
	const [activeStep, setActiveStep] = useState<number>(1);
	// States for wrapper height and active progress
	const [heightWrapper, setHeightWrapper] = useState<number>(0);
	const [heightActiveProgress, setHeightActiveProgress] = useState<number>(0);

	//Set heightActiveProgress height asynchronously Since the animation (Show details) takes time, determining the height needs to be done after its completion.
	useEffect(() => {
		setTimeout(() => {
			// Check for a link to the active step and wrapper
			if (stepRefs[activeStep - 1].current && wrapperRef.current) {
				const activeStepTop =
					stepRefs[activeStep - 1].current?.getBoundingClientRect().top;
				// Get the top border of the wrapper relative to the viewport
				const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
				// Setting the height of active progress if activeStepTop is present
				if (activeStepTop) setHeightActiveProgress(activeStepTop - wrapperTop);
			}

			// Check for a link to the last step
			if (stepRefs[7]?.current && wrapperRef.current) {
				const lastStepBottom = stepRefs[7].current?.getBoundingClientRect().bottom;
				// Get the bottom border of the wrapper relative to the viewport
				const wrapperBottom = wrapperRef.current.getBoundingClientRect().bottom;
				// Calculate the height from the lowest point of wrapperRef to the last step
				const heightFromLowestPoint = wrapperBottom - lastStepBottom;
				// set the progress height taking into account the difference between the last element and the bottom of the progress
				setHeightWrapper(wrapperRef.current.offsetHeight - heightFromLowestPoint);
			}
		}, 300);
	}, [activeDisplay, rerenderProgress, setRerenderProgress, order, activeStep]);

	//update activeStep
	useEffect(() => {
		switch (order.status) {
			case 'confirmed':
				setActiveStep(1);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'depositWaiting':
				setActiveStep(2);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'inProduction':
				setActiveStep(3);
				setRerenderProgress(!rerenderProgress);
				break;
			// !!! #productionCompleted
			// case 'productionCompleted':
			// 	setActiveStep(3);
			// 	setRerenderProgress(!rerenderProgress);
			// 	break;
			case 'preShipment':
				setActiveStep(4);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'shipped':
				setActiveStep(5);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'paymentWaiting':
				setActiveStep(6);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'delivered': //delivering
				setActiveStep(7);
				setRerenderProgress(!rerenderProgress);
				break;
			case 'completed': //delivered
				setActiveStep(8);
				setRerenderProgress(!rerenderProgress);
				break;
		}
	}, [order]);

	const setActiveDisplayFunction = (n: number) => {
		setActiveDisplay((prevState) => {
			if (prevState.includes(n)) {
				// Select 1 from the array, since it is already present
				return prevState.filter((item) => item !== n);
			} else {
				// Add 1 to the array since it is missing
				return [...prevState, n];
			}
		});
	};

	return (
		<div ref={wrapperRef} className={s.wrapper}>
			<div
				style={{
					height: `${heightWrapper}px`,
				}}
				className={s.progress}
			>
				<div
					className={s.progress_active}
					style={{
						height: `${heightActiveProgress}px`,
					}}
				></div>
			</div>

			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 1 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[0]}
						className={classNames(
							s.step_number,
							activeStep === 1 && s.step_number_active,
							activeStep > 1 && s.step_number_done
						)}
					>
						{activeStep <= 1 ? (
							<span>1</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div className={s.step_info}>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 1 && s.step_title_confirmed
								)}
							>
								<span>Order confirmed</span>
							</span>
						</div>
						<Data date={order.createdAt} />
					</div>
				</div>
			</div>

			{/* step 2 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 2 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[1]}
						className={classNames(
							s.step_number,
							activeStep === 2 && s.step_number_active,
							activeStep > 2 && s.step_number_done
						)}
					>
						{activeStep <= 2 ? (
							<span>2</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 2 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 2 && s.step_title_confirmed
								)}
							>
								<span>Deposit due</span>
							</span>
							{activeStep >= 2 && (
								<span
									onClick={() => setActiveDisplayFunction(2)}
									className={s.details}
								>
									<span className={s.details_title}>
										{activeDisplay.includes(2) ? 'Hide details' : 'Show details'}
									</span>
									<Image
										className={classNames(
											s.details_icon,
											activeDisplay.includes(2) && s.details_icon_active
										)}
										src={show_details_icon}
										alt="toggle_img"
										width={20}
										height={20}
									/>
								</span>
							)}
						</div>
						{activeStep >= 2 && (
							<Deposit
								priceInner={order.depositAmount}
								date={
									activeStep === 2
										? order.updatedAt
										: order.payments?.find((el) => el.type === 'deposit')
												?.createdAt ?? ''
								}
								status={order.status}
								rerenderProgress={rerenderProgress}
								setRerenderProgress={setRerenderProgress}
								index={2}
								price={order.amount}
								projectId={projectId}
								orderId={order.id}
								activeDisplay={activeDisplay}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 3 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 3 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[2]}
						className={classNames(
							s.step_number,
							activeStep === 3 && s.step_number_active,
							activeStep > 3 && s.step_number_done
						)}
					>
						{activeStep <= 3 ? (
							<span>3</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 3 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 3 && s.step_title_confirmed
								)}
							>
								<span>Production</span>
							</span>
							{activeStep >= 3 && (
								<>
									<span
										onClick={() => setActiveDisplayFunction(3)}
										className={s.details}
									>
										<span className={s.details_title}>
											{activeDisplay.includes(3) ? 'Hide details' : 'Show details'}
										</span>
										<Image
											className={classNames(
												s.details_icon,
												activeDisplay.includes(3) && s.details_icon_active
											)}
											src={show_details_icon}
											alt="toggle_img"
											width={20}
											height={20}
										/>
									</span>
								</>
							)}
						</div>
						{activeStep >= 3 && (
							<Production
								date={
									order.production && order.production.length > 0
										? order.production[order.production.length - 1].createdAt
										: order.payments?.find((el) => el.type === 'deposit')
												?.updatedAt ?? ''
								}
								productionStartedDate={
									order.payments?.find((el) => el.type === 'deposit')?.createdAt ??
									''
								}
								productionArr={order.production ? order.production : null}
								status={order.status}
								orderId={order.id}
								rerenderProgress={rerenderProgress}
								setActiveStep={setActiveStep}
								setRerenderProgress={setRerenderProgress}
								index={3}
								activeStep={activeStep}
								activeDisplay={activeDisplay}
								setRerender={setRerender}
								rerender={rerender}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 4 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 4 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[3]}
						className={classNames(
							s.step_number,
							activeStep === 4 && s.step_number_active,
							activeStep > 4 && s.step_number_done
						)}
					>
						{activeStep <= 4 ? (
							<span>4</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 4 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 4 && s.step_title_confirmed
								)}
							>
								<span>Pre-shipment inspection</span>
							</span>
							{activeStep >= 4 && (
								<span
									onClick={() => setActiveDisplayFunction(4)}
									className={s.details}
								>
									<span className={s.details_title}>
										{activeDisplay.includes(4) ? 'Hide details' : 'Show details'}
									</span>
									<Image
										className={classNames(
											s.details_icon,
											activeDisplay.includes(4) && s.details_icon_active
										)}
										src={show_details_icon}
										alt="toggle_img"
										width={20}
										height={20}
									/>
								</span>
							)}
						</div>
						{activeStep >= 4 && (
							<PreShipmentInspection
								///need refactoring?
								date={
									order.delivery?.createdAt ??
									order.payments?.find((el) => el.type === 'delivery')?.updatedAt ??
									''
								}
								activeStep={activeStep}
								delivery={order.delivery ?? null}
								projectId={projectId}
								orderId={order.id}
								index={4}
								activeDisplay={activeDisplay}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 5 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 5 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[4]}
						className={classNames(
							s.step_number,
							activeStep === 5 && s.step_number_active,
							activeStep > 5 && s.step_number_done
						)}
					>
						{activeStep <= 5 ? (
							<span>5</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>
					<div
						className={classNames(
							s.step_info,
							activeStep >= 5 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 5 && s.step_title_confirmed
								)}
							>
								<span>Payment Due</span>
							</span>
							{activeStep >= 5 && (
								<span
									onClick={() => setActiveDisplayFunction(5)}
									className={s.details}
								>
									<span className={s.details_title}>
										{activeDisplay.includes(5) ? 'Hide details' : 'Show details'}
									</span>
									<Image
										className={classNames(
											s.details_icon,
											activeDisplay.includes(5) && s.details_icon_active
										)}
										src={show_details_icon}
										alt="toggle_img"
										width={20}
										height={20}
									/>
								</span>
							)}
						</div>
						{activeStep >= 5 && (
							<PaymentDue
								//need refactoring?
								date={
									activeStep === 5
										? order.payments?.find((el) => el.type === 'delivery')
												?.updatedAt ?? ''
										: activeStep > 5
										  ? order.payments?.find((el) => el.type === 'remaining')
													?.updatedAt ?? ''
										  : ''
								}
								price={order.amount}
								activeStep={activeStep}
								projectId={projectId}
								orderId={order.id}
								index={5}
								activeDisplay={activeDisplay}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 6 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 6 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[5]}
						className={classNames(
							s.step_number,
							activeStep === 6 && s.step_number_active,
							activeStep > 6 && s.step_number_done
						)}
					>
						{activeStep <= 6 ? (
							<span>6</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 6 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 6 && s.step_title_confirmed
								)}
							>
								<span>Order shipped</span>
							</span>
							{activeStep >= 6 && (
								<>
									<span
										onClick={() => setActiveDisplayFunction(6)}
										className={s.details}
									>
										<span className={s.details_title}>
											{activeDisplay.includes(6) ? 'Hide details' : 'Show details'}
										</span>
										<Image
											className={classNames(
												s.details_icon,
												activeDisplay.includes(6) && s.details_icon_active
											)}
											src={show_details_icon}
											alt="toggle_img"
											width={20}
											height={20}
										/>
									</span>
								</>
							)}
						</div>
						{activeStep >= 6 && (
							<OrderShipped
								//refactorind (not have date)!
								date={
									activeStep === 6
										? order.payments?.find((el) => el.type === 'remaining')
												?.updatedAt ?? ''
										: activeStep > 6
										  ? order.delivery?.updatedAt ?? ''
										  : ''
								}
								preparingForShipmentDate={
									order.payments?.find((el) => el.type === 'remaining')?.updatedAt ??
									''
								}
								delivery={order.delivery ?? null}
								index={6}
								activeDisplay={activeDisplay}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 7 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 7 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[6]}
						className={classNames(
							s.step_number,
							activeStep === 7 && s.step_number_active,
							activeStep > 7 && s.step_number_done
						)}
					>
						{activeStep <= 7 ? (
							<span>7</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 7 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 7 && s.step_title_confirmed
								)}
							>
								<span>Order delivered </span>
							</span>
							{activeStep >= 7 && (
								<span
									onClick={() => setActiveDisplayFunction(7)}
									className={s.details}
								>
									<span className={s.details_title}>
										{activeDisplay.includes(7) ? 'Hide details' : 'Show details'}
									</span>
									<Image
										className={classNames(
											s.details_icon,
											activeDisplay.includes(7) && s.details_icon_active
										)}
										src={show_details_icon}
										alt="toggle_img"
										width={20}
										height={20}
									/>
								</span>
							)}
						</div>
						{activeStep >= 7 && (
							<OrderDelivered
								//need refactoring (not date)
								date={
									activeStep === 7
										? order.delivery?.updatedAt ?? ''
										: activeStep > 7
										  ? order.deliveryDate ?? ''
										  : ''
								}
								orderId={order.id}
								activeStep={activeStep}
								index={7}
								activeDisplay={activeDisplay}
								setActiveStep={setActiveStep}
							/>
						)}
					</div>
				</div>
			</div>

			{/* step 8 */}
			<div className={s.step}>
				<div
					className={classNames(
						s.step_wrapper,
						activeStep >= 8 && s.step_wrapper_active
					)}
				>
					<span
						ref={stepRefs[7]}
						className={classNames(
							s.step_number,
							activeStep === 8 && s.step_number_active,
							activeStep > 8 && s.step_number_done
						)}
					>
						{activeStep <= 8 ? (
							<span>8</span>
						) : (
							<Image src={done_icon} alt="done_icon" width={16} height={16} />
						)}
					</span>

					<div
						className={classNames(
							s.step_info,
							activeStep >= 8 && s.step_info_active
						)}
					>
						<div className={s.step_info_inner}>
							<span
								className={classNames(
									s.step_title,
									activeStep >= 8 && s.step_title_confirmed
								)}
							>
								<span>Feedback</span>
							</span>
							{activeStep >= 8 && (
								<span
									onClick={() => setActiveDisplayFunction(8)}
									className={s.details}
								>
									<span className={s.details_title}>
										{activeDisplay.includes(8) ? 'Hide details' : 'Show details'}
									</span>
									<Image
										className={classNames(
											s.details_icon,
											activeDisplay.includes(8) && s.details_icon_active
										)}
										src={show_details_icon}
										alt="toggle_img"
										width={20}
										height={20}
									/>
								</span>
							)}
						</div>
						{activeStep >= 8 && (
							<Feedback
								date={order.deliveryDate ?? ''}
								orderId={order.id}
								buyerFeedback={order.buyerFeedback}
								sellerFeedback={order.sellerFeedback}
								index={8}
								activeDisplay={activeDisplay}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
