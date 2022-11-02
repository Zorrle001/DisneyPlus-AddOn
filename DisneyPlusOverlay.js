const head = document.head;
const body = document.getElementsByTagName("body")[0];

var messageStyleLink = document.createElement("link");
messageStyleLink.type = "text/css";
messageStyleLink.rel = "stylesheet";
messageStyleLink.id = "disneyplusaddon-messageStyleLink";
const messageStyleURL = chrome.runtime.getURL('css/messageStyle.css');
messageStyleLink.href = messageStyleURL;

var navigationStyleLink = document.createElement("link");
navigationStyleLink.type = "text/css";
navigationStyleLink.rel = "stylesheet";
const navigationStyleURL = chrome.runtime.getURL('css/navigationStyle.css');
navigationStyleLink.href = navigationStyleURL;

head.appendChild(messageStyleLink);
head.appendChild(navigationStyleLink);


const msgBox = document.createElement("div");
msgBox.id = "messageBox";

createMSGBox();

overlayBox = document.createElement("div");
overlayButtonBack = document.createElement("img");
overlayButtonFore = document.createElement("img");
overlayButtonReload = document.createElement("img");
overlayButtonStream = document.createElement("img");

overlayBox.id = "disneyplusaddon-overlayBox";
overlayButtonBack.id = "disneyplusaddon-overlayButtonBack";
overlayButtonFore.id = "disneyplusaddon-overlayButtonFore";
overlayButtonReload.id = "disneyplusaddon-overlayButtonReload";
overlayButtonStream.id = "disneyplusaddon-overlayButtonStream";

const overlayButtonBackURL = chrome.runtime.getURL("rsc/BackImage.png");
overlayButtonBack.src = overlayButtonBackURL;

const overlayButtonForeURL = overlayButtonBackURL;
overlayButtonFore.src = overlayButtonForeURL;

const overlayButtonReloadURL = chrome.runtime.getURL("rsc/Reload.png");
overlayButtonReload.src = overlayButtonReloadURL;

const overlayButtonStreamURL = chrome.runtime.getURL("rsc/Share.png");
overlayButtonStream.src = overlayButtonStreamURL;

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
	
	openWindow("http://viewer.spacedesk.net/?disneyplusaddon");
	
});

overlayBox.appendChild(overlayButtonBack);
overlayBox.appendChild(overlayButtonReload);
overlayBox.appendChild(overlayButtonFore);
overlayBox.appendChild(overlayButtonStream);

//OVERLAY DEAKTIVIERT
//body.appendChild(overlayBox);

var TrackPickerId = 4;
var subtitlesEnabled;

//FEHLERHAFT
if(document.querySelector("#subtitleTrackPicker-off:checked") == null) {
    subtitlesEnabled = true;
}else {
    subtitlesEnabled = false;
}

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

		if(subtitlesEnabled == true) {
			subtitlesEnabled = false;
			off.click();
			sendCancelMessage("Untertitel wurde deaktiviert");
		}else {
			if(track != undefined) {
				subtitlesEnabled = true;
				track.click();
				sendSuccessMessage("Untertitel wurde aktiviert");
			}else {
				sendWarnMessage("Die TrackPickerID ist nicht vergeben");
			}
		}
	}else if(e.code == "KeyK") {
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








/*
<span class="sc-hIVACf kuaziE  item" data-route="Test">
    <a tabindex="0" data-route="Test" aria-label="Test" data-testid="navigation-item--1-Test">
        <span>
            <svg aria-hidden="true" aria-label="home" color="#f9f9f9" role="img" transform="" version="1.1" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" data-route="STARTSEITE" class="sc-jhAzac vfaMf">
                <title></title>
                <path d="M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z" class="sc-hzDkRC kzwgVO"></path>
            </svg>
        </span>
        <p class="page-nav page-nav--small text-color--primary margin--left-2 page-nav" style="padding: 2px 0px; white-space: nowrap;">STARTSEITE</p>
    </a>
</span>
*/

/*
    Weiterschauen Line nach oben -> #home-collection
*/

let enabledNavigations = false;

/*window.addEventListener("click", () => {
    if(enabledNavigations == true) {
        if(document.getElementById("disneyplusaddon-navBackSpan") == null) {
            addNavigations();
        }
    }
});*/

window.addEventListener("scroll", (e) => {

    if(document.querySelector(".sc-imAxmJ.eOFVeq") == null) {
        return;
    }

    if(window.scrollY > 0) {
        document.querySelector(".sc-imAxmJ.eOFVeq").classList.add("disneyplusaddon-filled");
    }else {
        document.querySelector(".sc-imAxmJ.eOFVeq").classList.remove("disneyplusaddon-filled");
    }
});

function createNavigations() {

    let episodeAdded = 0;

    document.querySelector("#app_body_content").addEventListener("DOMNodeInserted", (event) => {
        if(document.getElementById("nav-list") != null && document.getElementById("disneyplusaddon-navBackSpan") == null) {
            addNavigations();
        }
        if(document.querySelector(".controls__left") != null && document.getElementById("disneyplusaddon-controlLeftStream") == null) {
            addControlLeftStream();
        }
        if(document.getElementById("home-collection") != null && document.querySelector("[data-testid='collection-5']:not(.disneyplusaddon-moved)") != null
        && document.querySelector("[data-testid='collection-2']") != null) {
            const continueWatching = document.querySelector("[data-testid='collection-5']");
            const firstLine = document.querySelector("[data-testid='collection-2']");

            continueWatching.classList.add("disneyplusaddon-moved");
            firstLine.parentNode.insertBefore(continueWatching, firstLine);
        }
        if(document.querySelector(".sc-hqGPoI.fdMSID") != null && document.querySelector(".sc-hqGPoI.fdMSID .slick-track") != null
        && document.getElementById("#disneyplusaddon-episodeView") == null && document.querySelector(".sc-hqGPoI.fdMSID .slick-track img") != null) {

            
            //console.log("UPSCALE");
            //upscale();

            restyle();

            /*const episodeContainer = document.querySelector(".sc-hqGPoI.fdMSID");
            const episodeTrack = episodeContainer.querySelector(".slick-track");

            const target = event.target;
            if(target.classList != null && target.classList.contains("gv2-asset")) {

                const episodeCount = episodeTrack.childNodes.length;

                episodeAdded++;

                console.log(episodeAdded);

                if(episodeAdded >= episodeCount) {
                    episodeAdded = 0;
                }

            }*/

            //console.log(episodeAdded++);
            //console.log(event.target);

            /*const episodeContainer = document.querySelector(".sc-hqGPoI.fdMSID");
            const episodeTrack = episodeContainer.querySelector(".slick-track");

            const episodeCount = episodeTrack.childNodes.length;

            episodeAdded++;
            if(episodeAdded >= episodeCount) {
                episodeAdded = 0;
            }

            const episodeItem = episodeTrack.childNodes[episodeAdded - 1];
    
            const episodeCoverIMG = episodeItem.querySelector("img");
            const episodeTitleP = episodeItem.querySelector("p");
            const episodeDescriptionDIV = episodeItem.querySelector(".metadata");
            console.log("COVER: " + episodeCoverIMG.src);
            console.log("TITLE: " + episodeTitleP.innerText);
            console.log("DESCRIPTION: " + episodeDescriptionDIV.innerText);
    
            const episodeUUIDA = episodeItem.querySelector("a");
            console.log("UUID: " + episodeUUIDA.dataset.gv2elementvalue);*/
    
            //redirect to https://www.disneyplus.com/video/ + UUID

        }else if(document.querySelector(".sc-kDgGX") != null) {
            restyle();
        }

        if(document.querySelectorAll("#disneyplusaddon-shelf button")[0] != null && document.querySelectorAll("#disneyplusaddon-shelf button")[1] != null) {

            const backButton = document.querySelectorAll("#disneyplusaddon-shelf button")[0];
            const nextButton = document.querySelectorAll("#disneyplusaddon-shelf button")[1];
            
            if(nextButton.classList.contains("disneyplusaddon-checked") == false) {

                /*SOMETIMeS REALY BUGGY*/

                clickRight();
                function clickRight() {
                    if(nextButton.classList.contains("slick-disabled") == false) {
                        nextButton.classList.add("disneyplusaddon-checked");
                        nextButton.click();
                        setTimeout(() => {
                            clickRight();
                        }, 500);
                    }else {
                        clickLeft();
                    }
                }
                
                function clickLeft() {
                    if(backButton.classList.contains("slick-disabled") == false) {
                        backButton.click();
                        setTimeout(() => {
                            clickLeft();
                        }, 500);
                    }else {
                        console.log("SLIDERS GENERATED");
                    }
                }

            }

        }

        /*if(event.target.nodeName == "IMG" && [...document.querySelectorAll(".sc-kDgGX img")].includes(event.target) == true) {
            upscaleIMG(event.target);
            console.log("UPSCALE IMAGE");
        }else if(event.target.querySelector("img") != null && [...document.querySelectorAll(".sc-kDgGX")].includes(event.target) == true) {
            upscaleOf(event.target.querySelectorAll("img"));
            console.log("UPSCALE OF");
        }*/

        if(event.target.nodeName == "IMG" || event.target.querySelector("img") != null) {
            upscaleAll();
        }

        //console.log(event.target);
    }, false);
}

function restyle() {
    if(document.querySelector(".sc-dEfkYy.OqAbI") != null) {
        const shelf = document.querySelector(".sc-dEfkYy.OqAbI");
        shelf.classList.remove("sc-dEfkYy", "OqAbI");
        shelf.id = "disneyplusaddon-shelf";
    }

    if(document.querySelectorAll(".sc-kDgGX:not(:has(.sc-imAxmJ.eOFVeq))") != null) {
        const recommendations = document.querySelectorAll(".sc-kDgGX:not(:has(.sc-imAxmJ.eOFVeq))")[0];
        recommendations.id = "disneyplusaddon-recommendations";
    }

}


function upscaleAll() {
    for(let img of document.querySelectorAll(".sc-kDgGX img")) {
        let oldSrc = img.src;
        let newSrc = oldSrc.replaceAll("width=400", "width=800");
        if(oldSrc != newSrc) {
            img.src = img.src.replaceAll("width=400", "width=800");
            //img.style.borderRadius = "5rem";
        }
    }
}

function upscaleOf(query) {
    //document.querySelectorAll(".sc-kDgGX img")
    for(let img of query) {
        img.src = img.src.replaceAll("width=400", "width=800");
        img.style.borderRadius = "5rem";
    }
}
function upscaleIMG(img) {
    img.src = img.src.replaceAll("width=400", "width=800");
    img.style.borderRadius = "5rem";
}

function changeEpisodeView() {
    
    var firstEpisodeItem = undefined;

    const episodeContainer = document.querySelector(".sc-hqGPoI.fdMSID");
    const episodeTrack = episodeContainer.querySelector(".slick-track");


    const episodeView = document.createElement("section");
    episodeView.id = "#disneyplusaddon-episodeView";
    episodeContainer.parentNode.insertBefore(episodeView, episodeContainer);


    const episodeCount = episodeTrack.childNodes.length;
    console.log("COUNT: " + episodeCount);

    for(const episodeItem of episodeTrack.childNodes) {

        if(firstEpisodeItem == undefined) {
            firstEpisodeItem = episodeItem;
        }

        const episodeCoverIMG = episodeItem.querySelector("img");
        const episodeTitleP = episodeItem.querySelector("p");
        const episodeDescriptionDIV = episodeItem.querySelector(".metadata");
        console.log("COVER: " + episodeCoverIMG.src);
        console.log("TITLE: " + episodeTitleP.innerText);
        console.log("DESCRIPTION: " + episodeDescriptionDIV.innerText);

        const episodeUUIDA = episodeItem.querySelector("a");
        console.log("UUID: " + episodeUUIDA.dataset.gv2elementvalue);

        //redirect to https://www.disneyplus.com/video/ + UUID

    }

}

function addControlLeftStream() {

    const streamControl = document.createElement("div");
    streamControl.id = "disneyplusaddon-controlLeftStream";
    streamControl.classList.add("control-icon-btn");

    streamControl.addEventListener("click", () => {
        openWindow("http://viewer.spacedesk.net/?disneyplusaddon");
    });

    document.querySelector(".controls__left").appendChild(streamControl);

}

function addNavigations() {

    const navList = document.getElementById("nav-list");
    if(navList == null) {
        return;
    }

    enabledNavigations = true;

    const navBackSpan = document.createElement("span");
    navBackSpan.id = "disneyplusaddon-navBackSpan";
    navBackSpan.classList.add("sc-hIVACf", "kuaziE", "item");

    navBackSpan.addEventListener("click", function() {
        history.back();

        setTimeout(() => {
            //addNavigations();
        }, 10);
    });

    const navBackSpanA = document.createElement("a");
    const navBackSpanASpan = document.createElement("span");
    navBackSpanASpan.classList.add("icon--plus", "icon--size-36");
    navBackSpanASpan.style.boxSizing = "border-box";
    navBackSpanASpan.style.padding = "10px";
    navBackSpanASpan.style.background = "center/cover url('" + chrome.runtime.getURL("rsc/WhiteBack.png") + "') no-repeat content-box";

    //const navBackSpanASpanSvg = document.createElement("svg");
    //const navBackSpanASpanSvgPath = document.createElement("path");
    const navBackSpanAP = document.createElement("p");
    navBackSpanAP.innerText = "Zurück";
    navBackSpanAP.classList.add("page-nav", "page-nav--small", "text-color--primary", "margin--left-2", "page-nav");
    /*
    padding: 2px 0px; white-space: nowrap;
    */
    navBackSpanAP.style.padding = "2px 0px";
    navBackSpanAP.style.whiteSpace = "nowrap";

    navBackSpan.appendChild(navBackSpanA);
    navBackSpanA.appendChild(navBackSpanASpan);
    navBackSpanA.appendChild(navBackSpanAP);

    //const navListLogo = navList.childNodes[0];
    navList.insertBefore(navBackSpan, navList.childNodes[1]);

}






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
        //addNavigations();
        createNavigations();
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