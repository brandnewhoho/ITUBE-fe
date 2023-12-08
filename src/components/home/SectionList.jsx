import React, { useState, useEffect } from 'react';

import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import ChannelSection from './ChannelSection';
import VideoSection from './VideoSection';

const SectionsList = () => {
	const [user_sections, setUserSections] = useState([]);
	const { isLoggedIn, user_id } = useAuth();

	const fetchUserSections = async () => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				const response = await client.get('/section/' + user_id);

				setUserSections(response.data.user_sections);
			} else {
				console.log('no token');
			}
		} catch (error) {
			console.error('Error fetching user sections:', error);
		}
	};
	useEffect(() => {
		isLoggedIn && fetchUserSections();
	}, [isLoggedIn]);

	console.log('나와라', user_sections);
	console.log('user_sections.length', user_sections.length);

	return (
		<div className='sections-list'>
			{user_sections.length > 0 ? (
				user_sections.map((section) =>
					section.type === 0 ? (
						<VideoSection key={section.id} section={section} />
					) : (
						<ChannelSection key={section.id} section={section} />
					)
				)
			) : (
				<div className='py-50 w-full flex flex-col items-center gap-8 text-2xl '>
					<p className='text-4xl mb-20'> 😍 첫 방문을 환영합니다 😍</p>
					<p className='text-3xl mb-10'>가볍게 즐기는 나만의 유튜브 사용방법</p>
					<p>1. 상단 검색바에서 원하는 키워드로 영상을 검색하세요 </p>
					<p>2. 결과 영상 중 보고 싶은 영상을 클릭하세요</p>
					<p>3. 저장 버튼을 클릭하여 영상이나 채널로 섹션에 저장하세요</p>
				</div>
			)}
		</div>
	);
};

export default SectionsList;
