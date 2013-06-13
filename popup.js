var twitch = "https://api.twitch.tv/kraken/streams?game=League+of+Legends&limit=50";
var streams = [];

function show(filter){
	for (var i = 0; i < streams.length; i++) {
		var row = document.createElement('tr');
		row.className = "pic tooltip";
		row.title = streams[i].tooltip;
		
		var imgbox = document.createElement('td');
		imgbox.className = "td-pic";
		var link = document.createElement('a');
		link.href = streams[i].url;
		var img = document.createElement('div');
		img.style.backgroundImage = "url("+streams[i].image+")";
		imgbox.appendChild(link);
		link.appendChild(img);
		var detailbox = document.createElement('td');
		var name = document.createElement('span');
		name.className = "camera";
		name.appendChild(document.createTextNode(streams[i].name));
		var viewers = document.createElement('span');
		viewers.className = "viewer";
		viewers.appendChild(document.createTextNode(streams[i].viewers));
		detailbox.appendChild(name);
		detailbox.appendChild(document.createElement('br'));
		detailbox.appendChild(viewers);
		
		row.appendChild(imgbox);
		row.appendChild(detailbox);
		$('#list').append(row);
	};
}

function refresh(){
	$.getJSON(twitch, function(data){
		streams = [];
		for (var i = 0; i < data.streams.length; i++) {
			streams.push({
				tooltip: data.streams[i].channel.status,
				image: data.streams[i].preview.small,
				url: data.streams[i].channel.url,
				name: data.streams[i].channel.name,
				viewers: data.streams[i].viewers
			});
		};
		show('');
		$('a').click(function(){
			chrome.tabs.create({url: $(this).attr('href')});
			return false;
		});
		$('.loading').removeClass('loading');
	});
}


$(document).ready(function(){
	refresh();
})