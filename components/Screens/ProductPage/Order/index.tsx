'use client';
import s from './Order.module.scss';
import imageTest1 from '@/imgs/Product/ImageTest1.png';
import { SampleComponent } from './SampleComponent';
import { classNames } from '@/utils/classNames';
import { User } from '@/types/services/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { ProductItemType } from '@/types/products/product';
import { Sample } from '@/types/products/product';
interface PropsType {
	user: User | null;
	product: ProductItemType;
}

export const Order = ({ user, product }: PropsType) => {
	const dispatch = useAppDispatch();
	const sortedPrices = product.prices
		.slice()
		.sort((a, b) => a.minCount - b.minCount);
	const samples = product.samples;

	return (
		<div className={s.container}>
			{/* if Logauted */}
			<div className={classNames(s.started, !user && s.started_active)}>
				<div className={s.convert}>
					<h3 className={s.convert_title}>Convert to business buyer</h3>
					<p className={s.convert_subtitle}>Become a verified buyer to trade</p>
					<button
						onClick={() => dispatch(setModal('login'))}
						className={s.convert_btn}
					>
						Get started
					</button>
				</div>
			</div>
			{/* Access only to the buyer  */}
			<div
				className={classNames(
					s.started,
					user && user.role === 'seller' && s.started_active
				)}
			>
				<div className={s.convert}>
					<h3 className={s.convert_title}>Convert to business buyer</h3>
					<p className={s.convert_subtitle}>Access only to the buyer</p>
					<button
						onClick={() => dispatch(setModal('login'))}
						className={s.convert_btn}
					>
						Get started
					</button>
				</div>
			</div>
			<div className={s.order}>
				<div className={s.header}>Order Price</div>
				<div className={s.price}>
					{sortedPrices.map((el, ind) => {
						return (
							<p key={ind} className={s.price_row}>
								<span className={s.price_row_key}> {`QTY. ${el.minCount}`} </span>
								<span className={s.price_row_value}>
									${el.value}
									<span className={s.unit}>/ {product.unitOfMeasurement}</span>
								</span>
							</p>
						);
					})}

					<button
						className={s.btn}
						onClick={() => {
							dispatch(setModal('addToRFQCart'));
						}}
					>
						Add to project
					</button>
				</div>
			</div>
			{samples.map((el: Sample, ind: number) => {
				return (
					<div key={ind}>
						<SampleComponent {...el} />
					</div>
				);
			})}
		</div>
	);
};
