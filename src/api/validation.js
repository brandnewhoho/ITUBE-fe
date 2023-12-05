// import React from 'react';
// import client from './client';
// import { useAuth } from '../context/AuthContext';

// export default async function validateToken() {
// 	const { login } = useAuth();
// 	try {
// 		const token = localStorage.getItem('token');

// 		if (token) {
// 			const validation = await client.post('/auth/validation', null, {
// 				headers: {
// 					Authorization: 'Bearer ' + token,
// 				},
// 			});
// 			console.log(validation);
// 			if (validation.data.success) {
// 				login(validation.data.nickname);
// 				console.log('login');
// 			}
// 		} else {
// 			console.log('로그인이 필요합니다');
// 		}
// 	} catch (error) {
// 		console.error('token validation error', error);
// 	}
// }
