const Client = require('ssh2-sftp-client');
const fs = require('fs');

const sftp = new Client();
sftp.connect({
  host: '101.132.153.188',    // ftp服务器ip地址
  port: '22',                 // ftp服务器port
  username: 'sand',           // 你的登录用户名
  password: 'loveyoung365!',  // 你的密码
  privateKey: fs.readFileSync('/Users/yourname/.ssh/id_rsa'), // 私钥
  passphrase: 'yourpass', // 私钥密码
}).then(() => {
  console.log('FTP 服务器连接成功');
}).catch(err => {
  console.error(err, 'catch error');
});

module.exports = sftp;
