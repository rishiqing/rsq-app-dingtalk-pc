var path = require('path')
var chalk = require('chalk')
var co = require('co')
var Client = require('ssh2-sftp-client');

//  2: localDir 3: host, 4: port, 5: username, 6: privateKey, 7: uploadBasePath
var argv = process.argv
if(argv.length < 3){
  return console.log(chalk.white.bgRed(' ERROR '), chalk.red('wrong number of argument, please add argument 2: localDir 3: host, 4: port, 5: username, 6: privateKey, 7: uploadBasePath'))
}
var localDir = argv[2]
var host = argv[3]
var port = argv[4]
var username = argv[5]
var privateKey = argv[6]
var uploadBasePath = argv[7]

var backupDirName = 'bak'
var indexFileName = 'index.html'

function findFile(listFiles, name){
  return listFiles.find(function(f){
    return f.name == name
  })
}
function getBakIndexName(name){
  return name + '.' + new Date().getTime()
}

co(function* () {
  var sftp = new Client();
  console.log(chalk.blue('>> initializing connection...' + host + ':' + port + ' ' + username))
  yield sftp.connect({
    host: host,
    port: port,
    username: username,
    privateKey: require('fs').readFileSync(privateKey)
  })
  console.log(chalk.blue('>> listing remote base path: ' + uploadBasePath))
  var oldFiles = yield sftp.list(uploadBasePath)
  oldFiles.forEach(function(file){
    console.log(chalk.green('>>--' + file.name))
  })

  if(!findFile(oldFiles, backupDirName)){
    console.log(chalk.blue('>> backup dir not exist, so creating directory: ' + backupDirName))
    yield sftp.mkdir(uploadBasePath + backupDirName + '/')
  }
  var oldIndex = findFile(oldFiles, indexFileName)
  if(oldIndex){
    var oldBakPath = uploadBasePath + oldIndex.name
    var newBakPath = uploadBasePath + backupDirName + '/' + getBakIndexName(oldIndex.name)
    console.log(chalk.blue('>> old file ' + oldBakPath + ' exists, so moving to backup dir ' + newBakPath))
    yield sftp.rename(oldBakPath, newBakPath)
  }
  var localPath = localDir + indexFileName
  var remotePath = uploadBasePath + indexFileName
  var mills = new Date().getTime()
  console.log(chalk.blue('>> uploading ' + localPath + ' --> ' + remotePath))
  yield sftp.put(localPath, remotePath)
  console.log(chalk.blue('>> finished in ' + (new Date().getTime() - mills) + 'ms'))

  process.exit()
}).catch(function (err) {
  console.log(err)
  process.exit()
})
