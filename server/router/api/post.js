var paypal = require('paypal-rest-sdk');

var clientId = '';
var secret = '';

paypal.configure({
  'mode': 'sandbox', //sandbox or live
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
    if (err) {
        console.log(err.response);
        throw err;
    } else {
        console.log("Create webhook Response");
        console.log(webhook);
    }
});