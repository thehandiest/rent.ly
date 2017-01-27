'use strict'

const bodyParser = require('body-parser')
const dwolla = require('dwolla-v2')
const express = require('express')
const jade = require('jade')
const path = require('path')
const app = express()
const ip = require('ip')
const port = 8090
const headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'multipart/form-data'
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', 'views');

const consumerKey = 'rrHQWA3GRZU1M79HMNm5Btl1CH8aBHrzF5flwlluxtJfmLhqbi'
const consumerSecret = 'xCRcq7j3c9sy6kvDGQyN0e8GOWh12rNua55DpCWAI73bo7eCk6'
const client = new dwolla.Client({
    environment: 'sandbox', // optional - defaults to production
    id: consumerKey,
    secret: consumerSecret
})
// DVfWN5PjIdwIZ6dkpZSB1r3lJDRDe841zi74M7ULMs6uwQh0Dg
app.get('/', function(req, res) {
    res.render('home', {
        title: 'Rent.ly'
    })
})

app.get('/customers', function(req, res) {
    // create a token
    client.auth.client()
        .then(appToken => appToken.get('customers', {
            limit: 10
        }))
        .then(res => console.log(res.body))
})
const addCustomer = function(requestBody) {
    // let requestBody = {
    //     firstName: 'Alvin',
    //     lastName: 'Milton',
    //     email: 'alvin.milton@gmail.com',
    //     type: 'personal',
    //     address1: '207 Winthrop Street',
    //     address2: '2L',
    //     city: 'Brooklyn',
    //     state: 'NY',
    //     postalCode: '11225',
    //     dateOfBirth: '1979-08-16',
    //     // For the first attempt, only the
    //     // last 4 digits of SSN required
    //     // If the entire SSN is provided,
    //     // it will still be accepted
    //     ssn: '3247'
    // }
    client.auth.client()
        .then(appToken => appToken.post('customers', requestBody))
        .then(res => res.headers.get('location')) // => 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'
}

app.post('/register', function(req, res) {
    let customer = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        ipAddress: ip.address()
    }
    console.log(customer)
    addCustomer(customer)
})

app.post('/customer/add', function(req, res) {
    addCustomer()
})

app.run = function() {
    app.listen(port, function() {
        console.log('Server listening on port %s', 8090)
    })
}

module.exports = exports = app.run()
