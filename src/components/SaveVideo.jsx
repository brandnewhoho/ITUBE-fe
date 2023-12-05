import React, { useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function SaveVideo(video, channel_id, channel_title) {
	const [modal_open, setModalOpen] = useState(false);
	const { isLoggedIn, user_id } = useAuth();
	const navigate = useNavigate();
	const [section_list, setSectionList] = useState([]);
	const [type, setType] = useState('');

	const handleSaveVideo = async () => {
		if (!isLoggedIn) {
			navigate('/auth/log_in');
		}
		const response = await client.get('/section/video/' + user_id);
		console.log('get video section list:', response);
		setSectionList(response.data.data);
		setType(0);
		setModalOpen(true);
	};

	const handleSaveChannel = async () => {
		if (!isLoggedIn) {
			navigate('/auth/log_in');
		}
		const response = await client.get('/section/channel/' + user_id);
		console.log('get channel section list:', response);
		setSectionList(response.data.data);
		setType(1);

		setModalOpen(true);
	};

	return (
		<div className='flex justify-end gap-2 mb-2'>
			<button
				className='bg-zinc-600  rounded-full p-2'
				onClick={handleSaveVideo}
			>
				영상저장
			</button>
			<button
				className='bg-zinc-600  rounded-full p-2'
				onClick={handleSaveChannel}
			>
				채널저장
			</button>
			<div>
				{modal_open && (
					<Modal
						setModalOpen={setModalOpen}
						section_list={section_list}
						video={video}
						channel_id={channel_id}
						channel_title={channel_title}
						type={type}
					/>
				)}
			</div>
		</div>
	);
}
