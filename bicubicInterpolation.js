//
// Anton Lygin, 25 Jan 2016 v0.1.1
// bicubic-img-interpolation-plugin

var drawCanvas = function(can, imgW, imgH, src, callback, id, classAttr) {

    var ctx = can.getContext('2d');

    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); //tainted canvases may not be exported chrome, check for ie
    var w = imgW;
    var h = imgH;
    img.onload = function() {

        // Step it down several times
        var can2 = document.createElement('canvas');
        can2.width = w;
        can2.height = h;
        var ctx2 = can2.getContext('2d');

        // Draw it at 1/2 size 3 times (step down three times)
        ctx2.drawImage(img, 0, 0, w/2, h/2);
        ctx2.drawImage(can2, 0, 0, w/2, h/2, 0, 0, w/4, h/4);
        ctx2.drawImage(can2, 0, 0, w/4, h/4, 0, 0, w/6, h/6);
        ctx.drawImage(can2, 0, 0, w/6, h/6, 0, 0, w/6, h/6);
        if(callback) {
        	callback(can, this.src, id, classAttr);
        }
    }

    img.src = src; //'?' + new Date().getTime(); //timestamp might be required //stop GET request caching
}

var drawHighResolutionImgThumbnail = function(can, attrSrc, id, classAttr) {
  debugger;
	var imgSrc = can.toDataURL("image/png");  //.replace("image/png", "image/octet-stream")
  var imageEl = document.createElement('img');
  imageEl.src = imgSrc;
  imageEl.width = can.width;
  imageEl.height = can.height;
  $(imageEl).attr('data-src', attrSrc)
  if(id) {
  		$(imageEl).attr('id', id)
  }
  if(classAttr) {
  		$(imageEl).attr('class', classAttr)
  }
  $(can).after(imageEl);
  $(can).remove();
};

$('img.first').each(function() {
			var src = $(this).attr('src');
      var imgW = this.width;
      var imgH = this.height;
      var displayNone = ""; //style='display: none'";
      $(this).after("<canvas " + displayNone + " width='" + imgW +  "' height='" + imgH + "'></canvas>");
      var can = $(this).next()[0];
      var callback = drawHighResolutionImgThumbnail;
      drawCanvas(can, imgW*6, imgH*6, src, callback, $(this).attr('id'), $(this).attr('class'));
      $(this).remove();
});

// parameters
// convertTo: 'img', 'canvas'
// getRequestTimestamp: false, //addTimetampToImgUrl
// dataScr: true, //copy scr attribute to data-src of result el
// attrs: [] //width, height, id, class
// - canvas 2d vs WebGL
// - crossOrigin: 'anonymous'
