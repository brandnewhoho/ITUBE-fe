import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import SaveVideo from '../components/SaveVideo';
import { useAuth } from '../context/AuthContext';

export default function VideoDetail() {
	const { isLoggedIn } = useAuth();
	const {
		state: { video },
	} = useLocation();
	console.log('videoDetail   video', video);

	const { title, channelId, channelTitle, description } = video.snippet
		? video.snippet
		: video;
	const { video_id, channel_id, channel_title } = video;

	console.log('videoDetail : isLoggedIn', isLoggedIn);
	return (
		<section className='flex flex-col lg:flex-row'>
			<article className='basis-4/6'>
				<div className='relative pt-[56%] w-full h-0 '>
					<iframe
						title={title}
						className='absolute top-0 left-0 w-full h-full rounded-2xl'
						id='player'
						type='text/html'
						width='100%'
						height='640'
						src={
							'http://www.youtube.com/embed/' +
							(video.snippet ? video.id : video_id)
						}
						style={{ border: 'none' }}
					/>
				</div>
				<div className='p-8'>
					<h2 className='text-xl font-bold'>{title}</h2>
					<ChannelInfo
						id={channelId || channel_id}
						name={channelTitle || channel_title}
					/>
					<SaveVideo video={video} id={channelId} name={channelTitle} />
					<pre className='whitespace-pre-wrap'>{description}</pre>
				</div>
			</article>
			<section className='basis-2/6 ml-4'>
				<RelatedVideos id={channelId} />
			</section>
		</section>
	);
}
