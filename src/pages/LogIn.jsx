// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
// import validator from 'validator';

export default function LogIn() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [err_msg, setErrMsg] = useState('');
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

	const emailCheck = (e) => {
		setEmail(e.target.value);
		if (!emailRegEx.test(e.currentTarget.value)) {
			setErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setErrMsg('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await client.post('/auth/sign_in', {
				email,
				password,
			});
			const { success, nickname, message, token, user_id } = response.data;
			if (success) {
				localStorage.setItem('token', token);
				alert(`${nickname}님 로그인 되었습니다`);
				login(nickname, user_id);
				navigate('/home');
			} else {
				alert(message);
			}
		} catch (error) {
			alert('로그인 중 Error:', error);
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<h2 className='text-2xl font-bold mb-4'>로그인</h2>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<input
					type='email'
					placeholder='이메일'
					value={email}
					onChange={emailCheck}
					className='px-5 py-2 rounded text-black outline-brand2 '
				/>
				<p className={!err_msg ? 'hidden' : 'text-sm'}>{err_msg}</p>
				<input
					type='password'
					placeholder='비밀번호'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='px-5 py-2 rounded text-black outline-brand2 outline-offset-0'
				/>
				<button
					type='submit'
					className='bg-brand2 text-white p-2 rounded cursor-pointer'
				>
					로그인
				</button>
			</form>
		</div>
	);
}
