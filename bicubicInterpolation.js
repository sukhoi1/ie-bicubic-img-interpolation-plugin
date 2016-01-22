// Anton Lygin
// 25 Jan, 2016
//IE img -ms-interpolation-mode: bicubic fix on page load
var drawCanvas = function(can, imgW, imgH, src) {

    var ctx = can.getContext('2d');

    var img = new Image();
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
    }

    img.src = src;
}

$('img').each(function() {
			var src = $(this).attr('src');
      var imgW = this.width;
      var imgH = this.height;
      $(this).after("<canvas width='" + imgW +  "' height='" + imgH + "'></canvas>");
      var can = $(this).next()[0];
      drawCanvas(can, imgW*6, imgH*6, src);
      $(this).remove();
});
