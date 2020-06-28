var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
canvas = canvas.getContext('2d');
var image;

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}
document.getElementById("snap").addEventListener("click", function() {
	canvas.drawImage(video, 0, 0, 640, 480);
    image = convertCanvasToImage(canvas);
});

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
