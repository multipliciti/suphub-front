import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import s from './ShowPhoto.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { classNames } from '@/utils/classNames';
import modal_close from '@/imgs/close.svg';
import Image from 'next/image';

export const ShowPhoto = () => {
	const dispatch = useAppDispatch();
	const img = useAppSelector((state) => state.orderSlice.img);

	return (
		<div className={classNames(s.wrapper)}>
			<span className={s.photo}>
				<span onClick={() => dispatch(setModal(''))} className={s.photo_remove}>
					<Image src={modal_close} alt="img" height={20} width={20} />
				</span>
				{img && (
					<TransformWrapper
						// defaultScale={1}
						// scalePadding={0.05}
						minScale={0.5}
						maxScale={3}
					>
						{({ zoomIn, zoomOut }) => (
							<>
								<TransformComponent>
									<Image
										className={s.photo_img}
										src={img}
										alt="img"
										height={32}
										width={34}
									/>
								</TransformComponent>
								<div className={s.zoom_controls}>
									<button onClick={() => zoomIn()}>Zoom In</button>
									<button onClick={() => zoomOut()}>Zoom Out</button>
								</div>
							</>
						)}
					</TransformWrapper>
				)}
			</span>
		</div>
	);
};
