import { FC } from 'react';
import Image from 'next/image';

import s from './Performance.module.scss';

import eye2Icon from '@/imgs/Buyer&Seller/eye2.svg';
import star2Icon from '@/imgs/Buyer&Seller/star_2.svg';
import boxIcon from '@/imgs/Buyer&Seller/box.svg';


interface Props {
	views: number
	favorites: number
	projects: number
}

export const StorefrontProductPerformance: FC<Props> = (props) => {
	const { views, favorites, projects } = props;

	return (
		<div className={s.wrapper}>
			<div>
				<Image src={eye2Icon} alt="eye_icon" width={16} height={16}/>
				<span>{views}</span>
				<span>views</span>
			</div>
			<div>
				<Image src={star2Icon} alt="star_icon" width={16} height={16}/>
				<span>{favorites}</span>
				<span>favorites</span>
			</div>
			<div>
				<Image src={boxIcon} alt="box_icon" width={16} height={16}/>
				<span>{projects}</span>
				<span>projects</span>
			</div>
		</div>
	)

}