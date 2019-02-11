"use strict";


if (document.querySelector("a"))
{
	if (document.querySelector('a[href*="&tt="')) document.querySelector('a[href*="&tt="').click()
	else
	{
		let stash_url = (window.parent.document.URL)
		let tmp = stash_url.indexOf('php?id=')
		let tmp2 = stash_url.indexOf('&rnid=')
		let stash_id = stash_url.substring(tmp+7, tmp2);
		if (stash_id == -77 || stash_id == -78 || stash_id == -79 || stash_id == -338)
		{
			let stash_uid = stash_url.substring(stash_url.indexOf('&rnid=')+6);
			chrome.runtime.sendMessage(
			{
				btask: "send_stashes",
				stash: stash_uid
			});
			document.querySelector("a").click()
		}
	}
}