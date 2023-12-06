import React, { useState } from 'react';
import client from '../../api/client';
import './modal.css';

export default function Modal({
	setModalOpen,
	section_list,
	video,
	channel_id,
	channel_title,
	type,
	user_id,
}) {
	const [new_section_title, setNewSectionTitle] = useState('');
	const [hidden, setHidden] = useState(true);
	const [selectedSection, setSelectedSection] = useState(null);
	console.log('madal start  section_list', section_list);

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleSectionAdd = (e) => {
		e.preventDefault();
		setSelectedSection(null);
		setHidden(false);
	};

	const handleRadioChange = (sectionId) => {
		setSelectedSection(sectionId);
		setHidden(true);
	};

	const handleSave = async (e) => {
		e.preventDefault();
		let query = '';
		let body = {};
		if (selectedSection) {
			console.log('Selected Section ID:', selectedSection);
			query = '?section_id=' + selectedSection;
		} else {
			console.log('New Section Title:', new_section_title);
			query = '?section_title=' + new_section_title + '&user_id=' + user_id;
		}
		if (type === 1) {
			body.channel_id = channel_id;
			body.title = channel_title;
		} else {
			body.title = video.title;
			body.video_id = video.video_id;
			body.channel_id = video.channel_id;
			body.channel_title = video.channel_title;
			body.description = video.description;
			body.thumbnail_url = video.thumbnail_url;
			body.publishedAt = video.publishedAt;
		}

		try {
			console.log('body', body);
			const response = await client.post(
				'/save/' + (type === 0 ? 'video' : 'channel') + query,
				JSON.stringify(body),
				{ headers: { 'Content-Type': 'application/json' } }
			);
			console.log('저장 결과', response.data);
		} catch (error) {
			console.error('저장 중 에러', error);
		}
		setModalOpen(false);
	};

	return (
		<div className='relative flex col center'>
			<div className='bg-zinc-800 w-64 h-80 rounded-50 p-4 wrap-modal'>
				<p className='modal-title'>저장할 섹션 선택</p>
				<ul className='m-4'>
					{section_list.map((section) => (
						<li key={section.id}>
							<label>
								<input
									type='radio'
									name='radio'
									checked={selectedSection === section.id}
									onChange={() => handleRadioChange(section.id)}
									className='mr-2'
								></input>
								<i className='radio-icon'></i>
								{section.title}
							</label>
						</li>
					))}
				</ul>
				<button
					className='w-full btn-create'
					type='button'
					onClick={handleSectionAdd}
				>
					+ 섹션 만들기
				</button>
				<input
					className={
						hidden ? 'hidden' : 'input-form outline-none border-0 bg-zinc-900'
					}
					name='new_section_title'
					value={new_section_title}
					onChange={(e) => setNewSectionTitle(e.target.value)}
				></input>
				<div className='ui-buttons'>
					<button
						onClick={handleSave}
						className='rounded-full bg-zinc-900 w-12 h-10 text-sm'
					>
						확인
					</button>
					<button
						onClick={closeModal}
						className='rounded-full bg-zinc-900 w-12 h-10 text-sm'
					>
						취소
					</button>
				</div>
			</div>
		</div>
	);
}
