'use strict';
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "admin",
    host: "project.ccopoxupfja7.us-east-1.rds.amazonaws.com",
    password: "Saibaba25",
    database: "project",
});

//-------------------Callbacks--------------------------------

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function elicitSlot(sessionAttributes, intentName, slots, slotToElicit) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName: intentName,
            slots: slots,
            slotToElicit: slotToElicit
        }

    };
}

//-------------Functions----------------------------------------------------

const executeQuery = async(query) => {

    return await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};


const orderStatus = async(id) => {
    let result;
    return await executeQuery(`Select orderStatus from orders where orderId= ${id}`).then((status) => {
        result = JSON.parse(JSON.stringify(status))[0].orderStatus;
        console.log('ans', result);
        return {
            isError: false,
            result
        };
    }).catch(() => {
        return {
            isError: true
        };
    });

};

const navigation = (tab) => {
    let result;
    tab = tab.toLowerCase();
    if (tab === "order" || tab === "all restaurants") {
        result = "https://ui-66eshghvya-de.a.run.app/restaurantList";
    } else if (tab === "previous orders") {
        result = "https://ui-66eshghvya-de.a.run.app/orders";
    } else if (tab === "chat") {
        result = "https://ui-66eshghvya-de.a.run.app/chatHome";
    }
    return result;

};

const rating = async(id, rating) => {
    return await executeQuery(`Update orders set rating= ${rating} where orderId= ${id}`).then(() => {
        return {
            isError: false
        };
    }).catch(() => {
        return {
            isError: true
        };
    });
};

// --------------- Events -----------------------


async function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const intentName = intentRequest.currentIntent.name;
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    let answer;

    if (intentName == 'OrderStatus') {
        answer = await orderStatus(slots.orderId);
        db.end();

        if (!answer.isError) {
            callback(close(sessionAttributes, 'Fulfilled', {
                'contentType': 'PlainText',
                'content': `Your order has been ${answer.result}`
            }));
        } else {
            callback(elicitSlot(sessionAttributes, intentName, slots, 'orderId'));

        }
    } else if (intentName == 'Navigation') {
        answer = await navigation(slots.tabName);
        console.log('nav', answer);
        if (answer)
            callback(close(sessionAttributes, 'Fulfilled', {
                'contentType': 'PlainText',
                'content': `Please go here ${answer}`
            }));
        else
            callback(elicitSlot(sessionAttributes, intentName, slots, 'tabName'));

    } else {
        answer = await rating(slots.orderId, slots.rating);
        db.end();
        console.log(answer);

        if (!answer.isError) {
            callback(close(sessionAttributes, 'Fulfilled', {
                'contentType': 'PlainText',
                'content': `Thanks for your time.`
            }));
        } else {
            callback(elicitSlot(sessionAttributes, intentName, slots, 'orderId'));

        }
    }}


// --------------- Main handler -----------------------

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};