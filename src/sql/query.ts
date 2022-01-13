import mysql from 'mysql';

// 数据库查询方法
export function SQLQuery(target: mysql.Connection, SQL: any, values?: any) {
  return new Promise(function (resolve, reject) {
    target.query(SQL, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export default SQLQuery;
