const mysql = require('mysql');
const aws = require('aws-sdk');

var conn = mysql.createConnection({
    host     : 'project-5410.cmbmize6ljqo.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'serverless',
    database : 'halifaxfoodie'
});

conn.connect();

exports.handler = async (event) => {
    
    var data="";
    data = event.queryStringParameters;
    var userID  = data.userID;
    var securityQuestion = data.securityQuestion;
    var answer = data.answer;
    var role = data.role;
    
   if(role === "user"){
        var sql = "INSERT INTO user_multifactor_response VALUES('"+userID+"','"+securityQuestion+"','"+answer+"')";
    } else {
        var sql = "INSERT INTO restaurant_multifactor_response VALUES('"+userID+"','"+securityQuestion+"','"+answer+"')";
    }
    
    console.log(conn);
    console.log(sql);
    
    await insertEntity(sql);
            
    const response = {
        statusCode: 200,
        body: JSON.stringify('Data Saved to RDS Successfully.'),
    };
    return response;

};

function insertEntity(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, result) {
            if (err) {reject(err);}
            else {
                return resolve(result);
            }
        });
    });
}