import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import SaveVideo from '../components/save/SaveVideo';
import { useAuth } from '../context/AuthContext';

export default function VideoDetail() {
	const { isLoggedIn } = useAuth();
	const {
		state: { video },
	} = useLocation();
	console.log('videoDetail   video', video);
	const formatted_video = {};
	if (video.snippet) {
		formatted_video.video_id = video.id;
		formatted_video.channel_id = video.snippet.channelId;
		formatted_video.channel_title = video.snippet.channelTitle;
		formatted_video.description = video.snippet.description;
		formatted_video.title = video.snippet.title;
		formatted_video.thumbnail_url = video.snippet.thumbnails.medium.url;
		formatted_video.publishedAt = video.snippet.publishedAt;
	} else {
		Object.assign(formatted_video, video);
	}

	console.log('videoDetail : isLoggedIn', isLoggedIn);
	return (
		<section className='flex flex-col lg:flex-row'>
			<article className='basis-4/6'>
				<div className='relative pt-[56%] w-full h-0 '>
					<iframe
						title={formatted_video.title}
						className='absolute top-0 left-0 w-full h-full rounded-2xl'
						id='player'
						type='text/html'
						width='100%'
						height='640'
						src={'https://www.youtube.com/embed/' + formatted_video.video_id}
						style={{ border: 'none' }}
					/>
				</div>
				<div className='p-8'>
					<h2 className='text-xl font-bold'>{formatted_video.title}</h2>
					<ChannelInfo
						channel_id={formatted_video.channel_id}
						channel_title={formatted_video.channel_title}
					/>
					<SaveVideo
						video={formatted_video}
						channel_id={formatted_video.channel_id}
						channel_title={formatted_video.channel_title}
					/>
					<pre className='whitespace-pre-wrap'>
						{formatted_video.description}
					</pre>
				</div>
			</article>
			<section className='basis-2/6 ml-4'>
				<RelatedVideos id={formatted_video.channel_id} />
			</section>
		</section>
	);
}
