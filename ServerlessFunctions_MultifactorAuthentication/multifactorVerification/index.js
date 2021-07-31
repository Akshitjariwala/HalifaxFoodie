const mysql = require('mysql');
const aws = require('aws-sdk');

var conn = mysql.createConnection({
    host     : 'project-5410.cmbmize6ljqo.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'serverless',
    database : 'halifaxfoodie'
});


exports.handler = async (event, context, callback) => {
    
    conn.connect(function(err){
    if(err){
        const response = {
        statusCode: 400,
        body: JSON.stringify('Connection Failed'),
        };
        return response;
        }
    });
        const data = event.queryStringParameters;
        const userID  = data.userID;
        const role = data.role;
        
        var jsonObject = {};
    
        if(role === "user"){
            var sql = "SELECT security_question , user_response FROM user_multifactor_response rmr INNER JOIN security_questions sq ON rmr.security_question_id = sq.security_question_id where user_id = '"+userID+"'";
            var result = await fetchQuery(sql,conn);
            console.log(result);
            Object.keys(result).forEach(function(key) {
                var security_question = result[key].security_question;
                var answer = result[key].user_response;
                jsonObject["securityQuestion"] = security_question;
                jsonObject["answer"] = answer;
                console.log(security_question+"  "+answer);
            });
        } else {
            var sql = "SELECT security_question , restaurant_response FROM restaurant_multifactor_response rmr INNER JOIN security_questions sq ON rmr.security_question_id = sq.security_question_id where restaurant_id = '"+userID+"'";
            var result = await fetchQuery(sql,conn);
            console.log(result);
            Object.keys(result).forEach(function(key) {
                var security_question = result[key].security_question;
                var answer = result[key].restaurant_response;
                jsonObject["securityQuestion"] = security_question;
                jsonObject["answer"] = answer;
                console.log(security_question+"  "+answer);
            });
        }
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(Object.assign({},jsonObject)),
        };
        
        return response;
};

function fetchQuery(sql,conn) {
    return new Promise((resolve, reject) => {
         conn.query(sql, function (err, result) {
            if (err) {reject(err);}
            else {
                return resolve(result);
            }
        });
    });
}