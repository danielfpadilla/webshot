var express = require('express'),
    app = express(),
    webshot = require('../lib/webshot'),
    bodyParser = require('body-parser'),
    path = require('path');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join('app/index.html'), {root: '../'});
});

screenShotRoute = app.route('/screenshot');
screenShotRoute.post(function(req, res) {
    var body = req.body,
        url = body.url,
        filename = body.filename,
        opt = {
            shotSize: {
                width: 1024,
                height: 'all'
            }
        };

    if (url && filename) {
        filename = 'files/' + filename + '.png';

        webshot(url, 'public/' + filename, opt, function(err) {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                filename = req.protocol + '://' + req.get('host') + '/'+ filename;

                console.log(filename);

                res.send(filename);
            }
        });
    } else {
        res.status(400).send({ error: 'Invalid model' });
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});