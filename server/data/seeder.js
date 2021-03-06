// this config sets the stage for the whole simulated operation
const config = {
    DispatcherCount: { min: 2, max: 5 },
    DriverCount: { min: 10, max: 35 },
    ProductTypesPerDriver: { min: 2, max: 20 },
    ProductCountsPerType: { min: 5, max: 100 },
    MessagesPerOrder: { min: 3, max: 7 },
    DeliveryOrderCustomers: { min: 50, max: 200 },
    HubCount: { min: 3, max: 20 }
}

// get mapped locations
var fs = require("fs");
fs.readFile("./data/locations.csv", "utf-8", function(err, buf) {
    let rows = buf.split("\n");
    let locations = [];
    for(var i = 0; i < rows.length; i++){
    var  location =  {
            latDeg: rows[i].split(',')[0].replace('"','').replace('"',''),
            lat: rows[i].split(',')[1].replace('"','').replace('"',''),
            lonDeg: rows[i].split(',')[2].replace('"','').replace('"',''),
            lon: rows[i].split(',')[3].replace('"','').replace('"',''),
            bearing: rows[i].split(',')[2].replace('"','').replace('"',''),
            dist: rows[i].split(',')[3].replace('"','').replace('"','')
        }
        locations.push(location);
    }
});

var writeDataToDB = false;

// bring in models
const User = require('../models/user');
const Driver = require('../models/driver');
const Dispatcher = require('../models/dispatcher');
const DriverTask = require('../models/drivertask');
const InventoryExchangeTask = require('../models/inventoryexchangetask');
const GoToHubTask = require('../models/gotohubtask');
const OrderTask = require('../models/ordertask');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderProduct = require('../models/orderProducts');
const Customer = require('../models/customer');
const Message = require('../models/message');
const InventoryExchangeContract = require('../models/inventoryexchangecontract');
const MessageUser = require('../models/messageuser');
const Profile = require('../models/profile');

// mock data for puffy GraphAPI Endpoint
function buildPuffyWorld() {
    return buildDeliveries(
        {
            drivers: buildDrivers(),
            locations: buildLocations(),
            dispatchers: buildDispatchers(),
            orders: buildOrders(),
            suppliers: buildSuppliers(),
            messages: buildMessages()
        }
    );
}

var SystemMessages = {
    Smooth: [ 
        { from: "puffy-sys", to: "order", body: "Delivery In Route" },
        { from: "puffy-sys", to: "order", body: "Delivery Arrived" },
        { from: "puffy-sys", to: "order", body: "Delivery Complete" }
    ],
    Bumpy: [
        { from: "puffy-sys", to: "order", body: "Delivery In Route" },
        { from: "driver", to: "dipatch", body: "Yo I can't find the address" },
        { from: "dispatch", to: "driver", body: "It's 1243 Sprinkles Way, not 1234" },
        { from: "driver", to: "dispatch", body: "Oh, my bad, I'm not far out" },
        { from: "puffy-sys", to: "order", body: "Delivery Arrived"  },
        { from: "puffy-sys", to: "order", body: "Delivery Complete" }
    ],
    Rough: [
        { from: "puffy-sys", to: "order", body: "Delivery In Route" },
        { from: "driver", to: "dipatch", body: "I arrived but I don't think this is the house, I'm at 12345 Euclid in Upland" },
        { from: "dispatch", to: "driver", body: "Oh No, it's 12345 Euclid in Anaheim" },
        { from: "driver", to: "dispatch", body: "What, I'm hours away in traffic" },
        { from: "customer", to: "customer service", body: "Where's my stuff at I ordered it forever ago" },
        { from: "customer service", to: "customer", body: "The driver is delayed, he'll be a few more hours" },
        { from: "customer", to: "customer service", body: "Just Cancel the order" },
        { from: "puffy-sys", to: "order", body: "Delivery Canceled" },
        { from: "customer service", to: "customer", body: "We canceled it, sorry for the inconvenience" },
        { from: "dispatcher", to: "driver", body: "That order was cancelled by customer service, sending you a new route" },
        { from: "driver", to: "dispatcher", body: "$#%#$" },
    ]
};

var UserType = {};

UserType.Driver = 0;
UserType.Dispatcher =  1;
UserType.Customer = 2;
UserType.CustomerService = 3;
UserType.Supplier = 4;

var Profiles = {};
Profiles.Driver = { type:  UserType.Driver, isApproved: true};
Profiles.Dispatcher = { type: UserType.Dispatcher };
Profiles.Customer = { type: UserType.Customer };
Profiles.CustomerService = { type: UserType.CustomerService };
Profiles.Supplier = { type: UserType.Supplier };

var Delivery = {
    Status: DeliveryStatus,
    Driver: Profiles.Driver,
    Dispatcher: Profiles.Dispatcher,
    Customer: Profiles.Customer,
    Assisting: Profiles.CustomerService,
    Supplier: Profiles.Supplier
};

var DeliveryStatus = {};
DeliveryStatus.Unassigned = 0;
DeliveryStatus.Assigned = 1;
DeliveryStatus.Paused = 2;
DeliveryStatus.InError = 3;
DeliveryStatus.Delivered =  4;

// domain helper functions
function buildDeliveries(pobs) {
    var deliveryCount = rndBet( config.DeliveryOrderCustomers.min, config.DeliveryOrderCustomers.max);
    var deliveries = [];
    for ( var i = 0, ol = pobs.orders.length;i < ol; i++) {
        deliveries.push({
            driver: pobs.drivers[rndBet(0, pobs.drivers.length - 1)],
            location: getLocation(),
            orders: [pobs.orders[rndBet(0, pobs.orders.length - 1)]]
            // need to filter for orders not assigned
        });
    }
    return deliveries;
}

function buildDrivers() {
    var driverCount = rndBet( config.DriverCount.min, config.DriverCount.max);
    var drivers = [];
    for (var i = 0; i < driverCount; i++) {
        var name = getName();
        drivers.push({
            isApproved: getRandomBool(),
            user: {
                name: name,
                email: `${name.replace(' ', '.')}@puffydelivery.com`
            }
        });
    }
    return drivers;
};

function buildOrders() {
    var orderCount = rndBet( config.DeliveryOrderCustomers.min, config.DeliveryOrderCustomers.max);
    var orders = [];
    for (var i = 0; i < orderCount; i++) {
        var name = getName();
        orders.push(
            {
                customer: {
                    user: {
                        name: name,
                        email: `${name.replace(' ', '.')}@customerseamail.com`
                    },
                    address: getAddress(),
                    geocoded: getLocation(),
                },
                products: getProducts()
            }
        );
    }
    return orders;
};

function getProducts() {
    var np = rndBet(1, 5);
    var products = [];
    for (var i = 0; i < np; i++) {
        var title = getProductName();
        products.push({
            id: rndBet(1, 600),
            title: title, 
            price: getRandomFloat(0.99, 99.00),
            description: `We bring you this wonderful ${title}, other customers love it and now we can deliver it straight to your doorstep`, 
            primaryImageUrl: 'somepath.png'
        });
    }
    return products;
}

function getProductName() {
    var adj = [
        'sticky',
        'green',
        'delicious',
        'potent',
        'super',
        'fragrant',
        'unbelievable',
        'thirst quenching',
        'higher than high',
        'ocean breazy',
        'dank dizzle',
        'red eye',
    ];

    var prod = [
        'oil',
        'pen',
        'flower',
        'weed',
        'cbd',
        'lotion',
        'seasoning'
    ];

    var disp = [
        'dispensary',
        'farm',
        'ranch',
        'island'
    ];
    return `${adj[rndBet(0, adj.length - 1)]} ${prod[rndBet(0, prod.length - 1)]} from ${adj[rndBet(0, adj.length - 1)]} ${disp[rndBet(0, disp.length - 1)]}`;
}

function getName() {
    var fNames = [
        'Joe',
        'Jane',
        'Sarah',
        'Tim',
        'Tom',
        'Mike',
        'Lisa',
        'Kadie',
        'Ronin',
        'Tony',
        'Joan',
        'Melisa',
        'Julia'
    ];

    var lNames = [
        'Sanchez',
        'Jones',
        'Davis',
        'Cohan',
        'Foster',
        'Rothsberg',
        'Feliciano',
        'Gomez',
        'Anderson',
        'Riley',
        'Thomson'
    ];
    return `${fNames[rndBet(0, fNames.length - 1)]} ${lNames[rndBet(0, lNames.length - 1)]}`;
};

function getAddress() {
    var Directionals =  [
        '',
        'North',
        'South',
        'East',
        'West',
        'NE',
        'NW',
        'SE',
        'SW',
        '',
        '',
        '',
        ''
    ];
    var Streets = [
        'Tustin',
        'Euclid',
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th'
    ];
    var Cities = [
        'Irvine',
        'Orange',
        'Santa Ana',
        'Villa Park',
        'Westminister',
        'Upland',
        'Riverside',
        'Anaheim',
        'Long Beach',
        'Compton'
    ];
    var Types = [
        'st',
        'road',
        'drive',
        'pkwy',
        'alley',
        'blvd'
    ];
    return `${rndBet(1000, 5000)} ${Directionals[rndBet(0, Directionals.length - 1)]} ${Streets[rndBet(0, Streets.length - 1)]} ${Types[rndBet(0, Types.length - 1)]}, ${Cities[rndBet(1, Cities.length - 1)]}, CA ${rndBet(90000, 93000)}`;
};

function
    getLocation() {
    return {
        lat: getRandomFloat(28.000, 38.999) * -1,
        lon:
            getRandomFloat(160.000, 180.999)
    };
};

function buildLocations() { };
function buildDispatchers() { };
function buildSuppliers() { };
function buildMessages() { };


// js helper functions
/**
* Get a random floating point number between `min` and `max`.
* 
* @param {number} min - min number
* @param {number} max - max number
* @return {number} a random floating point number
*/
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
* Get a random integer between `min` and `max`.
* 
* @param {number} min - min number
* @param {number} max - max number
* @return {number} a random integer
*/
function rndBet(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
* Get a random boolean value.
* 
* @return {boolean} a random true/false
*/
function getRandomBool() {
    return Math.random() >= 0.5;
}

function getRandomPhone(){
    return `${rndBet(600, 999)}-${rndBet(500, 999)}-${rndBet(5000, 9999)}`
}

const mongoose = require('mongoose');
const mPwd = 'password\$1';
// connect to the database ... Note: mongo lab connect from 76.169.144.200 only 
mongoose.connect('mongodb+srv://arkcloudtech:' + mPwd + '@arkcloud0-vujht.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database, preparing to seed with data...');
    // seed data
    drivers = buildDrivers();
    orders = buildOrders();
    console.dir({
        drivers: drivers,
        orders: orders
    });

if(writeDataToDB) {
    console.log('seeding users and drivers');
    for(var i = 0, dl = drivers.length; i < dl; i++){
        let user = new User({
            name: drivers[i].user.name,
            email: drivers[i].user.email,
            phone: getRandomPhone()
        });
        var j = i;
        user.save((err, item, numAffected)=>{
            var k = j;
            if(!err) {
                let driver = new Driver({
                    userId: item.id,
                    isApproved: drivers[k].isApproved
                });
                driver.save((e, i, n)=>{
                    if(e){
                        console.log('issue adding driver');
                    }
                });
            } else {
                console.log('issues adding user')
            }
        });
    }

    console.log('seeding orders');
    for(var i = 0, dl = orders.length; i < dl; i++){
        let order = new Order({
            name: drivers[i].user.name,
            email: drivers[i].user.email,
            phone: getRandomPhone()
        });
        var j = i;
        user.save((err, item, numAffected)=>{
            var k = j;
            if(!err) {
                let driver = new Driver({
                    userId: item.id,
                    isApproved: drivers[k].isApproved
                });
                driver.save((e, i, n)=>{
                    if(e){
                        console.log('issue adding driver');
                    }
                });
            } else {
                console.log('issues adding user')
            }
        });
    }
}});

