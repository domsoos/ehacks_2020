var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var height = canvas.height;
var width = canvas.width;
var context = canvas.getContext('2d');
// tf.loadLayersModel(‘model/model.json’).then(function(model) {
//   window.model = model;
// });

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
      context.drawImage(img,0,0);/*
        var oc = document.createElement('canvas'),octx = oc.getContext('2d');
        oc.width = 320;
        oc.height = 280;
        canvas.width = oc.width;
        canvas.height = oc.height;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        octx.drawImage(oc, 0, 0, oc.width, oc.height);
        context.drawImage(oc, 0, 0, oc.width, oc.height,0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);*/
      }
      //finalImage = new Image();
      //finalImage.src = canvas.toDataURL("image/png")
      //finalImage.onload = function(){
       // context.drawImage(finalImage,20,20)
      //}

  /*  var input = [];
  for(var i = 0; i < data.length; i += 4) {
    input.push(data[i + 2] / 255);
  }*/

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
