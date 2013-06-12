var twitch = "https://api.twitch.tv/kraken/streams?game=League+of+Legends&limit=50";

function view(curl){
	chrome.tabs.create({url: curl});
}

function refresh(){
	$.getJSON(twitch, function(data){
		for (var i = 0; i < data.streams.length; i++) {
			var d = "<tr class='pic tooltip' title='"+
			data.streams[i].channel.status+
			"'><td class='td-pic'><a href='"+data.streams[i].channel.url+
			"'><img src='"+data.streams[i].preview.small+"'/></a></td>"+
			"<td><span class='camera'>"+data.streams[i].channel.name+
			"</span><br>"+
			"<span class='viewer'>"+data.streams[i].viewers+
			"</span></td></tr>";
			$('#list').append(d);
		};
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