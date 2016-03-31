var webshot = require('../lib/webshot'),
    url = 'https://ocado.com/webshop/product/San-Pellegrino-Sparkling-Mineral-Water-Glass-Bottle/16260011',
    file = Date.now() + '.png',
    opt = {
        shotSize: {
            width: 1024,
            height: 'all'
        },
        onLoadFinished: {
            fn: function(status) {
                console.log(status);
            },
            context: {
                tagToReplace: 'h1'
            }
        }
    };


webshot(url, file, opt, function(err) {
    if (err) return console.log(err);
    console.log('OK');
});