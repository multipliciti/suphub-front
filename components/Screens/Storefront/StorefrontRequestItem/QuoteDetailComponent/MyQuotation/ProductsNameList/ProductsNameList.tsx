'use client';
import s from './ProductsNameList.module.scss';
import { Api } from '@/services';
import { useEffect, useState } from 'react';

type TypeProps = {
	setFocusedInput: (n: number) => void;
	handleChangeDataArr: (ind: number, key: string, value: any) => void;
	nameContains: string;
	ind: number;
};

export const ProductsNameList = ({
	nameContains,
	setFocusedInput,
	handleChangeDataArr,
	ind,
}: TypeProps) => {
	const api = Api();
	const [projects, setProjects] = useState<any[]>();

	const list = projects?.map((item) => {
		return { name: item.name, id: item.id };
	});

	const objFetchSearch = nameContains
		? {
				name: { contains: nameContains },
		  }
		: null;

	const finalAttrObj = {
		attr: {
			...(objFetchSearch && { ...objFetchSearch }),
		},
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const fetchSellerProject = async () => {
		try {
			const response = await api.sellerProject.getSellerProducts({
				page: 1,
				limit: 100000,
				searchParams: finalJsonString,
			});
			const projects = response.result;
			setProjects(projects);
		} catch (error) {
			console.error('component ProductsNameList getProjects seller error', error);
		}
	};
	useEffect(() => {
		fetchSellerProject();
	}, [nameContains]);

	return (
		<div className={s.wrapper}>
			{list?.map((el, index) => {
				return (
					<div key={index}>
						<p
							onClick={() => {
								setFocusedInput(-1);
								handleChangeDataArr(ind, 'productId', el);
							}}
							className={s.item}
						>
							{el.name}
						</p>
					</div>
				);
			})}
		</div>
	);
};
