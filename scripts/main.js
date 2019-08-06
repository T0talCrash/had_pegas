"use strict";

var room_stuff = {};
var leftarrow = '';
var rightarrow = '';
var uparrow = '';
var downarrow = '';
var waitingsince = 0;
var arr_stashes = [];
top.document.onkeyup = hotKeys;
document.onkeyup = hotKeys;


// <a class="bright" href="/room/room.php?id=18612224" onclick="return confirm('Если вы сейчас выйдете из Лабиринта, то потеряете ВСЕ вещи, которые вы нашли в Лабиринте. Вы действительно хотите выйти из Лабиринта?')">в Лабиринт Древних Руин</a>

if (document.querySelector('title').innerHTML != "Бой" && document.querySelector('.fightbody') == undefined && document.querySelectorAll('script')[8] != undefined)
{
	var s = /g_room.{0,3}\'([\d]*)\';/i.exec(document.querySelectorAll('script')[8].innerHTML); 
	room_stuff.roomid = parseInt(s[1]);

	if (room_stuff.roomid >= 18612481 && room_stuff.roomid <= 18612529)
	{
		room_stuff.lvl = 1;
	}
	else if (room_stuff.roomid >= 18612737 && room_stuff.roomid <= 18612991)
	{
		room_stuff.lvl = 2;
	}
	else if (room_stuff.roomid >= 18612993 && room_stuff.roomid <= 18613072)
	{
		room_stuff.lvl = 3;
	}
	else
	{
		room_stuff.lvl = 0;
	}
	

	var roomnpcs = document.querySelectorAll(".roomnpc img[id^=room");

	if ( roomnpcs.length > 0 && room_stuff.lvl != 0)
	{
		for (var i = roomnpcs.length - 1; i >= 0; i--) {
			if (roomnpcs[i].alt == "На юг")
			{
				downarrow = roomnpcs[i];
				room_stuff.down = 1;
			}
			else if (roomnpcs[i].alt == "На север")
			{
				uparrow = roomnpcs[i];
				room_stuff.up = 1;
			}
			else if (roomnpcs[i].alt == "На запад")
			{
				leftarrow = roomnpcs[i];
				room_stuff.left = 1;
			}
			else if (roomnpcs[i].alt == "На восток")
			{
				rightarrow = roomnpcs[i];
				room_stuff.right = 1;
			}
			else if (roomnpcs[i].alt == "Гора Черепов")
			{
				if (!room_stuff.skull)
				{
					room_stuff.skull = 0
				}
				room_stuff.skull += 1;
			}
			else if (roomnpcs[i].alt == "Сундук")
			{
				if (!room_stuff.sund)
				{
					room_stuff.sund = 0
				}
				room_stuff.sund += 1;
			}
			else if (roomnpcs[i].alt == "Окованный Cундук")
			{
				if (!room_stuff.ssund)
				{
					room_stuff.ssund = 0
				}
				room_stuff.ssund += 1;
			}
			else if (roomnpcs[i].alt == "Фонтанчик обновления")
			{
				room_stuff.h_fontan = 1;
			}
			else if (roomnpcs[i].alt == "Бодрящий фонтан")
			{
				room_stuff.b_fontan = 1;
			}
			else if (roomnpcs[i].alt == "Странный портал")
			{
				room_stuff.tp_nextlvl = 1;
			}
			else if (roomnpcs[i].alt == "Портал в город")
			{
				room_stuff.tp_home = 1;
			}
			else if (roomnpcs[i].alt == "Безголовый Пью")
			{
				room_stuff.pew = 1;
			}
		}
	}
	else if ( roomnpcs.length > 0)
	{
		for (var i = roomnpcs.length - 1; i >= 0; i--) {
			if (roomnpcs[i].src.indexOf("/@!images/rooms/a35-12_40x40.png") != -1)
			{
				downarrow = roomnpcs[i];
			}
			else if (roomnpcs[i].src.indexOf("/@!images/rooms/a35-10_40x40.png") != -1)
			{
				uparrow = roomnpcs[i];
			}
			else if (roomnpcs[i].src.indexOf("/@!images/rooms/a35-01_40x40.png") != -1)
			{
				leftarrow = roomnpcs[i];
			}
			else if (roomnpcs[i].src.indexOf("/@!images/rooms/a35-21_40x40.png") != -1)
			{
				rightarrow = roomnpcs[i];
			}
			else if (roomnpcs[i].alt == "На юг")
			{
				downarrow = roomnpcs[i];
			}
			else if (roomnpcs[i].alt == "На север")
			{
				uparrow = roomnpcs[i];
			}
			else if (roomnpcs[i].alt == "На запад")
			{
				leftarrow = roomnpcs[i];
			}
			else if (roomnpcs[i].alt == "На восток")
			{
				rightarrow = roomnpcs[i];
			}

		}
	}
}

var pickUpStuff = () => {
	if (!document.querySelector('a[href*="takeThing"')) 
	{
		checkStashes();
		return
	}
	setTimeout(pickUpStuff, 250);
	if (document.getElementById("overDiv") && document.getElementById("overDiv").style.visibility == "visible") 
	{
		if (waitingsince == 0)
		{
			waitingsince = Math.floor((new Date).getTime() * 0.001) + 5;
		}
		else
		{
			if (waitingsince < Math.floor((new Date).getTime() * 0.001))
			{
				let s = document.createElement("script");
				s.id = 'inj';
				s.innerHTML = "top.reloadCentral();";
				document.head.appendChild(s);
				s.parentNode.removeChild(s);
			}

		}
		return
	}
	waitingsince = 0;
	document.querySelector('a[href*="takeThing"').click();
}

function hotKeys(event)
{
	if (event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 96)
	{
		if (document.querySelector("#fight_finish_block").style.display == "block" || document.querySelector("#fight_finish_live_block").style.display == "block")
		{
			document.location.href = '/room/room.php';
		}
		else
		{
			var fight = function()
			{
				if ('oBattleInit' in window && !oBattleInit.aBattle[7])
				{
					
					if (document.forms.frmMove.elements.targetCombo.options.length > 1)
					{
						document.forms.frmMove.elements.targetCombo.options.selectedIndex++
					}
					if (document.forms.frmMove.elements.targetCombo.options.selectedIndex == -1)
					{
						document.forms.frmMove.elements.targetCombo.options.selectedIndex = 0
					}
					var safe_c = 0;
					var myBlocks = {};

					var rand = (min, max) => {return Math.round(min - 0.5 + Math.random() * (max - min + 1))}
					var sBlk = () => 
					{
						let nextBlock = rand(1,5);
						console.log(nextBlock)

						if (!myBlocks[nextBlock])
						{
							blk_s(nextBlock);
							myBlocks[nextBlock] = true
						}
						else if (safe_c < 25)
						{
							sBlk()
						}
						safe_c++
					}

					if ( document.querySelector('#hittitle2') != null )
					{
						let nextHit = rand(1,5);
						kill_s(nextHit);
						nextHit = rand(6,10);
						kill_s(nextHit);
					} else {
						let hitc = document.querySelector('sup#ac').innerHTML
						if (hitc == "1")
						{
							let nextHit = rand(1,5);
							kill_s(nextHit);
						}
					}

					for (var i = 0, len = parseInt(document.querySelector('sup#bc').innerHTML); i < len; i++) 
					{
						sBlk();              
					}

					submitMove();
				}

			}
			injectCode(fight);
		}
	}
	else if ( event.keyCode == 37)
	{
		if (leftarrow != '')
		{
			leftarrow.parentNode.click()
		}
	}
	else if ( event.keyCode == 38)
	{
		if (uparrow != '')
		{
			uparrow.parentNode.click()
		}
	}
	else if ( event.keyCode == 39)
	{
		if (rightarrow != '')
		{
			rightarrow.parentNode.click()
		}
	}
	else if ( event.keyCode == 40)
	{
		if (downarrow != '')
		{
			downarrow.parentNode.click()
		}
	}
}



function injectCode(code)
{
	var oti = document.createElement("script");
	var codeToInject = String(code);
	//codeToInject.split("\u21b5").join(''); //split+join
	codeToInject.replace(/\u21b5/g, ''); //RegExp with unicode point

	oti.innerHTML = "new " + codeToInject;

	oti.id = 'codeInject';
	document.head.appendChild(oti);
	oti.parentNode.removeChild(oti);
}

var checkStashes = () => 
{
	let arr_npcs = document.querySelectorAll(".roomnpc")
	for (var i = arr_npcs.length - 1; i >= 0; i--) {

		if (arr_npcs[i].querySelector("a.nick"))
		{

			let npc_link = arr_npcs[i].querySelector("a.nick").href;
			let tmp = npc_link.indexOf('php?id=')
			let tmp2 = npc_link.indexOf('&rnid=')
			let npc_id = npc_link.substring(tmp+7, tmp2);

			if (npc_id == -77 || npc_id == -78 || npc_id == -79 || npc_id == -338)
			{
				let npc_uniid = npc_link.substring(tmp2+6);
				if (arr_stashes.indexOf(npc_uniid) == -1)
				{
					arr_npcs[i].querySelector("a.nick").click()
				}
				else
				{
					arr_npcs[i].style.visibility = "hidden"
				}
			}
			
		}
	}
}

chrome.runtime.sendMessage(
{
	btask: "opened_stashes"
},
(response) =>
{
	if (response)
	{
		arr_stashes = response.stashes
		pickUpStuff();
	}
});





if (Object.keys(room_stuff).length > 0 && room_stuff.lvl != 0)
{
	chrome.runtime.sendMessage(
	{
		btask: "lab_send",
		roomdata: room_stuff
	},
	(response) =>
	{
		if (response)
		{
			//console.log(response);
			//console.log("YIKES");
		}
	});
}