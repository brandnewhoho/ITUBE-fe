import React from 'react';
import VideoCard from '../VideoCard';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelSection({ section }) {
	const { youtube } = useYoutubeApi();
	const channel_id = section.Channels[0].channel_id;

	console.log('section', section);
	console.log('get Videos', channel_id);
	const {
		isLoading,
		error,
		data: videos,
	} = useQuery(['videos', channel_id], () => youtube.channelVideo(channel_id), {
		staleTime: 1000 * 60 * 1,
	});

	return (
		<>
			<h2 className='text-2xl label-title'>
				{section.title} <span class='box-cate'>채널</span>
			</h2>
			{isLoading && <p>Loading...</p>}
			{error && <p>Something is wrong 😖</p>}
			{videos && (
				<ul className='grid grid-cols-5 gap-4 gap-y-6'>
					{videos.map((video) => (
						<VideoCard key={video.id} video={video} />
					))}
				</ul>
			)}
		</>
	);
}
