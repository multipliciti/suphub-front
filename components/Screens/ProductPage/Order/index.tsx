'use client';
import s from './Order.module.scss';
import imageTest1 from '@/imgs/Product/ImageTest1.png';
import { Simple } from './Simple';
import { classNames } from '@/utils/classNames';
import { User } from '@/types/services/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { ProductItemType } from '@/types/products/product';

interface PropsType {
	user: User | null;
	statusGetUser: 'pending' | 'success' | 'rejected' | 'logouted';
	product: ProductItemType;
}

export const Order = ({ user, statusGetUser, product }: PropsType) => {
	const dispatch = useAppDispatch();
	const sortedPrices = product.prices
		.slice()
		.sort((a, b) => a.minCount - b.minCount);

	const simples = [
		{
			id: 1,
			title: 'Window corner 1',
			price: 70,
		},
		{
			id: 2,
			title: 'Window corner 2',
			price: 70,
		},
	];

	const exempels = [
		{
			id: 1,
			title: 'Beige',
			img: imageTest1,
		},
		{
			id: 2,
			title: 'Blue',
			img: imageTest1,
		},
		{
			id: 3,
			title: 'Green',
			img: imageTest1,
		},
		{
			id: 4,
			title: 'Orange',
			img: imageTest1,
		},
	];

	return (
		<div className={s.container}>
			{/* started */}
			<div
				className={classNames(
					s.started,
					!user && statusGetUser !== 'pending' && s.started_active
				)}
			>
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

			{/* {simples.map((el: any, ind: number) => {
				return (
					<div key={ind}>
						<Simple
							exemples={exempels}
							id={el.id}
							title={el.title}
							price={el.price}
						/>
					</div>
				);
			})} */}
		</div>
	);
};
