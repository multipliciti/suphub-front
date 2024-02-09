'use client';
import s from './Sample.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { setSample } from '@/redux/slices/modal';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import arrow from '@/imgs/arrow.svg';
import { Sample } from '@/types/products/product';

export const SampleComponent = ({
	id,
	name,
	price,
	images,
	description,
	quantity,
}: Sample) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState<boolean>(false);

	const addSampleToCart = () => {
		dispatch(setModal('addSampleToCart'));
		dispatch(setSample({ id, quantity, price }));
	};

	return (
		<div className={s.wrapper}>
			<div className={classNames(s.content, open && s.content_open)}>
				<div className={s.header}>
					<span className={s.title}>{name}</span>
					<span className={s.price}>
						<span className={s.price_unit}>
							<span className={s.price_inner}>{price}</span>
							/unit
						</span>
						<Image
							className={classNames(s.price_toggle, open && s.price_toggle_active)}
							onClick={() => setOpen(!open)}
							src={arrow}
							alt="arrow"
							width={24}
							height={24}
						/>
					</span>
				</div>

				<p className={s.description}>{description}</p>

				<div className={classNames(s.choose, open && s.choose_active)}>
					<p className={s.choose_title}>Choose one or few options</p>
					<div className={s.exemples}>
						{images.map((el, ind) => {
							return (
								<div key={ind}>
									<Image
										className={s.exemples_img}
										src={el.url}
										alt="img_"
										width={80}
										height={80}
									/>
									<p className={s.exemples_title}> {el.name} </p>
								</div>
							);
						})}
					</div>
				</div>
				<button onClick={() => addSampleToCart()} className={s.btn}>
					Order sample
				</button>
			</div>
		</div>
	);
};
