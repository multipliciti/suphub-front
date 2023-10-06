'use client';
import { ChangeEvent, useState } from 'react';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './PreShipmentInspection.module.scss';
import test from '@/imgs/Marketplace/Products/Product_test.png';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const PreShipmentInspection = ({ activeDisplay, index }: PropsType) => {
	const [file, setFile] = useState<File | null>(null);
	const photos = [test, test, test, test];

	const [testShow, setTestShow] = useState<boolean>(false);

	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			<span className={s.data}>01/05/2023</span>

			<form className={s.form}>
				{/* choice type */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Freight type</h5>
					</div>
					<div className={classNames(s.block, s.options)}>
						<span className={s.options_type}>Air</span>
						<span className={s.options_type}>Ocean</span>
						<span className={s.options_type}>Truck</span>
					</div>
				</div>
				{/* input amount */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Shipment invoice amount</h5>
						<p className={s.subtitle}>If invoice included shipment, please skip</p>
					</div>
					<div className={s.block}>
						<p className={s.price}>500$</p>
					</div>
				</div>
				{/* pdf */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Upload documents</h5>
						<p className={s.subtitle}>Bill of lading or other freight document</p>
					</div>
					<div className={classNames(s.block, s.pdf)}>
						<div className={s.pdf_description}>
							<>
								<span className={s.pdf_title}>File_Name.pdf</span>
								<span className={s.pdf_size}>6.9 Mb</span>
							</>
						</div>
					</div>
				</div>
				{/* Images */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Upload images</h5>
					</div>
					<div className={classNames(s.block, s.photo)}>
						{photos?.map((el, ind) => {
							return (
								<span className={s.photo_wrapper}>
									<Image
										className={s.photo_img}
										key={ind}
										src={el}
										alt="Image"
										width={60}
										height={60}
									/>
								</span>
							);
						})}
					</div>
				</div>

				<div className={s.buttons}>
					{testShow && (
						<>
							<div className={s.status}>
								<span className={s.status_paid}>Shipment paid</span>
								<span
									onClick={() => setTestShow(!testShow)}
									className={s.status_approved}
								>
									Milestone approved
								</span>
							</div>
						</>
					)}

					{!testShow && (
						<>
							<button onClick={() => setTestShow(!testShow)} className={s.paid}>
								Pay $500.00
							</button>
							<button onClick={() => setTestShow(!testShow)} className={s.send}>
								Approve
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
};
