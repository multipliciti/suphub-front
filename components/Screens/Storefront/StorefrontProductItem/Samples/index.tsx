'use client';
import { FC, useEffect, useState } from 'react';

import { StorefrontSampleRow } from './SampleRow';
import { TableWrapper } from '@/components/UI/TableWrapper';
import { Spinner } from '@/components/UI/Spinner';
import { Sample } from '@/types/products/sample';
import { Button } from '@/components/UI/Button';
import { Api } from '@/services';

import s from './StorefrontProductItemSamples.module.scss';

interface Props {
	id: number;
}

export const StorefrontProductItemSamples: FC<Props> = ({ id }) => {
	const api = Api();

	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'rejected'>(
		'idle'
	);
	const [samples, setSamples] = useState<Sample[]>([]);

	useEffect(() => {
		fetchSamples();
	}, []);

	const fetchSamples = async () => {
		setStatus('loading');
		try {
			const response = await api.sample.findAllByProductId(id);
			setSamples(response);
			setStatus('success');
		} catch (e) {
			setStatus('rejected');
		}
	};

	const onCreateSample = async () => {
		try {
			const response = await api.sample.create({
				name: 'Untitled',
				description: '',
				price: 0,
				productId: id,
				images: [],
			});
			setSamples((prevState) => [...prevState, response]);
		} catch (e) {
			console.log(e);
		}
	};

	const onDeleteSample = async (id: number) => {
		try {
			await api.sample.delete(id);
			setSamples((prevState) => prevState.filter((item) => item.id !== id));
		} catch (e) {
			console.log(e);
		}
	};

	if (status === 'idle' || status === 'loading') {
		return <Spinner style={{ marginTop: '10%' }} />;
	}

	if (status === 'rejected') {
		return <div>Something went wrong</div>;
	}

	return (
		<div className={s.wrapper}>
			{samples.length > 0 && (
				<TableWrapper>
					<thead>
						<tr>
							<th style={{ width: 50 }}>ID</th>
							<th style={{ width: '25%', minWidth: 100 }}>Sample Name</th>
							<th style={{ minWidth: 100 }}>Description</th>
							<th style={{ minWidth: 135, width: '15%' }}>Unit Price (USD)</th>
							<th style={{ width: '25%' }}>Images</th>
							<th style={{ width: 0 }}></th>
						</tr>
					</thead>

					<tbody>
						{samples
							.sort((a, b) => a.id - b.id)
							.map((item, index) => (
								<StorefrontSampleRow
									key={`${item.id}-${index}`}
									item={item}
									onDelete={() => onDeleteSample(item.id)}
								/>
							))}
					</tbody>
				</TableWrapper>
			)}

			<div>
				<Button variant="outlined" onClick={onCreateSample}>
					Add new Sample
				</Button>
			</div>
		</div>
	);
};
