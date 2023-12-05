import axios from 'axios';

export default class FakeYoutube {
	async search(keyword) {
		return axios
			.get('/videos/search.json')
			.then((res) => res.data.items)
			.then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
	}

	async channelImageURL(id) {
		return axios
			.get('/videos/channel.json')
			.then((res) => res.data.items[0].snippet.thumbnails.default.url);
	}

	async relatedVideos(id) {
		return axios
			.get('/videos/related.json')
			.then((res) => res.data.items)
			.then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
	}

	async channelVideo(channel_id) {
		return axios
			.get('/videos/search_channel.json', {
				params: {
					maxResults: 5,
				},
			})
			.then((res) =>
				res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
			);
	}
}
