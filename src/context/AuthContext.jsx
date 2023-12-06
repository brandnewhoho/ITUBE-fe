import { createContext, useContext, useEffect, useState } from 'react';
import client from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [nickname, setNickname] = useState('');
	const [user_id, setUserId] = useState('');

	useEffect(() => {
		tokenValidationCheck();
	}, []);

	async function tokenValidationCheck() {
		const token = localStorage.getItem('token');
		console.log('1       token', token);
		if (token) {
			console.log('2');
			try {
				const isValidToken = await client.get('/auth/validation', {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				});
				console.log('토큰 검사 결과', isValidToken);
				if (isValidToken.data.success) {
					login(isValidToken.data.nickname, isValidToken.data.user_id);
					console.log('login');
				} else {
					console.log('로그인이 필요합니다');
				}
			} catch (error) {
				console.log('토큰 검사 요청 시 오류', error);
			}
		} else {
			console.log('로그인이 필요합니다');
		}
	}
	const login = (nickname, user_id) => {
		setNickname(nickname);
		setUserId(user_id);
		setIsLoggedIn(true);
	};

	const logout = () => {
		setNickname('');
		setUserId('');
		setIsLoggedIn(false);
		if (localStorage.getItem('token')) {
			localStorage.removeItem('token');
			alert(`${nickname}님 로그아웃 되셨습니다.`);
		}
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, user_id, nickname, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
