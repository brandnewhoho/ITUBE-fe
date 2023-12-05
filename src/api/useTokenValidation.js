// // import React from 'react';
// // import client from './client';
// // import { useAuth } from '../context/AuthContext';

// // export default async function validation() {
// // 	const { login } = useAuth();
// // 	try {
// // 		const token = localStorage.getItem('token');
// // 		if (token) {
// // 			const validation = await client.post('/validation', {
// // 				Authorization: 'Bearer ' + token,
// // 			});
// // 			console.log('validation', validation);
// // 			validation.success && login(validation.nickname);
// // 		}
// // 		console.log('로그인이 필요합니다');
// // 	} catch (error) {
// // 		console.log('validation error');
// // 	}
// // }

// // useTokenValidation.js
// import { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import validateToken from './api/validation';

// const useTokenValidation = () => {
// 	const { isLoggedIn, login, logout } = useAuth();

// 	useEffect(() => {
// 		const storedToken = localStorage.getItem('token');

// 		if (storedToken) {
// 			validateToken(storedToken)
// 				.then((validation) => {
// 					if (validation.success) {
// 						login(validation.nickname);
// 					} else {
// 						// logout();
// 						console.log('토큰이 유효하지 않습니다.');
// 					}
// 				})
// 				.catch((error) => {
// 					console.error('토큰 유효성 검사 중 오류:', error);
// 				});
// 		}
// 	}, [login, logout]);
// };

// export default useTokenValidation;
