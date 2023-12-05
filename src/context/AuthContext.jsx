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
		try {
			const token = localStorage.getItem('token');
			console.log('2');
			if (token) {
				console.log('3');
				const isValidToken = await client.post('/auth/validation', null, {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				});
				console.log(isValidToken);
				if (isValidToken.data.success) {
					login(isValidToken.data.nickname, isValidToken.data.user_id);
					console.log('login');
				}
			} else {
				console.log('로그인이 필요합니다');
			}
		} catch (error) {
			console.error('token validation error', error);
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

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
