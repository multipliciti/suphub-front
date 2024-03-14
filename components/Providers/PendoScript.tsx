'use client';
import Script from 'next/script';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { initializePendoScript } from '@/utils/initializePendoScript';

export const PendoScript = () => {
	const PENDO_API_KEY = process.env.NEXT_PUBLIC_PENDO_API_KEY;

	const user = useAppSelector((state) => state.authSlice.user);

	useEffect(() => {
		if (user && PENDO_API_KEY) initializePendoScript(user);
	}, [user]);

	if (!PENDO_API_KEY) {
		console.error('PendoScript initialization error: PENDO_API_KEY is not defined');
		return;
	}

	return (
		<Script id="pendo">
			{`(function(apiKey){
  (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
  v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('${PENDO_API_KEY}');`}
		</Script>
	);
};
