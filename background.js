// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {

	var source = "";
	var menuId = info.menuItemId;
	if (menuId == "contextpage") {
		source = info.pageUrl;	
	} else if (menuId == "contextselection") {
		source = info.selectionText;
	} else if (menuId == "contextlink") {
		source = info.linkUrl;
	} else if (menuId == "contextimage" || menuId == "contextvideo" || menuId == "contextaudio") {
		source = info.srcUrl;
	}

	// first tell content-script to show something
	testRequest({'code':0, 'source': source});

	var url = "http://qrcode.weijian21.cn/api.php?";
	url += "data=" + encodeURIComponent(source) + "&level=H&size=10";

	var imgurl = '';
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function(res) {
		if (xhr.readyState == 4) {
			imgurl = xhr.responseText;	
			testRequest({'code':1, 'source': source, 'img':imgurl});
		}
	}
	xhr.send();
};

function testRequest(params) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tab = tabs[0];
		chrome.tabs.sendMessage(tab.id, params, function(response) {
			if (chrome.runtime.lastError) {
				console.log("ERROR: ", chrome.runtime.lastError);
			} else {
				console.log(response);
			}
		}); 
	});
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
	// Create one test item for each context type.
	var contexts = ["page","selection","link","image","video","audio"];
	var contextsShow = {
		"page":"展示当前页面地址的二维码",
		"selection":"展示选中文字的二维码",
		"link":"展示当前链接地址的二维码",
		"image":"展示当前图片地址的二维码",
		"video":"展示当前视频的二维码",
		"audio":"展示当前音频的二维码"
	}
	for (var i = 0; i < contexts.length; i++) {
		var context = contexts[i];
		var title = contextsShow[context];
		var id = chrome.contextMenus.create({"title": title, "contexts":[context],
			"id": "context" + context});
	}
});
