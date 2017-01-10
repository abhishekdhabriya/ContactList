'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

var axios = require('axios');
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

app.get('/api/contacts', function (req, res) {

  axios({
    method: 'get',
    url: 'http://localhost:8383/api/contacts',
    auth: {
      username: 'joe',
      password: 'password'
    }
  })
    .then((response) => {

      setTimeout(() => {
        res.send(response.data);
      }, 3000);


    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/api/contacts', function (req, res) {
  axios({
    method: 'post',
    url: 'http://localhost:8383/api/contacts',
    auth: {
      username: 'joe',
      password: 'password'
    },
    data: req.body,
    responseType: 'json'

  })
    .then((response) => {
      setTimeout(() => {
        var responseObject = {
          headers: response.headers,
          status: response.status,
          data: response.data
        };
        console.log(responseObject);
        res.send(responseObject);
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put('/api/contacts/:id', function (req, res) {
  console.log('************** put **********');
  console.log(req);
  axios({
    method: 'put',
    url: `http://localhost:8383/api/contacts/${req.params.id}`,
    auth: {
      username: 'joe',
      password: 'password'
    },
    data: req.body,
    responseType: 'json'

  })
    .then((response) => {
      setTimeout(() => {
        var responseObject = {
          headers: response.headers,
          status: response.status,
          data: response.data
        };
        console.log(responseObject);
        res.send(responseObject);
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/*', function (req, res) {
  res.render('index', {
    env: env
  });
});


var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
