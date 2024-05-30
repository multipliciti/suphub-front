'use client';
import s from './Files.module.scss';
import { RfqFile, RfqItemGot } from '@/types/services/rfq';
import { Menu, File } from './components';
import { useState } from 'react';

interface PropTypes {
	rfqId: number;
	data: RfqItemGot | null;
	setIsLoading: (n: boolean) => void;
	setData: React.Dispatch<React.SetStateAction<any>>;
}
export const Files = ({ rfqId, data, setData, setIsLoading }: PropTypes) => {
	const [searchTerm, setSearchTerm] = useState('');

	const files = [...(data?.documents ?? []), ...(data?.images ?? [])];
	const filteredFiles = files.filter((file: RfqFile) =>
		file.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className={s.wrapper}>
			<Menu
				setData={setData}
				setIsLoading={setIsLoading}
				rfqId={rfqId}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			{filteredFiles.length ? (
				filteredFiles.map((file: RfqFile) => {
					return (
						<File
							key={file.key}
							file={file}
							setData={setData}
							setIsLoading={setIsLoading}
							rfqId={rfqId}
						/>
					);
				})
			) : (
				<div className={s.file_description_empty}>
					No files have been uploaded yet.
				</div>
			)}
		</div>
	);
};
