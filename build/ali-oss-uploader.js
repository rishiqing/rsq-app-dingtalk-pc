var chalk = require('chalk')
var path = require('path')
var url = require('url')
var OSS = require('ali-oss')
var readdir = require('recursive-readdir')
var secret = require('../secret')
var STS = OSS.STS;
var co = require('co')
var sts = new STS({
  accessKeyId: secret.aliOSS.accessKeyId,
  accessKeySecret: secret.aliOSS.accessKeySecret,
});
var ossRegion = 'oss-cn-beijing'
var ossBucket = 'rishiqing-front'
var ossRootPath = 'dingtalk/'
var roleArn = secret.aliOSS.roleArn
var sessionName = 'dingtalkFrontUser'
var expiration = 900

var argv = process.argv
if(argv.length < 3){
  return console.log(chalk.white.bgRed(' ERROR '), chalk.red('wrong number of argument, please add the upload directory'))
}
var uploadDir = path.resolve(argv[2])

co(function* () {
  console.log(chalk.blue('>>initializing OSS client...'))
  console.log(chalk.blue('>>  OSS region is ' + ossRegion))
  console.log(chalk.blue('>>  OSS bucket is ' + ossBucket))
  console.log(chalk.blue('>>  OSS root path is ' + ossRootPath))
  var token = yield sts.assumeRole(
    roleArn, '', expiration, sessionName);
  var client = new OSS({
    region: ossRegion,
    accessKeyId: token.credentials.AccessKeyId,
    accessKeySecret: token.credentials.AccessKeySecret,
    stsToken: token.credentials.SecurityToken,
    bucket: ossBucket
  });

  console.log(chalk.blue('>>begin reading directory: ' + uploadDir))
  var files = yield readdir(uploadDir)
  for (var i = 0; i< files.length; i++) {
    var file = files[i]
    var relativePath = path.relative(uploadDir, file)
    var mills = new Date().getTime()
    var uploadName = url.resolve(ossRootPath, relativePath)
    var res = yield client.put(uploadName, file);
    if(res.res.status == 200){
      console.log(chalk.blue('>>---' + (new Date().getTime() - mills) + 'ms, ' + relativePath + ' --> ' + uploadName))
    } else {
      console.log(chalk.white.bgRed(' ERROR '), chalk.red(file + ' --> ' + uploadName))
      console.log(res)
      break
    }
  }
  console.log(chalk.blue('>>finish upload'))
}).catch(function (err) {
  console.log(err);
});


