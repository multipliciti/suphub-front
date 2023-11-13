'use client';
import s from './SellerSidebar.module.scss';
import { classNames } from '@/utils/classNames';
import { Toggle } from './Toggle';
import { BoxItem } from './BoxItem';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import windows_and_door_icon from '@/imgs/Buyer&Seller/door&windows.svg';
import star_icon from '@/imgs/Buyer&Seller/star.svg';

interface TypeProps {
	setActiveDisplay: (n: number) => void;
}

export const SellerSidebarComponent = ({ setActiveDisplay }: TypeProps) => {
	const isSideBar = useAppSelector((state) => state.sellerSidebarSlice.sideBar);

	const BOX_ITEM_LIST = [
		{
			title: 'RFQ',
			days: 'last 30 days',
			rating_number: '2',
			trend: 'up',
			interest: '20%',
		},
		{
			title: 'Orders',
			days: 'last 30 days',
			rating_number: '0',
			trend: 'up',
			interest: '20%',
		},
		{
			title: 'GMV',
			days: 'last 30 days',
			rating_number: '$5,000.00',
			trend: 'up',
			interest: '20%',
		},
	];
	return (
		<div className={classNames(s.wrapper, isSideBar && s.wrapper_active)}>
			<Toggle />
			<div className={s.wrapper_scroll}>
				<div className={s.wrapper_inner}>
					<div className={classNames(s.content, isSideBar && s.content_active)}>
						<div className={s.box_weika}>
							<Image
								src={windows_and_door_icon}
								alt="windows_and_door_icon"
								width={76}
								height={28}
							/>
							<h5 className={s.box_weika_title}>Weika Windows</h5>
							<div className={s.rating}>
								<span className={s.rating_number}>5.0</span>
								<Image
									className={s.rating_star}
									src={star_icon}
									alt="star_icon"
									width={16}
									height={16}
								/>
								<span className={s.rating_title}>144 Reviews</span>
							</div>
							<p className={s.unverified}>Unverified</p>
						</div>

						{BOX_ITEM_LIST.map((el, ind) => {
							return (
								// toggle click
								<div onClick={() => setActiveDisplay(ind + 1)} key={ind}>
									<BoxItem
										title={el.title}
										days={el.days}
										rating_number={el.rating_number}
										interest={el.interest}
										trend={'up'}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
