'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './ProgressOrder.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import { Deposit } from './Deposit';
import done_icon from '@/imgs/Buyer&Seller/done.svg';
import show_details_icon from '@/imgs/Buyer&Seller/showDetails.svg';

export const ProgressOrder = () => {
	//useRef for wrapper
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	//cteate useRef for everyone steps
	const stepRefs = Array.from({ length: 8 }, (_, index) =>
		useRef<HTMLDivElement | null>(null)
	);
	const [activeDisplay, setActiveDisplay] = useState<number>(0);
	const [activeStep, setActiveStep] = useState<number>(3);
	// States for wrapper height and active progress
	const [heightWrapper, setHeightWrapper] = useState<number>(0);
	const [heightActiveProgress, setHeightActiveProgress] = useState<number>(0);

	// Set the wrapper height
	useEffect(() => {
		if (wrapperRef.current) {
			setHeightWrapper(wrapperRef.current.offsetHeight);
		}
	}, [activeStep, stepRefs]);

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
		}, 300);
	}, [activeDisplay]);

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
							activeStep === 1 && s.step_number_active,
							activeStep > 1 && s.step_number_done
						)}
					>
						{activeStep < 1 ? (
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
								<span>kkdkkdkd</span>
							</span>
							<span
								onClick={() => setActiveDisplay(activeDisplay === 1 ? 0 : 1)}
								className={s.details}
							>
								<span className={s.details_title}>
									{activeDisplay === 1 ? 'Hide details' : 'Show details'}
								</span>
								<Image
									className={classNames(
										s.details_icon,
										activeDisplay === 1 && s.details_icon_active
									)}
									src={show_details_icon}
									alt="toggle_img"
									width={20}
									height={20}
								/>
							</span>
						</div>
						<Deposit activeDisplay={activeDisplay} />
					</div>
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
							activeStep === 2 && s.step_number_active,
							activeStep > 2 && s.step_number_done
						)}
					>
						{activeStep < 2 ? (
							<span>2</span>
						) : (
							<span className={s.step_done}>
								<Image src={done_icon} alt="done_icon" width={16} height={16} />
							</span>
						)}
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
							activeStep === 3 && s.step_number_active,
							activeStep > 3 && s.step_number_done
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
							activeStep === 4 && s.step_number_active,
							activeStep > 4 && s.step_number_done
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
							activeStep === 5 && s.step_number_active,
							activeStep > 5 && s.step_number_done
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
							activeStep === 6 && s.step_number_active,
							activeStep > 6 && s.step_number_done
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
							activeStep === 7 && s.step_number_active,
							activeStep > 7 && s.step_number_done
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
							activeStep === 8 && s.step_number_active,
							activeStep > 8 && s.step_number_done
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
