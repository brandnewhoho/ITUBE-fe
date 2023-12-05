import React, { useState } from 'react';
import client from '../api/client';

export default function Modal({
	setModalOpen,
	section_list,
	video,
	channel_id,
	channel_title,
	type,
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
		if (selectedSection) {
			console.log('Selected Section ID:', selectedSection);
		} else {
			console.log('New Section Title:', new_section_title);

			// 새로운 섹션을 서버로 전송
			try {
				const response = await client.post(
					'/section/' + (type === 0 ? 'video' : 'channel'),
					{
						title: new_section_title,
						// 기타 필요한 데이터도 같이 전송할 수 있습니다.
					}
				);
				console.log('New Section Created:', response.data);

				// 만들어진 섹션의 ID를 저장합니다.
				setSelectedSection(response.data.id);
			} catch (error) {
				console.error('Error creating new section:', error);
			}
		}
	};

	return (
		<div className='relative flex col'>
			<div className='bg-zinc-800 w-64 h-80 fixed z-100 top-30% left-44% p-4 '>
				<p>저장할 섹션 선택</p>
				<ul className='m-4'>
					{section_list.map((section) => (
						<li key={section.id}>
							<input
								type='radio'
								name='radio'
								checked={selectedSection === section.id}
								onChange={() => handleRadioChange(section.id)}
								className='mr-2'
							></input>
							{section.title}
						</li>
					))}
				</ul>
				<button className='w-full ' type='button' onClick={handleSectionAdd}>
					+ 섹션 만들기
				</button>
				<input
					className={
						hidden ? 'hidden' : 'outline-none border-0 bg-zinc-900 m-4'
					}
					name='new_section_title'
					value={new_section_title}
					onChange={(e) => setNewSectionTitle(e.target.value)}
				></input>
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
	);
}
