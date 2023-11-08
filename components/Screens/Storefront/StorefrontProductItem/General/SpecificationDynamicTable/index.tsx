import { FC } from 'react';


import { DynamicAttribute, UpdateDynamicAttribute } from '@/types/products/product';
import { Input } from '@/components/UI/Input';
import { TableSelect } from '@/components/UI/TableSelect';
import {
	ChangeDynamicInputFieldFunction,
	ChangeDynamicSelectFieldFunction,
} from '@/components/Screens/Storefront/StorefrontProductItem/General';


interface Props {
	dynamicAttr: UpdateDynamicAttribute[];
	onChangeSelectField: ChangeDynamicSelectFieldFunction
	onChangeInputField: ChangeDynamicInputFieldFunction
}

export const SpecificationDynamicTable: FC<Props> = (props) => {
	const { dynamicAttr, onChangeSelectField, onChangeInputField } = props;

	const renderRowsInPairs = () => {
		const tableRows = [];

		for (let i = 0; i < dynamicAttr.length; i+=2) {
			const leftPairItem = dynamicAttr[i];

			const leftPairItemJsx = (
				<>
					<td>{leftPairItem.label}</td>
					<td>
						<DynamicItem
							itemAttributes={leftPairItem}
							onChangeSelectField={onChangeSelectField}
							onChangeInputField={onChangeInputField}
						/>
					</td>
				</>
			);

			const isRightPairItemExist = i + 1 < dynamicAttr.length;

			let rightPairItemJsx;

			if (isRightPairItemExist) {
				const rightPairItem = dynamicAttr[i + 1];
				rightPairItemJsx = (
					<>
						<td>{rightPairItem.label}</td>
						<td>
							<DynamicItem
								itemAttributes={rightPairItem}
								onChangeSelectField={onChangeSelectField}
								onChangeInputField={onChangeInputField}
							/>
						</td>
					</>
				);

			} else {
				rightPairItemJsx = (
					<>
						<td></td>
						<td></td>
					</>
				);
			}

			tableRows.push(
				<tr key={i}>
					{leftPairItemJsx}
					{rightPairItemJsx}
				</tr>
			);
		}

		return tableRows;
	}

	return (
		<table>
			<thead>
				<tr>
					<th colSpan={4}>
						Specification
					</th>
				</tr>
			</thead>

			<tbody>
				{renderRowsInPairs()}
			</tbody>
		</table>
	)
}



interface DynamicItemProps {
	itemAttributes: UpdateDynamicAttribute
	onChangeSelectField: ChangeDynamicSelectFieldFunction
	onChangeInputField: ChangeDynamicInputFieldFunction
}

const DynamicItem: FC<DynamicItemProps> = ({ itemAttributes, onChangeSelectField, onChangeInputField }) => {

	const getSelectOptions = (options: DynamicAttribute['options'], type: DynamicAttribute['type']) => {
		const selectOptions: string[] = [];

		options.forEach(item => {
			if (type === 'char') {
				item.charValue && selectOptions.push(item.charValue);
			} else if (type === 'numeric') {
				item.numericValue && selectOptions.push(String(item.numericValue));
			}
		});
		return selectOptions;
	};

	const getSelectValues = (options: DynamicAttribute['options'], attrValueIds: number[]) => {
		return options.filter(item => attrValueIds.includes(item.id)).map(item => String(item.charValue || item.numericValue));
	}

	switch (itemAttributes.formType) {
		case 'input':
			return (
				<Input
					placeholder={`Enter ${itemAttributes.label.toLowerCase()}`}
					value={itemAttributes.value}
					type={itemAttributes.type === 'numeric' ? 'number' : 'text'}
					onChange={(e) => onChangeInputField({ attrId: itemAttributes.attributeId, value: e.target.value })}
				/>
			);
		case 'select':
			return (
				<TableSelect
					placeholder={`Select ${itemAttributes.label.toLowerCase()}`}
					isMultiple={true}
					options={getSelectOptions(itemAttributes.options, itemAttributes.type)}
					value={getSelectValues(itemAttributes.options, itemAttributes.attrValueIds)}
					setValue={(value) => onChangeSelectField({attrId: itemAttributes.attributeId, type: itemAttributes.type, value})}
				/>
			)
	}
}