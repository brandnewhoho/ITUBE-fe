import React from 'react';
import { formatAgo } from '../../util/date';
import { useNavigate } from 'react-router-dom';

export default function VideoCardFromDB({ video }) {
	console.log('videoCardFromDB   video', video);
	const navigate = useNavigate();
	const { title, thumbnail_url, channel_title, publishedAt } = video;

	return (
		<li
			onClick={() => {
				navigate(`/videos/watch/${video.id}`, { state: { video } });
			}}
		>
			<img className='w-full rounded-xl' src={thumbnail_url} alt={title} />
			<div className='w-full'>
				<p className='font-semibold my-4 line-clamp-2'>{title}</p>
				<p className='text-sm opacity-80'>{channel_title}</p>
				<p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
			</div>
		</li>
	);
}
