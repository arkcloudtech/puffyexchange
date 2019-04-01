const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLFloat, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLNonNull 
} = graphql;
const _ = require('lodash');

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

// dummy data
var deliveries = [
    { id: "1", summary: "summary 1", order: "order 1 name", dispatcher: "dispather 1 name", driverId: "2" },
    { id: "2", summary: "summary 2", order: "order 2 name", dispatcher: "dispather 2 name", driverId: "4" },
    { id: "3", summary: "summary 3", order: "order 3 name", dispatcher: "dispather 3 name", driverId: "1" },
    { id: "4", summary: "summary 4", order: "order 4 name", dispatcher: "dispather 4 name", driverId: "3" },
    { id: "5", summary: "summary 5", order: "order 5 name", dispatcher: "dispather 5 name", driverId: "1" },
];

var drivers = [
    { id: "1", name: "driver 1 name", location: "33.88321 -117.00399", deliveryId: "3" },
    { id: "2", name: "driver 2 name", location: "33.88321 -117.00399", deliveryId: "1" },
    { id: "3", name: "driver 3 name", location: "33.88321 -117.00399", deliveryId: "4" },
    { id: "4", name: "driver 4 name", location: "33.88321 -117.00399", deliveryId: "2" }
];

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        idUrl: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
});

const DeliveryType = new GraphQLObjectType({
    name: 'Delivery',
    fields: () => ({
        id: { type: GraphQLID },
        summary: { type: GraphQLString },
        order: {
            type: OrderType,
            resolve(parent, args) {
                return Order.findById(parent.orderId);
            }
        },
        deliveryLocation: { type: GraphQLString },
        dispatcher: {
            type: DispatcherType,
            resolve(parent, args){
                return Dispatcher.findById(parent.dispatcherId)
            }
        },
        driver: {
            type: DriverType,
            resolve(parent, args){
                return Driver.findById(parent.driverId)
            }
        },
    })
});

const DispatcherType = new GraphQLObjectType({
    name: 'Dispatcher',
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById( parent.userId );
            }
        },
        orders: { 
            type: new GraphQLList(OrderType), 
            resolve(parent, args){
                Order.find({})
                    .where('_id')
                    .in(deliveries.find({ 
                        dispatcherId: mongoose.Types.ObjectId(parent.id) 
                    }))
                    .exec();
            }
        },
        drivers: { 
            type: new GraphQLList(DriverType), 
            resolve(parent, args){
                Driver.find({})
                    .where('_id')
                    .in(deliveries.find({ 
                        dispatcherId: mongoose.Types.ObjectId({ dispatcherId: parent.id }) 
                    })) 
                    .exec();
            }
        }
    })
});

const DriverType = new GraphQLObjectType({
    name: 'Driver',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const DriverTaskType = new GraphQLObjectType({
    name: 'DriverTask',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const GoToHubTaskType = new GraphQLObjectType({
    name: 'GoToHubTask',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const InventoryExchangeContractType = new GraphQLObjectType({
    name: 'InventoryExchangeContract',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const InventoryExchangeTaskType = new GraphQLObjectType({
    name: 'InventoryExchange',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const MessageUserType = new GraphQLObjectType({
    name: 'MessageUser',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                let deliveries = Delivery.find({
                    '_id': { $in: Delivery.find({ orderId: parent.id }) }
                }, function(err, docs){
                     console.log(docs);
                });
                return deliveries;
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                let products = Product.find({
                    'productId': { $in: OrderProduct.find({ orderId: parent.id }) }
                }, function(err, docs){
                     console.log(docs);
                });
                return products;
            }
        },
    })
});

const OrderTaskType = new GraphQLObjectType({
    name: 'OrderTask',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        isActive: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        delivery: {
            type: DeliveryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        dispatcher: {
            type: DispatcherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        driver: {
            type: DriverType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get drivers
                //return _.find(drivers, { id: args.id });
            }
        },
        drivertask: {
            type: DriverTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        gotohub: {
            type: GoToHubTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        inventoryexchangecontract: {
            type: InventoryExchangeContractType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        inventoryexchangetask: {
            type: InventoryExchangeTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        messageuser: {
            type: MessageUserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        ordertask: {
            type: OrderTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        profile: {
            type: ProfileType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                //return _.find(deliveries, { id: args.id });
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                //return drivers
            }
        },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                //return drivers
            }
        },
        dispatchers: {
            type: new GraphQLList(DispatcherType),
            resolve(parent, args) {
                //return dispatchers
            }
        },
        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parent, args) {
                //return drivers
            }
        },
        drivertasks: {
            type: new GraphQLList(DriverTaskType),
            resolve(parent, args) {
                //return drivertasks
            }
        },
        gotohubtasks: {
            type: new GraphQLList(GoToHubTaskType),
            resolve(parent, args) {
                //return gotohubtasks
            }
        },
        inventoryexchangecontracts: {
            type: new GraphQLList(InventoryExchangeContractType),
            resolve(parent, args) {
                //return inventoryexchangecontracts
            }
        },
        inventoryexchanges: {
            type: new GraphQLList(InventoryExchangeTaskType),
            resolve(parent, args) {
                //return inventoryexchanges
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                //return message
            }
        },
        messageusers: {
            type: new GraphQLList(MessageUserType),
            resolve(parent, args) {
                //return drivers
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                //return drivers
            }
        },
        ordertask: {
            type: new GraphQLList(OrderTaskType),
            resolve(parent, args) {
                //return drivers
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                //return drivers
            }
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent, args) {
                //return drivers
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //return deliveries
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let customer = new Customer({
                    name: args.name,
                    location: args.location
                });
                return customer.save();
            }
        },
        addDelivery: {
            type: DeliveryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let delivery = new Delivery({
                    name: args.name,
                    location: args.location
                });
                return delivery.save();
            }
        },
        addDispatcher: {
            type: DispatcherType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let dispatcher = new Dispatcher({
                    name: args.name,
                    location: args.location
                });
                return dispatcher.save();
            }
        },
        addDriver: {
            type: DriverType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let driver = new Driver({
                    name: args.name,
                    location: args.location
                });
                return driver.save();
            }
        },
        addDriverTask: {
            type: DriverTaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let driverTask = new DriverTask({
                    name: args.name,
                    location: args.location
                });
                return driverTask.save();
            }
        },
        addGoToHubTask: {
            type: GoToHubTaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let goToHubTask = new GoToHubTask({
                    name: args.name,
                    location: args.location
                });
                return goToHubTask.save();
            }
        },
        addInventoryExchangeContract: {
            type: InventoryExchangeContractType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let inventoryExchangeContract = new InventoryExchangeContract({
                    name: args.name,
                    location: args.location
                });
                return inventoryExchangeContract.save();
            }
        },
        addInventoryExchangeTask: {
            type: InventoryExchangeTaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let inventoryExchangeTask = new InventoryExchangeTask({
                    name: args.name,
                    location: args.location
                });
                return inventoryExchangeTask.save();
            }
        },
        addMessage: {
            type: MessageType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let message = new Message({
                    name: args.name,
                    location: args.location
                });
                return message.save();
            }
        },
        addMessageUser: {
            type: MessageUserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let messageUser = new MessageUser({
                    name: args.name,
                    location: args.location
                });
                return messageUser.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let order = new Order({
                    name: args.name,
                    location: args.location
                });
                return order.save();
            }
        },
        addOrderTask: {
            type: OrderTaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let orderTask = new OrderTask({
                    name: args.name,
                    location: args.location
                });
                return orderTask.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    location: args.location
                });
                return product.save();
            }
        },
        addProfile: {
            type: ProfileType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let profile = new Profile({
                    name: args.name,
                    location: args.location
                });
                return profile.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    location: args.location
                });
                return user.save();
            }
        },
        assignDelivery: {
            type: DeliveryType,
            args: {
                driverId: { type: GraphQLID },
                orderId: { type: GraphQLID }
            },
            resolve(parent, args){
                let delivery = new Delivery({
                    driverId: args.driverId,
                    location: args.location
                });
                return delivery.save();
            }
        },/*
        signInventoryExchangeContract:  {
            type: InventoryExchangeContractType,
            args: {
                inventoryExchangeTaskId: { GraphQLID },                
                driverId: { type: GraphQLID },
                signature: { type: GraphQLString }
            }, 
            resolve(parent, args) {
                let inventoryExchangeContract = new InventoryExchangeContract({
                    inventoryExchangeTaskId: args.inventoryExchangeTaskId,
                    signatureA: args.signature,
                    signatureB: args.signature,
                    recipientId: driverId,
                    valid: true
                });
                return inventoryExchangeContract.save(); 
            }
        }*/
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});