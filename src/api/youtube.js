import axios from 'axios';

export default class Youtube {
	constructor() {
		this.httpClient = axios.create({
			baseURL: 'https://www.googleapis.com/youtube/v3',
			params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
		});
	}

	async search(keyword) {
		return this.httpClient
			.get('search', {
				params: {
					part: 'snippet',
					maxResults: 25,
					type: 'video',
					q: keyword,
				},
			})
			.then((res) =>
				res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
			);
	}

	async channelVideo(channel_id) {
		return this.httpClient
			.get('search', {
				params: {
					channelId: channel_id,
					part: 'snippet',
					order: 'date',
					type: 'video',
					maxResults: 5,
				},
			})
			.then((res) =>
				res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
			);
	}

	async channelImageURL(id) {
		return this.httpClient
			.get('channels', { params: { part: 'snippet', id } })
			.then((res) => res.data.items[0].snippet.thumbnails.default.url);
	}

	async relatedVideos(id) {
		return this.httpClient
			.get('search', {
				params: {
					part: 'snippet',
					maxResults: 25,
					type: 'video',
				},
			})
			.then((res) =>
				res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
			);
	}
}
