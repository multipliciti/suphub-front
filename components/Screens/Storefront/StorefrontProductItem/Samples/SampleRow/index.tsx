'use client';
import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { SampleImageUploadModal } from '../SampleImageUploadModal';
import { useAutosizeTextArea } from '@/components/Hooks/useAutosizeTextArea';
import { ImageUploadButton } from '@/components/UI/ImageUploadButton';
import { ImageListItem } from '@/components/UI/ImageListItem';
import { ModalPortal } from '@/components/Features/ModalPortal';
import { ImageType } from '@/types/products/image';
import { Textarea } from '@/components/UI/Textarea';
import { Sample } from '@/types/products/sample';
import { Input } from '@/components/UI/Input';
import { Api } from '@/services';

import clearIcon from '@/imgs/Buyer&Seller/clear.svg';

import s from './SampleRow.module.scss';

interface Props {
	item: Sample;
	onDelete: () => void;
}

export const StorefrontSampleRow: FC<Props> = ({ item, onDelete }) => {
	const api = Api();

	const [sample, setSample] = useState<Sample>({ ...item });
	const [images, setImages] = useState<ImageType[]>([...item.images]);

	const [isShowImageUploadModal, setIsShowImageUploadModal] = useState(false);

	const textAreaRef = useAutosizeTextArea(sample.description);

	const isFirstRender = useRef(true);

	const debouncedUpdate = debounce(() => {
		onUpdateSample();
	}, 1000);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		debouncedUpdate();
	}, [sample]);

	useEffect(() => {
		return () => {
			debouncedUpdate.cancel();
		};
	}, [debouncedUpdate]);

	const handleSetImages = async (images: ImageType[]) => {
		setImages(images);
	};

	const onUpdateSample = async () => {
		try {
			await api.sample.update(sample.id, {
				name: sample.name,
				description: sample.description,
				price: sample.price,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const onDeleteSampleImage = async (imageId: number) => {
		try {
			await api.sample.deleteImages({ id: item.id, imageIds: [imageId] });
			setImages((prevState) => prevState.filter((item) => item.id !== imageId));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<tr>
			<td></td>
			<td>
				<Input
					style={{ padding: 0 }}
					withFocusBorder={false}
					placeholder="Enter Sample Name"
					value={sample.name}
					onChange={(e) => setSample({ ...sample, name: e.target.value })}
				/>
			</td>
			<td>
				<Textarea
					ref={textAreaRef}
					placeholder="10x10x10, 10lbs"
					value={sample.description}
					onChange={(e) => setSample({ ...sample, description: e.target.value })}
				/>
			</td>
			<td>
				<Input
					style={{ padding: 0 }}
					withFocusBorder={false}
					placeholder="$70.35 per unit"
					type="number"
					value={sample.price === 0 ? undefined : sample.price}
					onChange={(e) => setSample({ ...sample, price: Number(e.target.value) })}
				/>
			</td>
			<td>
				<div className={s.image_list}>
					{images.length > 0 &&
						images.map((item, index) => (
							<ImageListItem
								key={`${item.id}-${index}`}
								url={item.url || ''}
								onDelete={() => onDeleteSampleImage(item.id)}
							/>
						))}

					<ImageUploadButton
						onClick={() => setIsShowImageUploadModal(!isShowImageUploadModal)}
					/>
				</div>

				<ModalPortal
					isOpen={isShowImageUploadModal}
					onHide={() => setIsShowImageUploadModal(false)}
				>
					<SampleImageUploadModal
						onHide={() => setIsShowImageUploadModal(false)}
						sampleId={item.id}
						sampleName={item.name}
						setImages={handleSetImages}
					/>
				</ModalPortal>
			</td>
			<td>
				<div style={{ cursor: 'pointer' }} onClick={onDelete}>
					<Image src={clearIcon} alt="clear_icon" width={16} height={16} />
				</div>
			</td>
		</tr>
	);
};
