'use client';
import s from './Requirements.module.scss';

export const Requirements = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.general}>
				<div className={s.general_header}>General</div>
				<table className={s.table}>
					<tbody className={s.tbody}>
						<tr>
							<td>Product name</td>
							<td>firnrfionefronrfi</td>
						</tr>
						<tr>
							<td>Quantity</td>
							<td>
								100 <span className={s.utils}>Units</span>
							</td>
						</tr>
						<tr>
							<td>Size</td>
							<td>30”x50”</td>
						</tr>
						<tr>
							<td>Budget per unit (USD)</td>
							<td>$58.00</td>
						</tr>
						<tr>
							<td>Required certifications</td>
							<td>NFRC, AAMA</td>
						</tr>
						<tr>
							<td>Files</td>
							<td>firnrfionefronrfi</td>
						</tr>
						<tr>
							<td>Product images</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={s.description}>
				<div className={s.description_header}>Description</div>
				<div className={s.description_body}></div>
			</div>
		</div>
	);
};
