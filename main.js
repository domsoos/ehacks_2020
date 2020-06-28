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

  // Turn grayscale image into a 2D array
  async function loadLocalImage(img) {
      return new Promise((res,rej)=>{
      imageGet(filename, (err, info) => {
      if(err){
         rej(err);
         return;
      }
        const image = tf.fromPixels(info.data)
        console.log(image, '127');
        res(image);

      });// end imageGet function

    })// end Promise function

    };//end loadLocalImage function
    
  } // end onload function
/*
    // 2D array sent through our model
    const MODEL_URL = "https://github.com/domsoos/ehacks_2020/tree/master/tfjs_model/model.json";
    const model = await tf.loadLayersModel(MODEL_URL);
    console.log(model.summary());
    const input = tf.tensor2d([10.0],[1,1]);
    // Predict if it ishealthy or not
    const result = model.predict(input);
    console.log(result);

    // alert the results
    alert(result);


        var oc = document.createElement('canvas'),octx = oc.getContext('2d');
        oc.width = 320;
        oc.height = 280;
        canvas.width = oc.width;
        canvas.height = oc.height;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        octx.drawImage(oc, 0, 0, oc.width, oc.height);
        context.drawImage(oc, 0, 0, oc.width, oc.height,0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);*/
      
      //finalImage = new Image();
      //finalImage.src = canvas.toDataURL("image/png")
      //finalImage.onload = function(){
       // context.drawImage(finalImage,20,20)
      //}

  /*  var input = [];
  for(var i = 0; i < data.length; i += 4) {
    input.push(data[i + 2] / 255);
  }*/

      context.drawImage(img,0,0);
    

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
