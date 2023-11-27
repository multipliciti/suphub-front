import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Project, ProjectType } from '@/types/products/project';
import { ProjectTableInput } from '@/components/Screens/Projects/ProjectsOverview/ProjectsOverviewTable/TableInput';
import { updateProjectName } from '@/redux/slices/projects/projects';
import { setProject } from '@/redux/slices/projects/projectItem';
import { TableSelect } from '@/components/UI/TableSelect';
import { Api } from '@/services';

import s from './ProjectsOverviewTable.module.scss';

type ChangeProjectFieldFunction = <K extends keyof Project>(
	key: K,
	value: Project[K]
) => void;

export const ProjectsOverviewTable: FC = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const project = useAppSelector((state) => state.projectItemSlice.project);

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false);
		}
		if (isError) {
			setIsError(false);
		}
	}, [project]);

	if (!project) {
		return;
	}

	const updateProject = async () => {
		try {
			setIsLoading(true);

			const updatedProject = await api.project.updateProjectById(project.id, {
				name: project.name,
				type: project.type,
				budget: project.budget,
				floorArea: project.floorArea,
				address: project.address,
			});
			dispatch(setProject(updatedProject));
			dispatch(updateProjectName({ id: project.id, name: project.name }));
		} catch (e) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeField: ChangeProjectFieldFunction = (key, value) => {
		dispatch(
			setProject({
				...project,
				[key]: value,
			})
		);
	};

	const onChangeAddressField = (key: string, value: string) => {
		dispatch(
			setProject({
				...project,
				...(project.address
					? {
							address: {
								...project.address,
								[key]: value,
							},
					  }
					: {
							address: {
								street: '',
								state: '',
								city: '',
								country: '',
								zipcode: '',
								[key]: value,
							},
					  }),
			})
		);
	};

	return (
		<div className={s.wrapper}>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>General information</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>Project name</td>

						<ProjectTableInput
							placeholder="Enter project name"
							value={project.name}
							onChange={(e) => onChangeField('name', e.currentTarget.value)}
						/>
					</tr>
					<tr>
						<td>Project type</td>
						<td>
							<TableSelect
								isMultiple={false}
								placeholder={'Select project type'}
								options={['singleFamily', 'custom', 'multifamily'] as ProjectType[]}
								value={[project.type]}
								setValue={(value) => {
									onChangeField('type', value[0] as ProjectType);
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>Budget</td>

						<ProjectTableInput
							type="number"
							placeholder="Enter budget"
							value={project.budget}
							onChange={(e) =>
								onChangeField('budget', Number(e.currentTarget.value))
							}
						/>
					</tr>
					<tr>
						<td>Floor area</td>

						<ProjectTableInput
							type="number"
							placeholder="Enter floor"
							value={project.floorArea}
							onChange={(e) =>
								onChangeField('floorArea', Number(e.currentTarget.value))
							}
						/>
					</tr>
				</tbody>
			</table>

			<table>
				<thead>
					<tr>
						<th colSpan={2}>Address (for delivery)</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>Street address</td>

						<ProjectTableInput
							placeholder="Enter address"
							value={project.address?.street}
							onChange={(e) => onChangeAddressField('street', e.currentTarget.value)}
						/>
					</tr>
					<tr>
						<td>City</td>

						<ProjectTableInput
							placeholder="Enter address"
							value={project.address?.city}
							onChange={(e) => onChangeAddressField('city', e.currentTarget.value)}
						/>
					</tr>
					<tr>
						<td>State</td>

						<ProjectTableInput
							placeholder="Enter address"
							value={project.address?.state}
							onChange={(e) => onChangeAddressField('state', e.currentTarget.value)}
						/>
					</tr>
					<tr>
						<td>Country</td>

						<ProjectTableInput
							placeholder="Enter country"
							value={project.address?.country}
							onChange={(e) =>
								onChangeAddressField('country', e.currentTarget.value)
							}
						/>
					</tr>
					<tr>
						<td>Zip code</td>

						<ProjectTableInput
							placeholder="Enter zip code"
							value={project.address?.zipcode}
							onChange={(e) =>
								onChangeAddressField('zipcode', e.currentTarget.value)
							}
						/>
					</tr>
				</tbody>
			</table>

			<button
				type="submit"
				className={s.button_save}
				onClick={updateProject}
				disabled={isLoading}
			>
				{isLoading ? 'Loading...' : 'Save changes'}
			</button>

			{isError && <div style={{ color: 'red' }}>Something went wrong</div>}
		</div>
	);
};
