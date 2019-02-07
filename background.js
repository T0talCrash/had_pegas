"use strict";

var lab_map = {1: {}, 2: {}, 3: {}, reset_time: -1}
var prev_room = -1;
var cur_lvl = 0;
var arr_stashes = []
var arr_comprooms = [];


function well(text)
{
	chrome.tabs.query(
	{
		active: true,
		currentWindow: true
	}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id,
		{
			lab_map: text,
			lab_lvl: cur_lvl,
			comrooms: arr_comprooms
		});
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		
		/*console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");*/
			switch (request.btask)
			{
				case "lab_send":
					if (request.roomdata)
					{
						if (request.roomdata.roomid == prev_room)
						{
							return
						}
						cur_lvl = request.roomdata.lvl;
						prev_room = request.roomdata.roomid;
						arr_comprooms.push(prev_room)
						resetLabMap();
						labInput( request.roomdata );
					}
					break;
				case "lab_get":
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'http://185.246.64.185/maze_api?lvl='+cur_lvl, true);
					xhr.onreadystatechange = function() {//Call a function when the state changes.
						if(xhr.readyState == 4 && xhr.status == 200) 
						{
							well(xhr.responseText);
						}
					}
					xhr.send();
					break;
				case "opened_stashes":
					sendResponse(
					{
						stashes: arr_stashes
					});
				case "send_stashes":
					if (request.stash > 1 && arr_stashes.indexOf(request.stash) == -1)
					{
						arr_stashes.push(request.stash)
					}



			}
			if (request.btask == "loot")
			{
			//console.log("Hi")

			sendResponse(
			{
				answer: "thank you!"
			});
		}

	});

function labInput( roomdata )
{
	let lablvl = roomdata.lvl;
	let curroom = roomdata.roomid;
	if (lablvl == 1)
	{
		roomdata.roomid = curroom - 18612481;
	}
	else if(lablvl == 2)
	{
		roomdata.roomid = curroom - 18612737;
	}
	else if(lablvl == 3)
	{
		roomdata.roomid = curroom - 18612993;
	}

	if (!lab_map[lablvl].curroom)
	{
		lab_map[lablvl][curroom] = {};
	}
	let p_query = 'action=labp'
	for (var key in roomdata) 
	{
		p_query += "&" + key + "=" + roomdata[key];
	}
	console.log(roomdata)

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://185.246.64.185/index.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(xhr.readyState == 4 && xhr.status == 200) {
			//alert(xhr.responseText);
		}
	}
	xhr.send(p_query);

}

function resetLabMap()
{
	var dt = new Date();
	dt = dt.getHours() + dt.getTimezoneOffset() / 60;
	var rlm_t = -1;

	if (dt >= 6 && dt < 14) rlm_t = 1
		else if (dt >= 14 && dt < 22) rlm_t = 2
			else rlm_t = 3

	//var ct = Math.round((new Date()).getTime() / 1000);
	if ( lab_map.reset_time == rlm_t || lab_map.reset_time == -1 )
	{
		lab_map[1] = {}
		lab_map[2] = {}
		lab_map[3] = {}
		arr_comprooms = []
		arr_stashes = []
		lab_map.reset_time = rlm_t + 1;

		if (rlm_t == 3) lab_map.reset_time = 1
			else lab_map.reset_time = rlm_t + 1; 

	}
}



		/*

	  var xhr = new XMLHttpRequest();
	  xhr.open('POST', 'http://185.246.64.185/index.php', true);
	  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(xhr.readyState == 4 && xhr.status == 200) {
			alert(xhr.responseText);
		}
	}
	  // send the collected data as JSON
	  xhr.send('orem='+encodeURIComponent(JSON.stringify(HAHA))+'&name=binny');


		const http = new XMLHttpRequest()
		http.open('POST', '/login')
		http.setRequestHeader('Content-type', 'application/json')
		http.send(JSON.stringify(params)) // Make sure to stringify
		http.onload = function() {
			// Do whatever with response
			alert(http.responseText)
		}

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://185.246.64.185/index.php', true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

		// send the collected data as JSON
		xhr.send(JSON.stringify(HAHA));*/


/*chrome.tabs.query(
	{
		currentWindow: true,
		active: true
	},
	function(tabArray)
	{

		console.log(tabArray[0]['id'])
	}
	)*/
