'use client';
import { useState } from 'react';
import { NoResult } from './NoResult';
import { RFQCarFilters } from './RFQCarFilters';
import { Product } from './Products';
export const RFQCar = () => {
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
		status: [],
	});
	//for btn change request, after we shoud make fetch

	const data = [
		{
			id: 1,
			indificator: 'CSI 08',
			category: 'Doors and Windows',
			quotations: [
				{
					id: 1,
					items: [
						{
							id: 1,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 2,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 3,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
				{
					id: 2,
					items: [
						{
							id: 4,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 5,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 6,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
				{
					id: 3,
					items: [
						{
							id: 7,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 8,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 9,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
			],
			properties: [
				{
					id: 1,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 2,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Selection needed',
						unitbudget: 400.0,
					},
				},
				{
					id: 2,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 0,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Sampling',
						unitbudget: 400.0,
					},
				},
				{
					id: 3,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 0,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Ordered',
						unitbudget: 400.0,
					},
				},
			],
		},
		{
			id: 2,
			indificator: 'CSI 08',
			category: 'Doors and Windows',
			quotations: [
				{
					id: 1,
					items: [
						{
							id: 1,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 2,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 3,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
				{
					id: 2,
					items: [
						{
							id: 4,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 5,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 6,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
				{
					id: 3,
					items: [
						{
							id: 7,
							title: 'Weika',
							price: '$561.90',
						},
						{
							id: 8,
							title: 'GGG',
							price: '$561.90',
						},
						{
							id: 9,
							title: 'Best window',
							price: '$561.90',
						},
					],
				},
			],
			properties: [
				{
					id: 2,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 2,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Selection needed',
						unitbudget: 400.0,
					},
				},
				{
					id: 2,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 0,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Sampling',
						unitbudget: 400.0,
					},
				},
				{
					id: 3,
					items: {
						subtitle: 'CSI 08 37 00',
						title: 'Single hung window',
						chat: 0,
						size: '36” x 60”',
						quantity: 50,
						unit: 'Unit',
						status: 'Ordered',
						unitbudget: 400.0,
					},
				},
			],
		},
	];
	{
		return (
			<div>
				<RFQCarFilters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{data.length < 1 ? <NoResult /> : <Product products={data} />}
			</div>
		);
	}
};
