import Cookies, { parseCookies } from 'nookies';
import { AuthApi } from './authService';
import { ProductsApi } from './productsService';
import { sideBarApi } from './sideBarService';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

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
		//@ts-ignore
		credentials: "include",
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
		auth: AuthApi(instance),
		product: ProductsApi(instance),
		sideBar: sideBarApi(instance)
	};

	return apis;
};
