import React, { useState } from 'react';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function SaveVideo({ video, channel_id, channel_title }) {
	const [modal_open, setModalOpen] = useState(false);
	const { isLoggedIn, user_id } = useAuth();
	const navigate = useNavigate();
	const [section_list, setSectionList] = useState([]);
	const [type, setType] = useState('');
	console.log('saveVideo start');
	console.log('video', video);

	const handleSaveVideo = async () => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 서비스입니다');
			navigate('/auth/sign_in');
		}
		const response = await client.get('/section/video/' + user_id);
		console.log('get video section list:', response);
		setSectionList(response.data.data);
		setType(0);
		setModalOpen(true);
	};

	const handleSaveChannel = async () => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 서비스입니다');
			navigate('/auth/sign_in');
		}
		const response = await client.get('/section/channel/' + user_id);
		console.log('get channel section list:', response);
		setSectionList(response.data.data);
		setType(1);

		setModalOpen(true);
	};

	return (
		<div className='flex justify-end gap-2 mb-2 wrap-save'>
			<button className='bg-brand2 rounded-full p-2' onClick={handleSaveVideo}>
				영상저장
			</button>
			<button
				className='bg-brand2  rounded-full p-2'
				onClick={handleSaveChannel}
			>
				채널저장
			</button>
			<div className='view-modal'>
				{modal_open && (
					<Modal
						setModalOpen={setModalOpen}
						section_list={section_list}
						video={video}
						channel_id={channel_id}
						channel_title={channel_title}
						type={type}
						user_id={user_id}
					/>
				)}
			</div>
		</div>
	);
}
