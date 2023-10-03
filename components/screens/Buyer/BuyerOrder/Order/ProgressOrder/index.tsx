'use client';
import { useEffect, useRef, useState } from 'react';
import s from './ProgressOrder.module.scss';
import { classNames } from '@/utils/classNames';

export const ProgressOrder = () => {
	//useRef for wrapper
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	//cteate useRef for everyone steps
	const stepRefs = Array.from({ length: 8 }, (_, index) =>
		useRef<HTMLDivElement | null>(null)
	);
	const activeStep = 2;
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

			{stepRefs.map((el, ind) => {
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
			})}

			{/* <div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[0]} className={s.step_number}>
						1
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
						<div className={s.step_data}>01/05/2023</div>{' '}
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
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
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[2]} className={s.step_number}>
						3
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[3]} className={s.step_number}>
						4
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[4]} className={s.step_number}>
						5
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[5]} className={s.step_number}>
						6
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[6]} className={s.step_number}>
						7
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div>

			<div className={s.step}>
				<div className={s.step_wrapper}>
					<span ref={stepRefs[7]} className={s.step_number}>
						8
					</span>
					<div className={s.step_info}>
						<span className={s.step_title}>kkdkkdkd</span>
					</div>
				</div>
			</div> */}
		</div>
	);
};
