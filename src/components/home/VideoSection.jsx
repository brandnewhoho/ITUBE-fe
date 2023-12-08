import React from 'react';
import VideoCardFromDB from './VideoCardFromDB';

export default function VideoSection({ section }) {
	console.log('videoSection', section);
	const videos = section.Videos;
	return (
		<>
			<h2 className='text-xl label-title mt-3 rounded'>
				<span className='bg-brand2 p-1 rounded mr-5'>{section.title}</span>
				<span className='text-xs text-brand2'>비디오</span>
				<span className='text-xs'>섹션입니다.</span>
			</h2>
			{videos && (
				<ul className='grid grid-cols-5 gap-4 gap-y-6 border-b border-zinc-600 py-3'>
					{videos.map((video) => (
						<VideoCardFromDB key={video.id} video={video} />
					))}
				</ul>
			)}
		</>
	);
}
