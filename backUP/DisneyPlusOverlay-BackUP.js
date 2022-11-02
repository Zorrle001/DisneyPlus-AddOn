/*const { off } = require("process");*/

body = document.getElementsByTagName("body")[0];
overlayDiv = document.createElement("div");
overlayButtonBack = document.createElement("img");
overlayButtonFore = document.createElement("img");
overlayButtonReload = document.createElement("img");
overlayButtonStream = document.createElement("img");

//https://w7.pngwing.com/pngs/365/764/png-transparent-computer-icons-refresh-free-one-button-reload-text-logo-monochrome-thumbnail.png

overlayDiv.style.position = "fixed";
overlayDiv.style.left = "1rem";
overlayDiv.style.top = "1rem";
overlayDiv.style.height = "4rem";
overlayDiv.style.width = "auto";
overlayDiv.style.backgroundColor = "rgba(255,255,255,0.7)";
overlayDiv.style.borderRadius = "3rem";
overlayDiv.style.zIndex = "99999999";


//overlayButtonBack.src = "https://www.freeiconspng.com/uploads/back-undo-return-button-png-5.png";
overlayButtonBack.src = "https://cdn.discordapp.com/attachments/966085610005749831/1009961585135075430/BackImage.png";
overlayButtonBack.style.height = "100%";
overlayButtonBack.style.width = "auto";
overlayButtonBack.style.zIndex = "999999999";
overlayButtonBack.style.cursor = "pointer";

//overlayButtonFore.src = "https://www.freeiconspng.com/uploads/back-undo-return-button-png-5.png";
overlayButtonFore.src = "https://cdn.discordapp.com/attachments/966085610005749831/1009961585135075430/BackImage.png";
overlayButtonFore.style.transform = "scaleX(-1)";
overlayButtonFore.style.height = "100%";
overlayButtonFore.style.width = "auto";
overlayButtonFore.style.zIndex = "999999999";
overlayButtonFore.style.cursor = "pointer";

overlayButtonReload.src = "https://cdn.discordapp.com/attachments/966085610005749831/966085649604153375/ReloadIcon.png";
overlayButtonReload.style.height = "100%";
overlayButtonReload.style.padding = "0.5rem";
overlayButtonReload.style.width = "auto";
overlayButtonReload.style.zIndex = "999999999";
overlayButtonReload.style.cursor = "pointer";

overlayButtonStream.style.height = "100%";
overlayButtonStream.style.padding = "0.5rem";
overlayButtonStream.src = "https://cdn.discordapp.com/attachments/966085610005749831/1026462543096594492/Stream.png";
overlayButtonStream.style.width = "auto";
overlayButtonStream.style.zIndex = "999999999";
overlayButtonStream.style.cursor = "pointer";

/*if(history.length <= 1) {
	overlayButtonBack.style.opacity = "30%";
}else {
	overlayButtonBack.style.opacity = "100%";
}*/

overlayButtonBack.addEventListener("click", function() {
	history.back();
});
overlayButtonFore.addEventListener("click", function() {
	history.forward();
});
overlayButtonReload.addEventListener("click", function() {
	window.location.reload(true);
});
overlayButtonStream.addEventListener("click", function() {
	
	/*window.setInterval(function() {
	  chrome.browserAction.setBadgeText({text:String(i)});
	  i++;
	}, 4000);*/
	/*chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		console.log(response.farewell);
	});*/
	
	openWindow("http://viewer.spacedesk.net/#hyperion");
	
});

overlayDiv.appendChild(overlayButtonBack);
overlayDiv.appendChild(overlayButtonReload);
overlayDiv.appendChild(overlayButtonFore);
overlayDiv.appendChild(overlayButtonStream);
body.appendChild(overlayDiv);

var TrackPickerId = 4;
var enabled = false;

document.addEventListener("keydown", function(e) {
	if(e.code == "KeyU") {
		result = window.prompt("Deutsche TrackPickerId",TrackPickerId);
		if(result != null && result != "" ) {
			try {
				intResult = parseInt(result);

				if(isNaN(intResult) || intResult < 0) {
					sendWarnMessage("Diese TrackPickerID ist ungültig");
					return;
				}

				TrackPickerId = intResult;
				sendSuccessMessage("Neue TrackPickerID ist " + TrackPickerId);
			} catch (error) {
				sendCancelMessage("Bitte gib eine gültige Zahl ein");
			}
		}else {
			sendCancelMessage("Bitte gib eine gültige Zahl ein");
		}
	}else if(e.code == "KeyI") {
		off = document.getElementById("subtitleTrackPicker-off");
		track = document.getElementById("subtitleTrackPicker-" + TrackPickerId);

		if(enabled == true) {
			enabled = false;
			off.click();
			sendCancelMessage("Untertitel wurde deaktiviert");
		}else {
			if(track != undefined) {
				enabled = true;
				track.click();
				sendSuccessMessage("Untertitel wurde aktiviert");
			}else {
				sendWarnMessage("Die TrackPickerID ist nicht vergeben");
			}
		}
	}else if(e.code == "KeyK" || e.code == "Space") {
		playPause = document.querySelector(".play-pause-icon");
		
		//TEST RUNNING
		if(playPause.classList.contains("pause-icon")) {
			//IS RUNNING
			sendCancelMessage("Video wurde pausiert");
		}else {
			sendSuccessMessage("Video wurde gestartet");
			//ISNT RUNNING
		}
		
		playPause.click();
	}else if(e.code == "KeyF") {
		exitFullscreen = document.querySelector(".exit-fullscreen-icon");
		
		//TEST FULLSCREEN
		if(exitFullscreen != undefined) {
			//IS FULL
			sendCancelMessage("Fullscreen wurde beendet");
			exitFullscreen.click();
		}else {
			//ISNT FULL
			sendSuccessMessage("Fullscreen wurde gestartet");
			exitFullscreen = document.querySelector(".fullscreen-icon").click();
		}
	}
});



var head = document.head;
var link = document.createElement("link");

link.type = "text/css";
link.rel = "stylesheet";
//link.href = "https://cdn.discordapp.com/attachments/966085610005749831/993943205856956456/messageStyle.css";
//https://cdn.discordapp.com/attachments/966085610005749831/993943205856956456/messageStyle.css

//link.href = "https://cdn.discordapp.com/attachments/966085610005749831/1031631369270476830/messageStyle.css";

const url = chrome.runtime.getURL('css/messageStyle.css');
link.href = url;

head.appendChild(link);


const msgBox = document.createElement("div");
msgBox.id = "messageBox";

createMSGBox();

async function createMSGBox() {
    timer = 0;
    if(timer < 5000) {
        if(document.getElementById("hudson-wrapper") == undefined) {
            timer += 300;
            setTimeout(function() {
                createMSGBox();
            }, 300);
            return;
        }

        document.getElementById("hudson-wrapper").appendChild(msgBox);
    }else {
        document.body.appendChild(msgBox);
    }
}

function openWindow(url) {
   fenster = window.open(url, "fenster1", "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
   fenster.focus();
}
















//const msgBox = document.getElementById("messageBox");

        function sendMessage(text) {
            
            msg = document.createElement("div");
            msg.classList.add("message");
            closeBtn = document.createElement("img");
            closeBtn.src = "https://media.discordapp.net/attachments/966085610005749831/993938689342324777/Close.png";
            closeBtn.classList.add("messageCloseButton");
            h2 = document.createElement("h2");
            h2.innerText = text;
            h2.classList.add("messageText");

            msg.appendChild(closeBtn);
            msg.appendChild(h2);

            closeBtn.addEventListener("click", function() {
                this.parentNode.classList.add("close");
                parent = this.parentNode;
                setTimeout(function() {
                    parent.remove();
                }, 300, parent);
            });

            popOutTimeout(msg);

            msgBox.appendChild(msg);

        }

        function sendCancelMessage(text) {
            
            msg = document.createElement("div");
            msg.classList.add("message");
            msg.classList.add("iconMessage")
            closeBtn = document.createElement("img");
            closeBtn.src = "https://media.discordapp.net/attachments/966085610005749831/993938689342324777/Close.png";
            closeBtn.classList.add("messageCloseButton");
            icon = document.createElement("img");
            icon.src = "https://media.discordapp.net/attachments/966085610005749831/993938689023553557/Cancel.png";
            icon.classList.add("messageIcon");
            h2 = document.createElement("h2");
            h2.innerText = text;
            h2.classList.add("messageText");
            h2.classList.add("redText");

            msg.appendChild(closeBtn);
            msg.appendChild(icon);
            msg.appendChild(h2);

            closeBtn.addEventListener("click", function() {
                this.parentNode.classList.add("close");
                parent = this.parentNode;
                setTimeout(function() {
                    parent.remove();
                }, 300, parent);
            });

            popOutTimeout(msg);

            msgBox.appendChild(msg);

        }

        function sendSuccessMessage(text) {
            
            msg = document.createElement("div");
            msg.classList.add("message");
            msg.classList.add("iconMessage")
            closeBtn = document.createElement("img");
            closeBtn.src = "https://media.discordapp.net/attachments/966085610005749831/993938689342324777/Close.png";
            closeBtn.classList.add("messageCloseButton");
            icon = document.createElement("img");
            icon.src = "https://cdn.discordapp.com/attachments/966085610005749831/993938689585578105/Done.png";
            icon.classList.add("messageIcon");
            h2 = document.createElement("h2");
            h2.innerText = text;
            h2.classList.add("messageText");
            h2.classList.add("greenText");

            msg.appendChild(closeBtn);
            msg.appendChild(icon);
            msg.appendChild(h2);

            closeBtn.addEventListener("click", function() {
                this.parentNode.classList.add("close");
                parent = this.parentNode;
                setTimeout(function() {
                    parent.remove();
                }, 300, parent);
            });

            popOutTimeout(msg);

            msgBox.appendChild(msg);

        }

        function sendWarnMessage(text) {
            
            msg = document.createElement("div");
            msg.classList.add("message");
            msg.classList.add("iconMessage")
            closeBtn = document.createElement("img");
            closeBtn.src = "https://media.discordapp.net/attachments/966085610005749831/993938689342324777/Close.png";
            closeBtn.classList.add("messageCloseButton");
            icon = document.createElement("img");
            icon.src = "https://cdn.discordapp.com/attachments/966085610005749831/993938689900154960/Warn.png";
            icon.classList.add("messageIcon");
            h2 = document.createElement("h2");
            h2.innerText = text;
            h2.classList.add("messageText");
            h2.classList.add("orangeText");

            msg.appendChild(closeBtn);
            msg.appendChild(icon);
            msg.appendChild(h2);

            closeBtn.addEventListener("click", function() {
                this.parentNode.classList.add("close");
                parent = this.parentNode;
                setTimeout(function() {
                    parent.remove();
                }, 300, parent);
            });

            popOutTimeout(msg);

            msgBox.appendChild(msg);

        }

        async function popOutTimeout() {
            await setTimeout(function(msg) {
                msg.classList.add("popOut");
                setTimeout(function(msg) {
                    msg.remove();
                }, 300, msg);
            }, 5000, msg);
        }