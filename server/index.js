var bodyParser = require('body-parser');
var http = require('http');
var app = require('express')();
var paypal = require('paypal-rest-sdk');

var clientId = '';
var secret = '';
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log(JSON.stringify(req.body));
});

http.createServer(app).listen(3001, function () {
   console.log('Server started: Listening on port 3001');
});

paypal.configure({
  'mode': 'sandbox',
  'client_id': clientId,
  'client_secret': secret
});
var webhooks = {
    "url": "",
    "event_types": [{
        "name": "PAYMENT.SALE.COMPLETED"
    },{
        "name": "PAYMENT.SALE.DENIED"
    }
]};

paypal.notification.webhook.create(webhooks, function (err, webhook) {
    console.log(err,webhook,'ERROR fsgf')
    if (err) {
        console.log(err.response);
        throw err;
    } else {
        console.log("Create webhook Response");
        console.log(webhook);
    }
});