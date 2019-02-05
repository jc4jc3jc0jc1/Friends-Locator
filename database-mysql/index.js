var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mvp'
});

module.exports.selectAll = (callback) => {
  connection.query('SELECT * FROM contacts', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.createOne = (data, callback) => {
  let querySring = 'INSERT INTO contacts (name, phone, email, address) VALUES (?, ?, ?, ?);'
  let params = [data.name, data.phone, data.email, data.address];
  connection.query(querySring, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 1);
    }
  });
};

module.exports.updateOne = (data, callback) => {
  let querySring = 'UPDATE contacts SET phone = ?, email = ?, address = ? WHERE name = ?;';
  let params = [data.phone, data.email, data.address, data.name];
  connection.query(querySring, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 1);
    }
  });
};

module.exports.deleteOne = (data, callback) => {
  let querySring = 'DELETE FROM contacts where name = ?;';
  let params = [data.name];
  connection.query(querySring, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 1);
    }
  });
};








