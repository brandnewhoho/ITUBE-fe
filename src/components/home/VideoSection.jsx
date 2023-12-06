import React from 'react';
import VideoCardFromDB from './VideoCardFromDB';

export default function VideoSection({ section }) {
	console.log('videoSection', section);
	const videos = section.Videos;
	return (
		<>
			<h2 className='text-2xl '>{section.title}</h2>
			{videos && (
				<ul className='grid grid-cols-5 gap-4 gap-y-6'>
					{videos.map((video) => (
						<VideoCardFromDB key={video.id} video={video} />
					))}
				</ul>
			)}
		</>
	);
}
