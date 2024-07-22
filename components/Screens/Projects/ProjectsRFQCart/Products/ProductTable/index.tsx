import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { TeamMember, TeamMemberActive } from '@/types/services/projectTeam';
import { setRfqId } from '@/redux/slices/sideBars/sideBarRequestDetail';
import UserInitialsAvatar from '@/components/Features/UserInitialsAvatar';
import { RfqItemGot } from '@/types/services/rfq';
import { truncateFileNameEnd } from '@/utils/names';
import { getName } from '@/utils/avatar';
import { Api } from '@/services';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import s from './ProductTable.module.scss';
//imgs
import chevron_down from '@/imgs/ProfileSettings/chevron-down.svg';

interface TypeProps {
	projectId: number;
	properties: RfqItemGot[];
	compress: boolean;
	refreshTable: () => Promise<void>;
}

export const ProductTable = ({
	projectId,
	properties,
	compress,
	refreshTable,
}: TypeProps) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const tableRef = useRef<HTMLTableSectionElement | null>(null);
	const inputBugetRef = useRef<HTMLInputElement | null>(null);

	const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
	const [teamMembers, setTeamMembers] = useState<TeamMemberActive[]>([]);

	const handleSelectTeamMember = async (
		rfqId: number,
		teamMember: TeamMemberActive
	) => {
		await api.projectTeamMember.assignToRFQ(teamMember.memberId, rfqId);
		await refreshTable();
		setDropdownVisible(null);
	};

	const handleIconClick = (e: any, ind: number) => {
		e.stopPropagation();
		setDropdownVisible((prev) => (prev === ind ? null : ind));
	};

	const handleUpdateRfqFetch = async (
		id: number,
		key: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		try {
			await api.rfq.updateRfq(id, { [key]: value });
		} catch (error) {
			console.log('error update rfq:', error);
		}
	};

	const handleUpdateRfqFetchNumberType = async (
		id: number,
		key: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		let data;
		const value = e.target.value.startsWith('$')
			? e.target.value.slice(1)
			: e.target.value;
		data = Number(value);
		if (!isNaN(data) && typeof data === 'number') {
			try {
				await api.rfq.updateRfq(id, { [key]: data });
			} catch (error) {
				console.log('error update rfq:', error);
			}
		}
	};

	const debouncedHandleUpdateRfqFtch = debounce(handleUpdateRfqFetch, 300);

	useEffect(() => {
		return () => debouncedHandleUpdateRfqFtch.cancel();
	}, [debouncedHandleUpdateRfqFtch]);

	useEffect(() => {
		const fetchTeamMembers = async () => {
			try {
				const response = await api.projectTeamMember.getAll(projectId);
				const teamMembers: TeamMemberActive[] = response.filter(
					(member: TeamMember) => member.memberId
				);
				setTeamMembers(teamMembers);
			} catch (error) {
				console.log('error fetch team members:', error);
			}
		};

		fetchTeamMembers();
	}, []);

	return (
		<div className={s.wrapper}>
			<table className={classNames(s.table)}>
				{/* thead */}
				<thead className={s.thead}>
					<tr>
						<th>
							<label htmlFor={s.input_label}>
								<input className={s.input_checkbox} type="checkbox" />
							</label>
						</th>
						<th>Product</th>
						<th>Team</th>
						<th>Size</th>
						<th>Quantity</th>
						<th>Unit</th>
						<th>Status</th>
						<th>Unit Budget</th>
					</tr>
				</thead>
				{/* tbody  */}
				<tbody
					ref={tableRef}
					className={classNames(s.tbody, compress && s.tbody_compress)}
				>
					{properties.map((rfq: RfqItemGot, ind: number) => (
						<tr key={ind}>
							{/* title  */}
							<td>
								<label htmlFor={s.input_label}>
									<input className={s.input_checkbox} type="checkbox" />
								</label>
							</td>
							<td>
								<div className={s.description}>
									<span className={s.subtitle}>CSI {rfq.subCategory.csiCode}</span>
									<p onClick={() => dispatch(setRfqId(rfq.id))} className={s.title}>
										{truncateFileNameEnd(rfq.productName, compress ? 1000 : 20)}
									</p>
								</div>
							</td>
							<td className={s.team_td}>
								<div
									className={s.team_wrapper}
									onClick={(e) => handleIconClick(e, ind)}
								>
									<span className={s.team}>
										{rfq.managerId ? (
											<UserInitialsAvatar
												size="m"
												member={rfq.manager as TeamMemberActive}
											/>
										) : (
											<div className={s.team_avatar}>
												<span className={s.team_avatar_text}>Pick</span>
											</div>
										)}
										<Image
											className={s.team_tag}
											src={chevron_down}
											alt="teamMember logo"
											width={12}
											height={12}
										/>
									</span>
								</div>
								{dropdownVisible === ind && (
									<div className={s.dropdown}>
										{teamMembers.length ? (
											teamMembers.map((teamMember, index) => (
												<div
													className={classNames(
														s.dropdown_row,
														rfq.managerId === teamMember.id &&
															s.dropdown_row_selected
													)}
													key={index}
													onClick={(e) => {
														e.stopPropagation();
														handleSelectTeamMember(rfq.id, teamMember);
													}}
												>
													<UserInitialsAvatar size="m" member={teamMember} />
													<span className={s.dropdown_row_text}>
														{getName(teamMember)}
													</span>
												</div>
											))
										) : (
											<div
												className={s.dropdown_row}
												onClick={() => setDropdownVisible(null)}
											>
												<span
													className={classNames(
														s.dropdown_row_text,
														s.dropdown_row_text_empty
													)}
												>
													No Team Members
												</span>
											</div>
										)}
									</div>
								)}
							</td>
							{/* size  */}
							<td className={s.size}>
								<input
									defaultValue={rfq.size ? rfq.size : 'null'}
									className={s.input}
									onChange={(e) => debouncedHandleUpdateRfqFtch(rfq.id, 'size', e)}
									type="text"
								/>
							</td>
							{/* Quantity  */}
							<td>
								<input
									defaultValue={rfq.quantity ? rfq.quantity : 'null'}
									className={s.input}
									onChange={(e) =>
										handleUpdateRfqFetchNumberType(rfq.id, 'quantity', e)
									}
									type="number"
								/>
							</td>
							{/* Unit  */}
							<td>Unit</td>
							{/* Status  */}
							<td>
								<span
									className={classNames(
										s.status,
										compress && s.status_compress,
										rfq.status === 'draft' && s.status_requested,
										rfq.status === 'requested' && s.status_requested,
										rfq.status === 'selectionNeeded' && s.status_selectionNeeded,
										rfq.status === 'ordered' && s.status_ordered,
										rfq.status === 'inCart' && s.status_inCart
									)}
								>
									{rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
								</span>
							</td>
							{/* Unit Budget  */}
							<td>
								<input
									ref={inputBugetRef}
									defaultValue={`$` + `${rfq.budget}`}
									className={s.input}
									onChange={(e) =>
										handleUpdateRfqFetchNumberType(rfq.id, 'budget', e)
									}
									// type="string" because I don’t know how to put the dollar at the beginning of the default state for the number type
									type="string"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
