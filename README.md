# ie-bicubic-img-interpolation-plugin
ie-bicubic-img-interpolation-plugin depends on jQuery library and canvas.

IE img interpolation issue is fixed by substituting the low rendering quality image with a canvas of the same size.
The plugin can imitate -ms-interpolation-mode bicubic scaling for IE9+ browsers.

The algorithm is applied per selector image.
Important: This plugin should not be used for *.png images with no background.
