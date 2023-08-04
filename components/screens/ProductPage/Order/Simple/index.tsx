'use client';
import s from './Simple.module.scss';
import Image, { StaticImageData } from 'next/image';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import arrow from '@/imgs/arrow.svg';

interface TypeProps {
	id: number;
	title: string;
	price: number;
	exemples: {
		id: number;
		title: string;
		img: StaticImageData;
	}[];
}

export const Simple = ({ id, title, price, exemples }: TypeProps) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_text}>Simple {id}</span>
				<Image
					className={classNames(s.header_toggle, open && s.header_toggle_active)}
					onClick={() => setOpen(!open)}
					src={arrow}
					alt="arrow"
					width={24}
					height={24}
				/>
			</div>
			<div className={classNames(s.content, open && s.content_open)}>
				<div className={s.description}>
					<span className={s.title}>{title}</span>
					<span className={s.price}>
						{price}
						<span className={s.unit}>/unit</span>
					</span>
				</div>

				<p className={s.size}>10x10x10 in, 10 lbs</p>

				<div className={classNames(s.choose, open && s.choose_active)}>
					<p className={s.choose_title}>Choose one or few options</p>
					<div className={s.exemples}>
						{exemples.map((el, ind) => {
							return (
								<div key={ind}>
									<Image
										className={s.exemples_img}
										src={el.img}
										alt="img_"
										width={80}
										height={80}
									/>
									<p className={s.exemples_title}> {el.title} </p>
								</div>
							);
						})}
					</div>
				</div>
				<button className={s.btn}>Order sample</button>
			</div>
		</div>
	);
};
