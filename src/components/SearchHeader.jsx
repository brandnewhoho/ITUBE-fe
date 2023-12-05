import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function SearchHeader() {
	const { isLoggedIn, nickname, logout } = useAuth();

	const { keyword } = useParams();
	const navigate = useNavigate();
	const [text, setText] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/videos/${text}`);
	};

	useEffect(() => setText(keyword || ''), [keyword]);
	console.log('header isLoggedIn', isLoggedIn);
	console.log('header nickname', nickname);
	return (
		<header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4 items-center'>
			<Link to='/home' className='flex items-center'>
				<BsYoutube className='text-4xl text-brand2' />
				<h1 className='font-bold ml-2 text-3xl'>Itube</h1>
			</Link>
			<form className='w-full flex justify-center' onSubmit={handleSubmit}>
				<input
					className='w-7/12 p-2 outline-none bg-black text-gray-50'
					type='text'
					placeholder='Search...'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button className='bg-zinc-600 px-4'>
					<BsSearch />
				</button>
			</form>
			<div className={isLoggedIn ? 'hidden' : 'flex'}>
				<Button name='LogIn' handleClick={() => navigate('/auth/log_in')} />
				<Button name='SignUp' handleClick={() => navigate('/auth/sign_up')} />
			</div>
			<div className={!isLoggedIn ? 'hidden' : 'flex items-center gap-2'}>
				<p className='whitespace-nowrap text-sm'>{nickname}님 반갑습니다!</p>
				<Button name='LogOut' handleClick={() => logout(nickname)} />
			</div>
		</header>
	);
}
