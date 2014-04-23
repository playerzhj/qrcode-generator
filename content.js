// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		
		// if there is no img url, show something first 
		if(request.code == 0) {
		
			var msg = request.source;

			// check if div is exist
			if(document.getElementById("s-qr-panel") == null) {	
				// create pannel at right-top corner of this tab
				var showDiv = document.createElement("div");
				showDiv.id = "s-qr-panel";
				showDiv.innerHTML = '<div id="s-qr-panel-relative"><div id="s-qr-panel-relative-img" class="img"></div><div id="s-qr-panel-relative-details" class="details"><p class="header">The Source</p><p class="con" id="source-con"></p><p class="footer">try double click</p></div></div>';
				document.body.appendChild(showDiv);

				// the qr img
				var imgDiv = document.getElementById("s-qr-panel-relative-img");

				// the source
				var source = document.getElementById("s-qr-panel-relative-details");

				// double click destory
				source.addEventListener('dblclick', function(){
					showDiv.className = "bounceOutUp";
					setTimeout(function(){
						document.body.removeChild(showDiv);
					}, 2000);
				});

				showDiv.className = "bounceInDown";
			}
			
			var sourceCon = document.getElementById("source-con");
			sourceCon.innerHTML = msg;

		} else {
			// receive data
			var img = request.img;
		
			// the qr img
			var imgDiv = document.getElementById("s-qr-panel-relative-img");
			imgDiv.style.backgroundImage = "url("+img+")";
			imgDiv.style.backgroundSize = "330px 330px";
		}
			
	}
);
