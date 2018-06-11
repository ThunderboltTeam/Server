const mysql = require('promise-mysql');			// mysql 모듈의 promise 버전

// rds 정보 입력 : hostname, username, password, default DB
const dbConfig = {
	host : 'flashmobdb.cs0c0z8pkzpi.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'minha',
	password : '44444444',
	database : 'flashmob',
	connectionLimit : 20
};

module.exports = mysql.createPool(dbConfig);	// connection pool을 module화