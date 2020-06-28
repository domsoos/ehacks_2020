var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var height = canvas.height;
var width = canvas.width;
var context = canvas.getContext('2d');



if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}
document.getElementById("snap").addEventListener("click", function() {
  var img = new Image();
  // Turns it to grayscale image
    img.src=gray(img);
    img.onload = function () {

      context.drawImage(img,0,0);
    }
    (async () => {
			var MODEL_URL = "https://github.com/domsoos/ehacks_2020/tree/master/tfjs_model"
	    var model = await tf.loadLayersModel(MODEL_URL);
			const input = tf.fromPixels(img);
      console.log(model.summary());
      const result = model.predict(input);
      alert(result);
		});

  }, false);

  function gray(imgObj) {


      var imgW = imgObj.width;
      var imgH = imgObj.height;


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
