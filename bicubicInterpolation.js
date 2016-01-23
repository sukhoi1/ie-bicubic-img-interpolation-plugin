//
// Anton Lygin, 25 Jan 2016
// bicubic-img-interpolation-plugin

var drawCanvas = function(can, imgW, imgH, src, callback, imgEl) {

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
        	callback(can, this.src, imgEl);
        }
    }

    img.src = src; //'?' + new Date().getTime(); //timestamp might be required //stop GET request caching
}

var drawHighResolutionImgThumbnail = function(can, attrSrc, imgEl) {
  $(imgEl).attr('src', can.toDataURL("image/png"));
  $(imgEl).attr('data-src', attrSrc);
};

$('img.first').each(function() {
			var src = $(this).attr('src');
      var imgW = this.width;
      var imgH = this.height;
      $(this).after("<canvas style='display: none' width='" + imgW +  "' height='" + imgH + "'></canvas>");
      var can = $(this).next()[0];
      var callback = drawHighResolutionImgThumbnail;
      drawCanvas(can, imgW*6, imgH*6, src, callback, this);
});
