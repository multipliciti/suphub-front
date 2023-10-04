'use client';
import { useEffect, useRef, useState } from 'react';
import s from './ProgressOrder.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import show_details_icon from '@/imgs/Buyer&Seller/showDetails.svg';

export const ProgressOrder = () => {
	//useRef for wrapper
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	//cteate useRef for everyone steps
	const stepRefs = Array.from({ length: 8 }, (_, index) =>
		useRef<HTMLDivElement | null>(null)
	);
	const [activeStep, setActiveStep] = useState<number>(3);
	// States for wrapper height and active progress
	const [heightWrapper, setHeightWrapper] = useState<number>(0);
	const [heightActiveProgress, setHeightActiveProgress] = useState<number>(0);

	useEffect(() => {
		// Set the wrapper height
		if (wrapperRef.current) {
			setHeightWrapper(wrapperRef.current.offsetHeight);
		}
		// Check for a link to the active step and wrapper
		if (stepRefs[activeStep - 1].current && wrapperRef.current) {
			// Getting the upper limit of the active step relative to the wrapper
			const activeStepTop =
				stepRefs[activeStep - 1].current?.getBoundingClientRect().top;
			// Get the top border of the wrapper relative to the viewport
			const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
			// Setting the height of active progress if activeStepTop is present
			if (activeStepTop) setHeightActiveProgress(activeStepTop - wrapperTop);
		}
	}, [activeStep, stepRefs]);
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

			{/* {stepRefs.map((el, ind) => {
				return (
					<div className={s.step}>
						<div
							className={classNames(
								s.step_wrapper,
								activeStep === ind + 1 && s.step_wrapper_active,
								activeStep > ind + 1 && s.step_wrapper_active
							)}
						>
							<span
								ref={stepRefs[ind]}
								className={classNames(
									s.step_number,
									activeStep === ind + 1 && s.step_number_active
								)}
							>
								{ind + 1}
							</span>
							<div className={s.step_info}>
								<span
									className={classNames(
										s.step_title,
										activeStep === ind + 1 && s.step_title_confirmed,
										activeStep > ind + 1 && s.step_title_confirmed
									)}
								>
									kkdkkdkd
								</span>

								{ind + 1 < 3 && <div className={s.step_data}>01/05/2023</div>}
							</div>
						</div>
					</div>
				);
			})} */}

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
							activeStep === 1 && s.step_number_active
						)}
					>
						1
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 1 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
					<span className={s.details}>
						<span className={s.details_title}>Show details</span>
						<Image src={show_details_icon} alt="toggle_img" width={20} height={20} />
					</span>
				</div>
			</div>

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
							activeStep === 2 && s.step_number_active
						)}
					>
						2
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 2 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 3 && s.step_number_active
						)}
					>
						3
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 3 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 4 && s.step_number_active
						)}
					>
						4
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 4 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 5 && s.step_number_active
						)}
					>
						5
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep === 5 && s.step_title_confirmed,
								activeStep > 5 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 6 && s.step_number_active
						)}
					>
						6
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 6 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 7 && s.step_number_active
						)}
					>
						7
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 7 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>

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
							activeStep === 8 && s.step_number_active
						)}
					>
						8
					</span>
					<div className={s.step_info}>
						<span
							className={classNames(
								s.step_title,
								activeStep >= 8 && s.step_title_confirmed
							)}
						>
							kkdkkdkd
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
