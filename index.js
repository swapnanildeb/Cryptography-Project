// npm install sendgrid
// npm install express
// node .

var sendgrid = require('sendgrid')('convoencryption', 'convo');
var express = require('express');
var app = express();
var path = require('path');

//app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.set('public', path.join(__dirname, 'site'));
app.use(express.static(path.join(__dirname, 'site')));

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'site/index.html'));
  console.log('Someone visited the website!!');
  var timestamp = Number(new Date());
});

app.post('/send', function(req, res) {
  var m = encrypt(req.param('body')).join(' ');

  sendgrid.send(
  {
    to: req.param('to'),
    from: req.param('from'),
    subject: req.param('subject'),
    text: m + '\n\n  To see decrypted message, go to http://localhost:8008/decrypt?message=' + m.replace(/\s/g, '%20')
  }, function(err, data) {
    if (err) {
    res.sendfile(path.join(__dirname, 'site/send-message.html'));
    } 
  });
});

app.get('/decrypt', function(req, res) {
  res.json({ 'message': decrypt(req.param('message').split(' '))});
});

function rand(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function encrypt(m) {
  var a, b, c, d, e, f;
  var rtn = [];

  for (var i = 0; i < m.length; i++) {
    c = m.charCodeAt(i);
    console.log(c);
    d = Math.ceil(c / 2);

    a = ( 15000000 * ( d + 1 ) );
    b = rand( a, a + 15000000 );
    
    f = Number( c % 2 == 0 );

    b += (b % 2 == f)?((f?-1:1) * 1):0;

    rtn.push(b);
  }

  return rtn;
}

function decrypt(m) {
  var x;
  var a = '';
  for ( var i in m ) {
    x = Math.floor(m[i] / 7500000); 

    if (m[i] % 2 === 0) {
      if (x % 2 === 1)
        x = (x - 3);
      else
        x = (x - 2);
    } else {
      if (x % 2 === 0)
        x = (x - 3);
      else
        x = (x - 4);
    }

    a += String.fromCharCode(x);
  }
  return a;
}

app.listen(8008);