// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
// import validator from 'validator';

export default function SignUp() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_check, setPasswordCheck] = useState('');
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
	const [email_err, setEmailError] = useState(false);
	const [email_err_msg, setEmailErrMsg] = useState('');
	const [pw_error, setPwError] = useState(false);
	const [pw_err_msg, setPwErrMsg] = useState('');

	const handleEmail = (e) => {
		if (!emailRegEx.test(e.currentTarget.value)) {
			setEmailError(true);
			setEmailErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setEmailError(false);
			setEmailErrMsg('');
		}
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		if (password !== e.target.value) {
			setPwError(true);
			setPwErrMsg('비밀번호가 일치하지 않습니다.');
		} else {
			setPwError(false);
			setPwErrMsg('');
		}
		setPasswordCheck(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('client');
		if (!email || !password || !name || !nickname) {
			alert('비어 있는 항목을 모두 채워주세요');
			return;
		}
		if (pw_error || email_err) {
			alert('이메일이나 비밀번호에 오류가 있습니다');
			return;
		}
		try {
			const response = await client.post('/auth/sign_up', {
				email,
				password,
				name,
				nickname,
			});
			if (response.data.success) {
				alert('회원가입이 완료되었습니다.');
				navigate('/auth/sign_in');
			} else {
				if (response.data.message) {
					alert(response.data.message);
				}
			}
		} catch (error) {
			alert('회원 등록 중 에러 발생');
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<h2 className='text-2xl font-bold mt-20 mb-6'>회원가입</h2>
			<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
				<input
					type='email'
					placeholder='이메일'
					value={email}
					onChange={handleEmail}
					className='px-5 py-2 rounded text-black outline-brand2 '
				/>
				<p className={!email_err ? 'hidden' : ''}>{email_err_msg}</p>
				<input
					type='password'
					placeholder='비밀번호'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='px-5 py-2 rounded text-black  outline-brand2 '
				/>
				<input
					type='password'
					placeholder='비밀번호 확인'
					value={password_check}
					onChange={handlePassword}
					className='px-5 py-2 rounded text-black  outline-brand2 '
				/>
				<p className={pw_error ? 'text-sm' : 'hidden'}>{pw_err_msg}</p>

				<input
					type='text'
					placeholder='이름'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='px-5 py-2 rounded text-black  outline-brand2 '
				/>
				<input
					type='text'
					placeholder='별명'
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					className='px-5 py-2 rounded text-black outline-brand2'
				/>
				<button
					type='submit'
					className='bg-brand2 text-white p-2 rounded cursor-pointer'
				>
					가입하기
				</button>
			</form>
		</div>
	);
}
