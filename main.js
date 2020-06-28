var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
canvas = canvas.getContext('2d');

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}
document.getElementById("snap").addEventListener("click", function() {
  var img = new Image();
  img.onload = function() {
    context.drawImage(video, 0, 0, 28, 28);
    data = context.getImageData(0, 0, 28, 28).data;
    var input = [];
    for(var i = 0; i < data.length; i += 4) {
      input.push(data[i + 2] / 255);
    }
    //predict(input);
  };
  img.src = canvas.toDataURL('image/png');
  }, false);
