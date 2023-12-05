import React, { useState, useEffect } from 'react';

import client from '../api/client';
import { useAuth } from '../context/AuthContext';
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
				<p>No sections found.</p>
			)}
		</div>
	);
};

export default SectionsList;
