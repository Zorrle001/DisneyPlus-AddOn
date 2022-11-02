/*chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['insert.js']
  });
});*/

/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	setTimeout(function() {
	  chrome.browserAction.setBadgeText({text:String(i)});
	  i++;
	}, 4000);
  });
});*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello") {
		sendResponse({farewell: "goodbye"});
		setTimeout(function() {
		    chrome.browserAction.setBadgeText({text:String(i)});
		    i++;
		}, 4000);
	}
  }
);



var socket = new WebSocket("ws://192.168.178.80:8090/");
const disneyPlusStreamPriority = 50;

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "DisneyPlusStream") {
        console.log("DisneyPlusStream startet");

        port.onDisconnect.addListener(function() {

            console.log("DisneyPlusStream stopped");

            let clearRequest = {
                "command": "clear",
                "priority": disneyPlusStreamPriority
            }

            socket.send(JSON.stringify(clearRequest));

        });
    }
});