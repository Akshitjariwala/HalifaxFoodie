const firebase = require('firebase');
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const functions = require("firebase-functions");
var AWS = require('aws-sdk/dist/aws-sdk-react-native');
// AWS.config.update({region:'us-east-1',accessKeyId: 'ASIAVJDCQO5A3AIOXJKO', secretAccessKey: 'Vv4KaqEmjbHiL1G5gHWRqFcwO9Yg0VCiHJ2VndjY',
// sessionToken:'FwoGZXIvYXdzEMb//////////wEaDPspd1NrhVA/lmqG+SK/AXBQpa9gM5SuZ+jkJenjrwjBjBJE20TxC3v8EDxZpTL3ybtLveu35K/GsMyicH5Zi9pUFbqsOS9vXoQ4FrQ8x3Xu68YLuKs9Up51wbx9AtwfDB5W0LP/P8fFrcbLkSSR1O+DC82N0anOqr4egp64gi81KnXQuaslziXbnxuh17IDOoBHbBGneZDOMd/l4pv9tAKdJoUqW6PGcEchDJZZKXH6qZJUo6Afe67aktqv77lXCpsF0TSYp4GqDB+6mzspKMHp3IcGMi0mFW6stSSK8YyOkrHVJSooomHeO9xctQ4GhQNl+RAOa0baESHi41IkwYLBeyU='});

var lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var apigClientFactory = require('aws-api-gateway-client').default;
config = { invokeUrl: 'https://7qk3g6xwoc.execute-api.us-east-1.amazonaws.com/default/securityQuestion' }
var axios = require('axios');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();

const db = mysql.createConnection({
  user: "admin",
  host: "project.ccopoxupfja7.us-east-1.rds.amazonaws.com",
  password: "Saibaba25",
  database: "project",
});

// To access firebase database.
var firebaseConfig = {
  apiKey: "AIzaSyAQSUDEnIWTE8r2-7PieXAYsmU--JGd4sI",
  authDomain: "halifaxfoodie-1c6fc.firebaseapp.com",
  projectId: "halifaxfoodie-1c6fc",
  storageBucket: "halifaxfoodie-1c6fc.appspot.com",
  messagingSenderId: "662125797776",
  appId: "1:662125797776:web:dda44fb84afcf45de71315"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
app.use(cors());
app.use(express.json());

app.post("/Register", (req, res) => {
  const userdata = req.body;
  const role = req.body.userRole;
  const securityQuestion = req.body.securityQuestion;
  const mfaAnswer = req.body.answer;
  const userDetails = {};
  userDetails["userRole"] = userdata.userRole;
  userDetails["userPassword"] = userdata.userPassword;
  userDetails["userName"] = userdata.userName;
  userDetails["userEmail"] = userdata.userEmail;
  userDetails["contactNumber"] = userdata.contactNumber;
  userDetails["confirmPassword"] = userdata.confirmPassword;
  
  if (userdata.userEmail != "" && userdata.userPassword != "") {
    firebase.auth().createUserWithEmailAndPassword(userdata.userEmail, userdata.userPassword).then((userCredential) => {
      const uid = userCredential.user.uid;
      userDetails["uid"] = uid;
      console.log(userdata.uid)
      firestore.collection('Users').doc(userdata.userEmail).set(userDetails).then(() => {
        console.log('User added!');
        axios.post('https://gnp1skts02.execute-api.us-east-1.amazonaws.com/default/securityQuestion?userID=' + uid + '&securityQuestion=' + securityQuestion + '&answer=' + mfaAnswer + '&role=' + userdata.userRole).then((response) => console.log(response));
      }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        window.alert("Error Message : " + error.message);
        res.status(400).send();
      }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        window.alert("Error Message : " + error.message);
        res.status(400).send();
      });
    })
  } else {
    res.status(400).send();
  }
  res.status(200).send();
});

app.get("/GetRestaurantList", (req, res) => {
  var temp = fetRestaurantList();
  async function fetRestaurantList() {
    var resList = []
    var ref = firestore.collection('Restaurants');
    var refList = await ref.get();
    refList.forEach(doc => {
      var restaurants = {}
      restaurants["userEmail"] = doc.data().userEmail;
      restaurants["restaurantName"] = doc.data().restaurantName;
      restaurants["restaurantEmail"] = doc.data().restaurantEmail;
      restaurants["restaurantAddress"] = doc.data().restaurantAddress;
      restaurants["contactNumber"] = doc.data().contactNumber;
      restaurants["restaurantDescription"] = doc.data().restaurantDescription;
      resList.push(restaurants);
    });
    res.status(200).send({ restaurantList: resList })
  }
});

app.get("/GetMenuList", (req, res) => {
  var restaurant = req.query.payload; 
  temp = fetchMenu(restaurant);
  console.log(restaurant);
  var menuList = []
  async function fetchMenu(restaurant) {
    const resRef = firestore.collection('RestaurantMenuItems');
    const snapshot = await resRef.get();
    snapshot.forEach(doc => {
      var menuItems = {}
      console.log(doc.data().restaurantName+" "+restaurant);
      if (doc.data().restaurantName === restaurant) {
        menuItems["itemName"] = doc.data().itemName;
        menuItems["itemDescription"] = doc.data().itemDescription;
        menuItems["itemPrice"] = doc.data().itemPrice;
        menuList.push(menuItems);
      }
    });
    console.log(menuList)
    res.status(200).send({ menuList: menuList });
  }
});

app.post("/placeOrder", (req, res) => {
  let order = req.body; //req.body;
  console.log(order);
  db.query(
    "INSERT INTO orders (orderStatus, totalCost, customerEmail, restaurantEmail, orderedItems) VALUES (?,?,?,?,?)",
    [order.orderStatus, order.totalCost, order.customerEmail, order.restaurantEmail, JSON.stringify(order.orderedItems)],
    (err) => {
      if (err) {
        console.log('Err in table1', err);
        res.status(400).send({ message: err.sqlMessage });
      } else {
        res.status(200).send(true);
      }
    });
});

app.post("/updateOrder", (req, res) => {
  let order = req.body; //req.body;
  console.log(order);
  db.query(
    "UPDATE orders SET orderStatus = ? WHERE orderId=?",
    [order.update, order.orderId],
    (err) => {
      if (err) {
        console.log('Err in table1', err);
        res.status(400).send({ message: err.sqlMessage });
      } else {
        res.status(200).send(true);
      }
    });
});

app.get("/getOrders", (req, res) => {
  let payload = req.query; //req.body;
  console.log(payload);
  db.query(`SELECT * FROM orders WHERE ${payload.key}='${payload.email}'`, (err, result) => {
    if (err) {
      console.log('Err in table1', err);
      res.status(400).send({ message: err.sqlMessage });
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});


app.post("/FetchRole", (req, res) => {
  var email = req.body.userEmail;
  console.log(req.body);
  var temp = fetchRole(email); //akshit787@gmail.com ownerkfc@gmail.com

  async function fetchRole(userEmail) {
    var userRole;
    const cityRef = firestore.collection('Users').doc(userEmail);
    const doc = await cityRef.get();
    if (doc.exists) {
      console.log("Inside Function");
      var userRef = firestore.collection('Users');
      var snapshot = await userRef.get(userEmail);
      snapshot.forEach(doc => {
        if (doc.id === userEmail) {
          console.log(doc.id, '=>', doc.data());
          userRole = doc.data().userRole;
        }
      });
      console.log(userRole)
      res.status(200).send({ userRole: userRole });
    } else {
      userRef = firestore.collection('Restaurants');
      snapshot = await userRef.get(userEmail);
      snapshot.forEach(doc => {
        if (doc.id === userEmail) {
          console.log(doc.id, '=>', doc.data());
          userRole = doc.data().userRole;
        }
      });
      console.log(userRole)
      res.status(200).send({ userRole: userRole });
    }
  }
});

app.post("/RegisterRestaurant", (req, res) => {
  const restaurantName = req.body.restaurantName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const restaurantData = req.body;
  const securityQuestion = req.body.securityQuestion;
  const mfaAnswer = req.body.answer;
  const role = req.body.userRole;

  const restaurantDetails = {};
  restaurantDetails["userRole"] = restaurantData.userRole;
  restaurantDetails["userPassword"] = restaurantData.userPassword;
  restaurantDetails["restaurantName"] = restaurantData.restaurantName;
  restaurantDetails["userEmail"] = restaurantData.userEmail;
  restaurantDetails["contactNumber"] = restaurantData.contactNumber;
  restaurantDetails["confirmPassword"] = restaurantData.confirmPassword;
  restaurantDetails["restaurantAddress"] = restaurantData.restaurantAddress;
  restaurantDetails["restaurantDescription"] = restaurantData.restaurantDescription;
  restaurantDetails["restaurantEmail"] = restaurantData.restaurantEmail;

  if (userEmail != "" && userPassword != "") {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
      const uid = userCredential.user.uid;
      restaurantDetails["uid"] = uid;
      firestore.collection('Restaurants').doc(userEmail).set(restaurantDetails).then(() => {
        console.log('Restaurent added!');
        axios.post('https://gnp1skts02.execute-api.us-east-1.amazonaws.com/default/securityQuestion?userID=' + uid + '&securityQuestion=' + securityQuestion + '&answer=' + mfaAnswer + '&role=' + role).then((response) =>
          console.log(response));
      }).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        window.alert("Error Message : " + error.message);
        res.status(400).send();
      })
    }).catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      window.alert("Error Message : " + error.message);
      res.status(400).send();
    });
  } else {
    res.status(400).send();
  }
  res.status(200).send();
});

app.post("/Login", (req, res) => {
  const userEmail = req.body.userEmail
  const userPassword = req.body.userPassword
  var uID;
  if (userEmail != "" && userPassword != "") {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
      uID = userCredential.user.uid;
      console.log('User Successfully Logged In.');
      console.log(uID);
      res.status(200).send({uid:uID});
    }).catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      window.alert("Error Message : " + error.message);
      res.status(400).send();
    })
  } else {
    res.status(400).send();
  }
});

app.post("/SaveMenuItem", (req, res) => {
  var menuItem = req.body;
  var docName = req.body.restaurantName + "_" + req.body.itemName
  firestore.collection('RestaurantMenuItems').doc(docName).set(menuItem).then(() => {
    console.log('Menu Item added!');
    res.status(200).send();
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    window.alert("Error Message : " + error.message);
    res.status(400).send();
  })
});

app.post("/getSimilarity", (req, res) => {
  axios.post('https://us-central1-serverless-project-321023.cloudfunctions.net/halifax-foodie-ml', req.body)
    .then((response) => {
      console.log(response.data);
      res.status(200).send({ message: response.data });
    })
    .catch(() => {

    });
  });

  app.post("/PublishChatMessage", (req, res) => {
    console.log("In Publish User Chat.")
    const data = req.body.message;
    const messageBody = data.toString();
    const message = Buffer.from(data);
    const topicName = 'InstantMessaging';
    pubSubClient.topic(topicName).publish(message).then((messageId) => {
      console.log('Message ', { messageId }, 'Sent Successfully');
      res.status(200).send();
    }).catch((err) => {
      console.error('ERROR:', err);
    });
  });
  
  // For Restaurant
  app.post("/PublishChatMessageRestaurant", (req, res) => {
    console.log("In Publish Restaurant Chat.")
    const data = req.body.message;
    const messageBody = data.toString();
    const message = Buffer.from(data);
    const topicName = 'InstantMessagingRestaurant';
    pubSubClient.topic(topicName).publish(message).then((messageId) => {
      console.log('Message ', { messageId }, 'Sent Successfully');
      res.status(200).send();
    }).catch((err) => {
      console.error('ERROR:', err); 
    });
  });
  
  app.get("/GetChatMessage", (req, res) => {
    console.log("In Get User Chat.")
    fetchMessages();
    async function fetchMessages(){
      var messageList = []
      const subscriptionName = "InstantMessagingSub-Restaurant";
      var count = 0;
      var messageName;
      const messageHandler = message => {
        count += 1;
        messageName = 'message_'+count
        messageList.push(message.data.toString());
        message.ack();
      };
      const subscription = pubSubClient.subscription(subscriptionName);
  
      subscription.on('message', messageHandler);
      
      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        if(messageList.length<=0){
          res.status(400).send();
        } else {
          console.log(`${count} message(s) received.`);
          console.log(messageList);
          res.status(200).send({messages:messageList});
        }
      }, 10 * 1000);
    }
  });
  
  app.get("/GetChatMessageRestaurant", (req, res) => {
    console.log("In Get Restaurant Chat.")
    fetchRestaurantMessages();
    async function fetchRestaurantMessages(){
      var messageList = []
      const subscriptionName = "InstantMessagingSub-User";
      var count = 0;
      var messageName;
      const messageHandler = message => {
        count += 1;
        messageName = 'message_'+count
        messageList.push(message.data.toString());
        message.ack();
      };
  
      const subscription = pubSubClient.subscription(subscriptionName);
  
      subscription.on('message', messageHandler);
  
      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        if(messageList.length <= 0){
          res.status(400).send();
        } else {
          console.log(`${count} message(s) received.`);
          console.log(messageList);
          res.status(200).send({messages:messageList});
        }
        
        }, 10 * 1000);
    }
  });
  

app.post("/Logout", (req, res) => {
  console.log("In Log out")
  firebase.auth().signOut().then((err) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send();
    }
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    window.alert("Error Message : " + error.message);
    res.status(400).send();
  })
});

app.listen(3001, () => {
  console.log("Login server is running on port 3001");
});
