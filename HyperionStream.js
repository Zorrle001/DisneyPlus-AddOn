window.onload = function() {

	chrome.runtime.connect({ name: "DisneyPlusStream" });

	let serverIP = document.getElementById("server");
	serverIP.value = "192.168.178.37";
	let loginButton = document.getElementById("buttonLogin");
	loginButton.click();
	
	//HYPERION CODE
	var socket = new WebSocket("ws://192.168.178.80:8090/");

	/*socket.onmessage = function (event) {
		console.log(event.data);
	}*/
	socket.onopen = function() {
		func();
	}

	const inputCanvas = document.getElementById("viewCanvas");
	const canvas1 = document.createElement('canvas'); 
	const canvas2 = document.createElement('canvas');

	var run = true;

	function func() {
		
		canvas1.width = inputCanvas.width / 16;
		canvas1.height = inputCanvas.height / 16;
		canvas1.getContext('2d').drawImage(inputCanvas, 0, 0, inputCanvas.width / 16, inputCanvas.height / 16);

		canvas2.width = canvas1.width;
		canvas2.height = canvas1.height;
		canvas2.getContext('2d').drawImage(canvas1, 0, 0, canvas1.width, canvas1.height);  
		
		imagejson = {
			"command": "image",
			"imagedata": "", // als base64!
			"name": "SpaceDesk Stream",
			"format": "auto",
			"priority":50,
			"origin": "Disney+ Stream"
		}
		base64 = canvas2.toDataURL(); 
		base64 = base64.replace("data:image/png;base64,", "");
		imagejson["imagedata"] = base64;
		socket.send(JSON.stringify(imagejson));

		setTimeout(() => {
			if(run == true) {
				func();
			}	
		}, 1000/30);
		// 24 to 30

	}
	
}

console.log("LOADED!");