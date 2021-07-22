const firebase = require('firebase');
const express = require("express");
const firestore = firebase.firestore();

const addUser = async(req,res,next) => {
    try{
        const userData = req.body;
        const user = await firestore.collection('users').doc().set(userData);
        res.send('User Saved Successfully.');
    } catch(error){
        res.status(400).send(error.message)
    }
}