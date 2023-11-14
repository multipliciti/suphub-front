'use client';
import s from './VinylDouble.module.scss';
import skelet_icon from '@/imgs/skelet.png';
import Image from 'next/image';

export const VinylDouble = () => {
	const dataExample = {
		size: '48”x48”',
		quantity: 100,
		unit: 58.0,
		certifications: 'NRFC, AAMA',
	};

	return (
		<div className={s.wrapper}>
			<p className={s.title}> Vinyl double pane window</p>
			<div className={s.info}>
				<Image
					className={s.info_img}
					src={skelet_icon}
					alt="skelet_icon"
					width={184}
					height={176}
				/>
				<table className={s.info_table}>
					<tbody>
						<tr className={s.info_table_row}>
							<td className={s.info_table_key}>Size</td>
							<td className={s.info_table_value}>{dataExample.size}</td>
						</tr>
						<tr className={s.info_table_row}>
							<td className={s.info_table_key}>Quantity</td>
							<td className={s.info_table_value}>{dataExample.quantity} Units</td>
						</tr>
						<tr className={s.info_table_row}>
							<td className={s.info_table_key}>Budget per unit (USD)</td>
							<td className={s.info_table_value}>{dataExample.unit}</td>
						</tr>
						<tr className={s.info_table_row}>
							<td className={s.info_table_key}>Required certifications</td>
							<td className={s.info_table_value}>{dataExample.certifications}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={s.imgs}>
				<Image
					className={s.imgs_img}
					src={skelet_icon}
					alt="skelet_icon"
					width={64}
					height={60}
				/>
				<Image
					className={s.imgs_img}
					src={skelet_icon}
					alt="skelet_icon"
					width={64}
					height={60}
				/>
				<Image
					className={s.imgs_img}
					src={skelet_icon}
					alt="skelet_icon"
					width={64}
					height={60}
				/>
			</div>
			<div className={s.files}>
				<div className={s.files_header}>Files</div>
				<div className={s.files_content}>
					<span className={s.files_content_file}>
						<p className={s.files_content_name}>Drawing.pdf</p>
						<span className={s.files_content_size}>5.1 Mb</span>
					</span>
					<span className={s.files_content_file}>
						<p className={s.files_content_name}>Document.pdf</p>
						<span className={s.files_content_size}>0.89 Mb</span>
					</span>
				</div>
			</div>

			<div className={s.comments}>
				<div className={s.comments_header}>Additional Comments</div>
				<div className={s.comments_content}></div>
			</div>
		</div>
	);
};
