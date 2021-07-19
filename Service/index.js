const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "34.66.231.211",
  password: "Sai@baba25",
  database: "assignment2a",
  socketPath: "/cloudsql/firm-solution-313618:us-central1:assignment2a"
});


app.post("/login", (req, res) => {
  let payload = req.body;
  db.query("SELECT * FROM details WHERE email = ? AND password = ?",
  [payload.email, payload.password],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "UPDATE status SET status = ? WHERE status_email = ?",
          ["ONLINE", payload.email],
          (err) => {
            if (err) {
              console.log(err);
              res.status(400).send({message:err.sqlMessage});
            } else {
              res.send(payload);
            }
          }
        );
      } else {
        console.log(err);
        res.status(400).send({message:"Please check your credentials"});
      }
    }
  )
});


app.listen(3001, () => {
  console.log("Login server is running on port 3002");
}); 