"use strict";

var haha = {};
var arr_comprooms = [];

	chrome.runtime.sendMessage(
	{
		btask: "lab_get"
	}/*,
	(response) =>
	{
		if (response)
		{
			alert(response)
			mapCreate(response.lab_map, response.lab_lvl);
			//map_table.appendChild
		}
	}*/);

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (!sender.tab)
			{
				arr_comprooms = request.comrooms;
				mapCreate(request.lab_map, request.lab_lvl);
			}
		});

function parseMap(map_json)
{
	var map_array = JSON.parse(map_json);
	var lab_data = {}


	for (var i = 0, map_length = map_array.length; i < map_length; i++) 
	{
		let roomid = map_array[i]["id"]
		lab_data[roomid] = {};
		for (var key in map_array[i]) 
		{
			if (key != "id")
			{
				lab_data[roomid][key] = map_array[i][key];
			}
		}
		
	}
	return lab_data;
}


function mapCreate(map_data, lvl)
{
	
	let numRows = 0,
		numbCells = 0,
		map = document.querySelectorAll("table tbody")[2].querySelectorAll("td"),
		parsed_map = parseMap(map_data);
		haha = parsed_map
	
	/*
	0001 - left
	0010 - right
	0100 - down
	1000 - top

	


	*/

	for (var i = 0, len = map.length; i < len; i++) {
		if (parsed_map[i])
		{
			var s_title = ''
			var roomstuff = document.createElement('div');
			roomstuff.classList.add("iconc")


			if (lvl == 2 || lvl == 3)
			{
				if (parseInt(parsed_map[i]['b_fontan']))
				{
					s_title += 'Фонтан бодрости\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/cour.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'yellowgreen'
				}
				if (parseInt(parsed_map[i]['l_fontan']))
				{
					s_title += 'Фонтан Здоровья\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/hp.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'seagreen'

				}
			}

			if (lvl == 1 || lvl == 2)
			{
				if (parseInt(parsed_map[i]['ssund']))
				{
					s_title += 'Супер Сундук\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/ssund.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'chocolate'
				}
				if (parseInt(parsed_map[i]['sund']))
				{
					s_title += 'Сундук\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/sund.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'chocolate'
				}
				if (parseInt(parsed_map[i]['skull']))
				{
					s_title += 'Черепа\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/skull.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'darkgrey'
				}
				if (parseInt(parsed_map[i]['tp_nextlvl']))
				{
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/next.svg"
					roomstuff.appendChild(temp)
					s_title += 'Телепорт на след\r\n'
					map[i].style.color = 'darkcyan'
				}
			}

			if (lvl == 2)
			{
				if (parseInt(parsed_map[i]['tp_home']))
				{
					s_title += 'Телепорт домой\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/home.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'aquamarine'
				}
				if (parseInt(parsed_map[i]['pew']))
				{
					s_title += 'Пью\r\n'
					let temp = document.createElement('img') 
					temp.src = "http://ordenpegasa.ru/wp-content/themes/hemingway/images/lab/pew.svg"
					roomstuff.appendChild(temp)
					map[i].style.color = 'crimson'
				}
			}
			let curroom = 0;
			if (lvl == 1)
			{
				curroom = i + 18612481;
			}
			else if(lvl == 2)
			{
				curroom = i + 18612737;
			}
			else if(lvl == 3)
			{
				curroom = i + 18612993;
			}
			if (roomstuff.childElementCount == 0) {
				roomstuff.remove()
			} else if (roomstuff.childElementCount == 2) {
				roomstuff.classList.add("c2")
			} else if (roomstuff.childElementCount == 3) {
				roomstuff.classList.add("c3")
			} else if (roomstuff.childElementCount == 4) {
				roomstuff.classList.add("c4")
			}

			if (!map[i].children.length)
			{

				var img = '/@!images/rooms/labmap/s/'
				if (parsed_map[i]['north'] == 0)
				{
					img += '1'
				} 
				else
				{
					img += '0'
				}
				if (parsed_map[i]['south'] == 0)
				{
					img += '1'
				} 
				else
				{
					img += '0'
				}
				if (parsed_map[i]['east'] == 0)
				{
					img += '1'
				} 
				else
				{
					img += '0'
				}
				if (parsed_map[i]['west'] == 0)
				{
					img += '1.gif'
				}
				else
				{
					img += '0.gif'
				}
				map[i].width = 30;
				map[i].height = 30;
				map[i].align = 'center';
				map[i].vAlign = 'middle';
				map[i].setAttribute("background", img);


				map[i].innerHTML = map[i].style.color == "" ? i : '<div class="mazeroom">' + i + '</div>';
				if (roomstuff.childElementCount != 0) {
					map[i].appendChild(roomstuff);
				}
				
			} else if ( map[i].style.color != "" ) {

				let fchi = map[i].children[0];
				if ( fchi )
				{
					let schi = fchi.children[0];
					if ( !schi )
					{
						map[i].innerHTML = '<div class="mazeroom">' + i + '</div>';
						map[i].appendChild(roomstuff);

					} else {
						if (fchi.tagName == "A") 
						{
							fchi.innerHTML = '<div class="mazeroom">' + i + '</div>';
							fchi.appendChild(roomstuff);
						} else {
							schi.innerHTML = '<div class="mazeroom">' + i + '</div>';
							schi.appendChild(roomstuff);
						}
					}
				}
			}
			
			if (arr_comprooms.indexOf(curroom) != -1) {
				map[i].style.color = 'blue'
			}
			map[i].title = s_title;
			
		}
		
	}
	//map_table.removeChild(map);
	//map_table.appendChild(tbdy);
}






