var express = require('express');
var chalk = require('chalk');
var STS = require('ali-oss').STS;
var co = require('co');
var fs = require('fs');
var secret = require('../secret/index')
var app = express();

function getProlicy (path, strUser) {
  var dir = path + strUser
  return JSON.stringify({
    "Statement": [
      {
        "Action": [
          "oss:GetObject",
          "oss:PutObject",
          "oss:ListParts",
          "oss:AbortMultipartUpload",
        ],
        "Effect": "Allow",
        "Resource": ["acs:oss:*:*:" + dir, "acs:oss:*:*:" + dir + '*']
      }
    ],
    "Version": "1"
  })
}

var client = new STS({
  accessKeyId: secret.aliOSS.accessKeyId,
  accessKeySecret: secret.aliOSS.accessKeySecret,
});
var ossRegion = 'oss-cn-beijing'
var ossBucket = 'rishiqing-file'
var ossRootPath = 'dingtalk/'
var roleArn = secret.aliOSS.roleArn
var sessionName = 'dingtalkAppUser'
var expiration = 900
var port = 8300

//  跨域访问
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/sts/:userId', function (req, res) {
  var userId = req.params.userId
  if (!userId) {
    return res.status(400)
  }
  var policy = getProlicy(ossBucket + '/' + ossRootPath, userId)

  co(function* () {
    var result = yield client.assumeRole(roleArn, policy, expiration, sessionName);
    console.log(result);

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-METHOD', 'GET');
    res.json({
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
      Expiration: result.credentials.Expiration
    });
  }).then(function () {
    // pass
  }).catch(function (err) {
    console.log(err);
    res.status(400).json(err.message);
  });
});

app.listen(port, function () {
  console.log(chalk.blue('>>app started at port:' + port))
});
