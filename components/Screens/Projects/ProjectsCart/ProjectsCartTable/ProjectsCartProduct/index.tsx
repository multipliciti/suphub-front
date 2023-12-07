import { FC } from 'react';
import Image from 'next/image';

import s from './ProjectsCartProduct.module.scss';

interface Props {
	imgUrl: string | null | undefined;
	title: string;
	labels: string[];
}

export const ProjectsCartProduct: FC<Props> = ({ imgUrl, title, labels }) => {
	return (
		<div className={s.wrapper}>
			{imgUrl && (
				<div className={s.image}>
					<Image src={imgUrl} alt="product_image" width={48} height={48} />
				</div>
			)}

			<div className={s.info}>
				<h3>{title}</h3>
				{labels.length > 0 && (
					<div className={s.info_labels}>
						{labels.map((item, index) => (
							<span key={`${item}-${index}`}>{item}</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
