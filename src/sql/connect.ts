import mysql from 'mysql';

export function connect(options: string | mysql.ConnectionConfig): mysql.Connection {
  const connect = mysql.createConnection(options);

  // 建立连接
  connect.connect((err) => {
    // 如果建立连接失败
    if (err) {
      console.log(err);
    } else {
      console.log('数据库连接成功');
    }
  });

  return connect;
}

export default connect;
