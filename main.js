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

let model = null;

async function loadNeuralNet() {

  model = await tf.loadLayersModel("https://domsoos.github.io/projects/tfjs_model/model.json");
}

document.getElementById("snap").addEventListener("click", function() {
  var img = new Image();
  // Turns it to grayscale image
  img.src=gray(img);
  img.onload = function () {

      context.drawImage(img,0,0);
    }

    loadNeuralNet();
    console.log(predict(img).dataSync());

  }, false);

  let predict = (r) => {
    tensor = tf.tensor(r, [320, 280, 1], 'float32');
    tensor = tf.expandDims(tensor, 0);
    return model.predict(tensor);
  };


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
          }// end for
      }// end for
      context.putImageData(imgPixels, imgW, imgH);
      return canvas.toDataURL("image/png");
  }// end gray function

  /*<script type = "text/javascript">
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var MODEL_URL = 'https://domsoos.github.io/projects/tfjs_model/model.json'


	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
					video.srcObject = stream;
					video.play();
			});
	}
	tf.loadLayersModel(MODEL_URL).then(function(model) {
 		window.model = model;
		});
	// (async () => {
	//
	// 	model = await tf.loadLayersModel(MODEL_URL);
	// })();
	document.getElementById("snap").addEventListener("click", function() {
		var img = new Image();
				img.src=gray(img);
			//img.src = canvas.toDataURL("image/png");
			img.onload = function () {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(img,0,0,320,280);
				const input = tf.browser.fromPixels(img);
				console.log(window.model.summary());
				const result = window.model.predict(input);
				alert(result);
			}
			img.src = canvas.toDataURL("image/png")

		}, false);

		function gray(imgObj) {


				var imgW = imgObj.width;
				var imgH = imgObj.height;


				context.drawImage(video, 0, 0,canvas.width,canvas.height);
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
		</script>*/
