import Cookies, { parseCookies } from 'nookies';
import { UserApi } from './userApi';
import { AuthApi } from './authService';
import { ProductsApi } from './productsService';
import { sideBarApi } from './sideBarService';
import { ProjectApi } from './projectApi';
import { RfqApi } from './rfqApi';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { RfqOptionApi } from '@/services/rfqOptionApi';
import { SellerCompanyApi } from '@/services/sellerCompanyApi';
import { BuyerCompanyApi } from '@/services/buyerCompanyApi';
import { BankUSA } from '@/services/bankUSA';
import { BankInternational } from '@/services/bankInternational';


export type ApiReturnType = {
	sendFormStepOne(): unknown;
	auth: ReturnType<typeof AuthApi>;
};

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext) => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies();
	const token = cookies.token;

	const instance = axios.create({
		baseURL: API_URL,
		withCredentials: true,
	});

	instance.interceptors.request.use((config) => {
		//@ts-ignore
		const token = Cookies.get('token');
		if (token) {
			config.headers.Authorization = `token=${token}`;
		}
		return config;
	});

	const apis = {
		user: UserApi(instance),
		auth: AuthApi(instance),
		product: ProductsApi(instance),
		sideBar: sideBarApi(instance),
		project: ProjectApi(instance),
		rfq: RfqApi(instance),
		rfqOption: RfqOptionApi(instance),
		sellerCompany: SellerCompanyApi(instance),
		buyerCompany: BuyerCompanyApi(instance),
		bankUSA: BankUSA(instance),
		bankInternational: BankInternational(instance),
	};

	return apis;
};
