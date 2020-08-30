// Wait for page to load
document.addEventListener('DOMContentLoaded', function(event) {
	ready();
})

function ready() {
	let url = 'http://localhost:3000/22b423a332259b6ac6c4e1152a20002e/youflix/videos';
	fetch(url)
	.then((response) => response.json())
	.then(json => {
		let videos = json.videos;
		// Parse out YouTube ID from the URL, as we'll use that to get the thumbnail
		videos.forEach(video => {
			let regex = /watch\?v=([\w\d-]*)/;
			video.youtubeID = video.url.match(regex)[1];
		});
		
		let featuredVideo = videos.find(video => {
			return video.isFeatured;
		});
	
		let groupedVideos = _.groupBy(json.videos, 'category');
		var template = Handlebars.compile(document.getElementById("app-template").innerHTML);
		// Render items into Handlebars template, and set the html of the container element
		document.getElementById('app').innerHTML = template({
			featured: featuredVideo,
			videos: groupedVideos
		});
	});
}
