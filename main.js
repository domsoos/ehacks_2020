var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var height = canvas.height;
var width = canvas.width;
var context = canvas.getContext('2d');
tf.loadLayersModel('model/model.json').then(function(model) {
  window.model = model;
});

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}
document.getElementById("snap").addEventListener("click", function() {
  var img = new Image();
    img.src=gray(img);
    img.onload = function () {
        context.drawImage(img,0,0);
    }

    var input = [];
  // for(var i = 0; i < data.length; i += 4) {
  //   input.push(data[i + 2] / 255);
  // }

  //predict(input);
  }, false);

  function gray(imgObj) {
      //var canvas = document.createElement('canvas');
      //var context = canvas.getContext('2d');

      var imgW = imgObj.width;
      var imgH = imgObj.height;
    //  canvas.width = imgW;
      //canvas.height = imgH;

      context.drawImage(video, 0, 0,width,height);
      var imgPixels = context.getImageData(0, 0, imgW+1000, imgH+1000);
      for(var y = 0; y < imgPixels.height; y++){
          for(var x = 0; x < imgPixels.width; x++){
              var i = (y * 4) * imgPixels.width + x * 4;
              var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
              imgPixels.data[i] = avg;
              imgPixels.data[i + 1] = avg;
              imgPixels.data[i + 2] = avg;
          }
      }
      context.putImageData(imgPixels, imgW, imgH);
      return canvas.toDataURL("image/png");
  }
