'use strict';
var dynode = require('dynode');
var SabreDevStudio = require('sabre-dev-studio');
var sabreDevStudio = new SabreDevStudio({
  client_id:     'V1:zig33o2alm4sk0uq:DEVCENTER:EXT',
  client_secret: 'reB30NcJ',
  uri:           'https://api.test.sabre.com'
});
var options = {};
var client = new (dynode.Client)({
        region: "us-west-2",
        accessKeyId: "AKIAJDPAR46ZOJ2DQJJQ",//"AKIAIYT7M33CMU2SK73A", 
        secretAccessKey: "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"//"eFqGI97CqXpkUhN7aqSloVFPfiA+YhKfJPegC0Ee"
    });

module.exports = function(app) {
  app.get('/api/v1/themes', function(req,res) {
    var city=req.query.dest;
    var category=req.query.theme;

    //sabreCall('/v1/lists/supported/shop/themes', res);
    GetItems(city,category,res);

  });

  /*app.get('/api/v1/routes', function(req,res) {
    sabreCall('/v1/shop/flights/fares?origin=CLT&departuredate=2015-10-15&returndate=2015-10-25', res);
  });

  app.get('/api/v1/top', function(req,res) {
    sabreCall('/v1/lists/top/destinations?origin=NYC&lookbackweeks=8&topdestinations=5', res);
  });

  app.get('/api/v1/cities', function(req,res) {
    client.scan("traveldb",function(err,resp){
      console.log(resp);
      console.log("testend");
      sabreCall('/v1/lists/supported/cities', res);
    });
  });

  app.get('/api/v1/places', function(req,res) {
    sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
    '&departuredate=' + req.query.departuredate +
    '&returndate=' + req.query.returndate +
    '&maxfare=' + req.query.maxfare, res);
  });*/

};

/*function sabreCall(q, res) {
  sabreDevStudio.get(q, options, function(err, data) {
    response(res, err, data);
  });
}*/

function GetItems(city,category,res){
  var opts;
  if(city!=null&&category!=null){
    opts = {
      ScanFilter : {"DEST":{"AttributeValueList":[{"S":city}],"ComparisonOperator":"EQ"},"CATEGORY":{"AttributeValueList":[{"S":category}],"ComparisonOperator":"EQ"}}
    };
  }
  else if(city!=null){
    opts = {
      ScanFilter : {"DEST":{"AttributeValueList":[{"S":city}],"ComparisonOperator":"EQ"}}
    };
  }
  else if(category!=null){
    opts = {
      ScanFilter : {"CATEGORY":{"AttributeValueList":[{"S":category}],"ComparisonOperator":"EQ"}}
    };
  }

  client.scan("traveldb",opts,function(err,resp){
    //console.log(resp);
    response(res,err,resp);
  });
}

function response(res, err, data) {
  if (err) {
    res.status(200).send({
      'status': false,
      'message': 'Error',
      'info': err
    });
  } else {
    res.status(200).send({
      'status': true,
      'message': 'Success',
      'info': data
    });
  }
}
